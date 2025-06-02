import asyncio
import aiohttp
from bs4 import BeautifulSoup
import json
from urllib.parse import urljoin, urlparse
from collections import deque
from tqdm import tqdm
from langdetect import detect, DetectorFactory
import os

DetectorFactory.seed = 0  # Make langdetect deterministic

HEADERS = {
    "User-Agent": "Mozilla/5.0 (compatible; AsyncCrawler/1.0)"
}

sem = asyncio.Semaphore(20)  # Max concurrent requests

class RobotsTxt:
    def __init__(self, text):
        self.disallow_paths = []
        self.allow_paths = []
        self.parse(text)

    def parse(self, text):
        # Parse simple robots.txt rules for User-agent: * or AsyncCrawler
        user_agent = None
        for line in text.splitlines():
            line = line.strip()
            if not line or line.startswith('#'):
                continue
            if line.lower().startswith('user-agent:'):
                user_agent = line.split(':', 1)[1].strip()
            elif user_agent in ('*', 'AsyncCrawler'):
                if line.lower().startswith('disallow:'):
                    path = line.split(':', 1)[1].strip()
                    if path:
                        self.disallow_paths.append(path)
                elif line.lower().startswith('allow:'):
                    path = line.split(':', 1)[1].strip()
                    if path:
                        self.allow_paths.append(path)

    def is_allowed(self, url_path):
        # If any Allow path matches prefix, allow
        for allow_path in self.allow_paths:
            if url_path.startswith(allow_path):
                return True
        # If any Disallow path matches prefix, disallow
        for disallow_path in self.disallow_paths:
            if url_path.startswith(disallow_path):
                return False
        return True


robots_cache = {}

async def fetch_robots_txt(session, base_url):
    parsed = urlparse(base_url)
    robots_url = f"{parsed.scheme}://{parsed.netloc}/robots.txt"
    if robots_url in robots_cache:
        return robots_cache[robots_url]

    try:
        async with sem:
            async with session.get(robots_url, headers=HEADERS, timeout=10) as response:
                if response.status == 200:
                    text = await response.text()
                    robots = RobotsTxt(text)
                    robots_cache[robots_url] = robots
                    return robots
    except Exception:
        pass

    # If robots.txt not found or error, allow all
    robots_cache[robots_url] = RobotsTxt("")
    return robots_cache[robots_url]


def extract_favicon(soup, base_url):
    icon_link = soup.find("link", rel=lambda x: x and "icon" in x.lower())
    if icon_link and icon_link.get("href"):
        return urljoin(base_url, icon_link["href"])
    return urljoin(base_url, "/favicon.ico")


async def fetch(session, url, robots):
    parsed = urlparse(url)
    if not robots.is_allowed(parsed.path):
        # print(f"Blocked by robots.txt: {url}")
        return None, []

    async with sem:
        try:
            async with session.get(url, headers=HEADERS, timeout=10) as response:
                if response.status != 200:
                    return None, []
                text = await response.text()
                soup = BeautifulSoup(text, 'html.parser')

                title_text = soup.title.string.strip() if soup.title else ""
                meta_desc = soup.find("meta", attrs={"name": "description"})
                snippet_text = meta_desc["content"] if meta_desc else (
                    soup.find("p").text.strip() if soup.find("p") else ""
                )
                lang_text = title_text + " " + snippet_text
                if not lang_text.strip():
                    return None, []

                lang = detect(lang_text)

                if lang not in ['en', 'bn', 'hi']:
                    return None, []

                favicon = extract_favicon(soup, url)

                links = []
                for link_tag in soup.find_all("a", href=True):
                    href = link_tag['href']
                    full_url = urljoin(url, href)
                    if full_url.startswith("http"):
                        links.append(full_url)

                data = {
                    "url": url,
                    "title": title_text if title_text else "No Title",
                    "snippet": snippet_text if snippet_text else "No snippet found",
                    "favicon": favicon,
                    "language": lang
                }
                return data, links
        except Exception as e:
            print(f"Error fetching {url}: {e}")
            return None, []


async def crawl(start_urls, max_pages=1000, output_file="output.jsonl", crawled_file="crawled_urls.txt"):
    seen = set()

    # Load previously crawled URLs from file
    if os.path.exists(crawled_file):
        with open(crawled_file, "r", encoding="utf-8") as f:
            for line in f:
                seen.add(line.strip())

    queue = deque(start_urls)
    domain_robots = {}

    pbar = tqdm(total=max_pages, desc="Pages Crawled")

    async with aiohttp.ClientSession() as session:
        # Open output and crawled files in append mode
        with open(output_file, "a", encoding="utf-8") as out_file, \
             open(crawled_file, "a", encoding="utf-8") as crawled_out:

            while queue and len(seen) < max_pages:
                batch_size = min(20, len(queue), max_pages - len(seen))

                tasks = []
                urls_batch = []

                # Pre-fetch robots.txt for new domains
                for _ in range(batch_size):
                    url = queue.popleft()
                    domain = urlparse(url).netloc
                    if domain not in domain_robots:
                        domain_robots[domain] = await fetch_robots_txt(session, url)

                    if url not in seen:
                        seen.add(url)
                        urls_batch.append(url)

                for url in urls_batch:
                    robots = domain_robots[urlparse(url).netloc]
                    tasks.append(fetch(session, url, robots))

                responses = await asyncio.gather(*tasks)

                for i, (data, links) in enumerate(responses):
                    if data:
                        # Write scraped data
                        out_file.write(json.dumps(data, ensure_ascii=False) + "\n")
                        out_file.flush()

                        # Write crawled URL to file (persist)
                        crawled_out.write(urls_batch[i] + "\n")
                        crawled_out.flush()

                        for link in links:
                            if link not in seen:
                                queue.append(link)

                    pbar.update(1)

                await asyncio.sleep(0.1)

    pbar.close()


if __name__ == "__main__":
    import sys

    try:
        with open("urls.txt", "r") as f:
            seeds = [line.strip() for line in f if line.strip()]
    except FileNotFoundError:
        print("Create 'urls.txt' with seed URLs, one per line.")
        sys.exit(1)

    asyncio.run(crawl(seeds, max_pages=1000, output_file="output.jsonl", crawled_file="crawled_urls.txt"))
    print("\nCrawling finished. Data saved in output.jsonl")

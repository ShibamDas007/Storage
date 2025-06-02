from urllib.parse import urljoin

def extract_icon(soup, base_url):
    icon_link = soup.find("link", rel=lambda x: x and "icon" in x.lower())
    if icon_link and icon_link.get("href"):
        return urljoin(base_url, icon_link["href"])
    return urljoin(base_url, "/favicon.ico")

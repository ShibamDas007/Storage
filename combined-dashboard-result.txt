import Sidebar from "../components/Sidebar";
import { FaSearch, FaQuestionCircle, FaRegBookmark, FaRobot, FaLink } from "react-icons/fa";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { MdSearch, MdLink, MdCopyAll } from "react-icons/md";
import { useState } from "react";

function DashBoard() {
    const [mobilesidebarOpen, setmobileSidebarOpen] = useState(false);
    const [hasSearchResults, setHasSearchResults] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [section, setSection] = useState("AI Answer");

    const toggleMobileSidebar = () => {
        setmobileSidebarOpen(!mobilesidebarOpen);
    };

    const handleSearch = () => {
        if (searchQuery.trim().length > 0) {
            setHasSearchResults(true);
        }
    };

    const handleInputChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <div className="bg-[#202222] absolute inset-0 overflow-hidden flex p-2 font-ccode text-white">
            <Sidebar />
            <div className={`${mobilesidebarOpen ? "translate-x-0" : "-translate-x-full"} fixed inset-0 bg-[#202222] z-50 md:hidden w-[70%] h-full transform transition-transform ease-in-out duration-100`}>
                <div className="flex justify-end p-4">
                    <button onClick={toggleMobileSidebar} className="text-white text-xl">
                        <AiOutlineClose />
                    </button>
                </div>
                <div className="">
                    <Sidebar isMobile={true} />
                </div>
            </div>

            {!hasSearchResults ? (
                // Dashboard Content
                <div className="bg-[#191A1A] flex flex-col w-full h-full">
                    <div className="w-full h-16 fixed md:hidden">
                        <div className="ml-4 flex gap-2 text-white text-lg items-center w-full py-4">
                            <a href="#" className="md:hidden text-xl text-[#20B8CD]" onClick={toggleMobileSidebar}><AiOutlineMenu /></a>
                            <a href="" className="">Quark</a>
                        </div>
                    </div>
                    <div className="bg-[#191A1A] w-full h-full rounded-lg border border-[#2D2F2F] gap-6 flex flex-col md:justify-center justify-between items-center shadow-lg">
                        <div className="md:hidden"></div>
                        <div className="text-white text-xl md:text-4xl font-mono font-semibold flex flex-">
                            Welcome, Shibam Das!
                        </div>
                        <div className="md:block hidden bg-[#202222] w-full md:w-[50%] md:h-35 rounded-lg border border-[#343636] shadow-lg">
                            <input 
                                type="text" 
                                value={searchQuery}
                                onChange={handleInputChange}
                                onKeyPress={handleKeyPress}
                                className="bg-[#202222] w-full h-[50%] rounded-lg px-4 text-white outline-none" 
                                placeholder="Ask anything..." 
                            />
                            <div className="flex justify-between items-center p-4">
                                <div className="text-[#20B8CD] py-2 px-4 font-semibold font-mono bg-[#191A1A] shadow-[inset_0_0_15px_rgba(59,130,246,0.5)] cursor-help rounded-lg border border-[#20B8CD] flex justify-center items-center gap-[2px] select-none">
                                    <MdSearch />Search
                                </div>
                                <div 
                                    className="text-black p-[10px] flex justify-center items-center bg-[#20B8CD] rounded-lg shadow-lg hover:scale-110 cursor-pointer hover:shadow-blue-500/50"
                                    onClick={handleSearch}
                                >
                                    <FaSearch />
                                </div>
                            </div>
                        </div>
                        <div className="md:hidden bg-[#202222] flex justify-between items-center w-full md:w-[60%] m-2 rounded-lg border border-[#2D2F2F] shadow-lg">
                            <div className="text-[#20B8CD] py-2 px-4 font-semibold font-mono bg-[#191A1A] shadow-[inset_0_0_15px_rgba(59,130,246,0.5)] cursor-help rounded-lg border border-[#20B8CD] flex justify-center items-center gap-[2px] select-none m-2">
                                <MdSearch />
                            </div>
                            <input 
                                type="text" 
                                value={searchQuery}
                                onChange={handleInputChange}
                                onKeyPress={handleKeyPress}
                                placeholder="Ask anything..." 
                                className="w-full p-2 m-2 outline-none bg-[#202222] text-white" 
                            />
                            <div>
                                <div 
                                    className="text-black p-[10px] flex justify-center items-center bg-[#20B8CD] rounded-lg shadow-lg hover:scale-110 cursor-pointer hover:shadow-blue-500/50 m-2"
                                    onClick={handleSearch}
                                >
                                    <FaSearch />
                                </div>
                            </div>
                        </div>
                        <div className="hidden md:block w-[50%] h-20 md:grid md:grid-cols-3 gap-4">
                            <div className="rounded-lg shadow-lg bg-[#202222] grid grid-cols-2 p-4 justify-center items-center animate-pulse">
                                <div className="bg-[#343F51] w-12 h-12 rounded-full"></div>
                                <div className="flex flex-col gap-2">
                                    <div className="bg-[#343F51] w-16 h-2 rounded-lg"></div>
                                    <div className="bg-[#343F51] w-12 h-2 rounded-lg"></div>
                                    <div className="bg-[#343F51] w-4 h-2 rounded-lg"></div>
                                </div>
                            </div>
                            <div className="rounded-lg shadow-lg bg-[#202222] grid grid-cols-2 p-4 justify-center items-center animate-pulse">
                                <div className="bg-[#343F51] w-12 h-12 rounded-full"></div>
                                <div className="flex flex-col gap-2">
                                    <div className="bg-[#343F51] w-16 h-2 rounded-lg"></div>
                                    <div className="bg-[#343F51] w-12 h-2 rounded-lg"></div>
                                    <div className="bg-[#343F51] w-4 h-2 rounded-lg"></div>
                                </div>
                            </div>
                            <div className="rounded-lg shadow-lg bg-[#202222] grid grid-cols-2 p-4 justify-center items-center animate-pulse">
                                <div className="bg-[#343F51] w-12 h-12 rounded-full"></div>
                                <div className="flex flex-col gap-2">
                                    <div className="bg-[#343F51] w-16 h-2 rounded-lg"></div>
                                    <div className="bg-[#343F51] w-12 h-2 rounded-lg"></div>
                                    <div className="bg-[#343F51] w-4 h-2 rounded-lg"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                // Results Content
                <div className="flex flex-col w-full h-full">
                    <div className="bg-[#191A1A] w-full h-full rounded-t-lg border-x border-t border-[#2D2F2F] overflow-y-auto shadow-lg">
                        <div className="flex justify-between items-center border-b border-[#2D2F2F] w-full sticky top-0 bg-[#191A1A] z-10">
                            <div className="ml-4">
                                <a href="#" className="md:hidden text-xl text-[#20B8CD]" onClick={toggleMobileSidebar}><AiOutlineMenu/></a>
                            </div>
                            <div className="mt-2 text-white font-ibm">{searchQuery}</div>
                            <div className="flex">
                                <div className="p-2 mt-2 text-white text-sm"><FaRegBookmark /></div>
                                <div className="bg-[#1F98A9] p-2 m-2 rounded-lg"><MdLink /></div>
                            </div>
                        </div>
                        <div className="flex flex-col px-4 sm:px-8 md:px-16 lg:px-32 xl:px-64 py-8 sm:py-10 lg:py-16 gap-2">
                            <div className="flex justify-between items-center">
                                <div className="text-2xl sm:text-3xl lg:text-4xl text-white">{searchQuery}</div>
                                <div><MdCopyAll /></div>
                            </div>
                            <div className="">
                                <div className="flex gap-6">
                                    <a 
                                        href="#" 
                                        className={`flex gap-2 justify-center items-center ${section !== "AI Answer" ? "opacity-50 p-2" : "bg-[#202222] p-2 rounded-sm"}`} 
                                        onClick={() => setSection("AI Answer")}
                                    >
                                        <FaRobot />AI Answer
                                    </a>
                                    <a 
                                        href="#" 
                                        className={`flex gap-2 justify-center items-center ${section !== "Source" ? "opacity-50 p-2" : "bg-[#202222] p-2 rounded-sm"}`} 
                                        onClick={() => setSection("Source")}
                                    >
                                        <FaLink />Sources
                                    </a>
                                </div>
                            </div>
                            <div className="">
                                {section === "AI Answer" ? (
                                    <div>
                                        <h1>What is Artificial Intelligence (AI)?</h1>
                                        <p>Artificial Intelligence (AI) refers to the simulation of human intelligence in machines that are programmed to think and act like humans. The term AI is often used to describe machines or software that can perform tasks that would normally require human intelligence, such as learning, problem-solving, perception, and language understanding.</p>
                                    </div>
                                ) : (
                                    <div>
                                        <a href="https://example.com" target="_blank">Example Site: example.com</a>
                                        <div className="link-description">
                                            This is a simple demo of a Google-style link with title and description.
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="bg-[#191A1A] border-x rounded-b-lg border-[#2D2F2F] border-b flex justify-center items-center shadow-lg">
                        <div className="bg-[#202222] flex justify-between items-center w-full md:w-[60%] m-2 rounded-lg border border-[#2D2F2F] shadow-lg">
                            <div className="text-[#20B8CD] py-2 px-4 font-semibold font-mono bg-[#191A1A] shadow-[inset_0_0_15px_rgba(59,130,246,0.5)] cursor-help rounded-lg border border-[#20B8CD] flex justify-center items-center gap-[2px] select-none m-2">
                                <MdSearch />
                            </div>
                            <input 
                                type="text" 
                                value={searchQuery}
                                onChange={handleInputChange}
                                onKeyPress={handleKeyPress}
                                placeholder="Ask anything..." 
                                className="w-full p-2 m-2 outline-none bg-[#202222] text-white" 
                            />
                            <div>
                                <div 
                                    className="text-black p-[10px] flex justify-center items-center bg-[#20B8CD] rounded-lg shadow-lg hover:scale-110 cursor-pointer hover:shadow-blue-500/50 m-2"
                                    onClick={handleSearch}
                                >
                                    <FaSearch />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className="hidden md:block absolute bottom-4 right-4 text-white text-lg cursor-pointer hover:opacity-50 transition-all mb-2 mr-2">
                <a href="#help" title="Help / Support">
                    <FaQuestionCircle />
                </a>
            </div>
        </div>
    );
}

export default DashBoard;

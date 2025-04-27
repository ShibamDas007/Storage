import { useState } from "react";
import { FaSearch, FaQuestionCircle, FaRegBookmark, FaRobot, FaLink } from "react-icons/fa";
import { MdLink, MdSearch, MdCopyAll } from "react-icons/md";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import Sidebar from "../components/Sidebar";

export const Result = () => {
    const [section, setSection] = useState("AI Answer");
    const [mobilesidebarOpen, setmobileSidebarOpen] = useState(false);

    const toggleMobileSidebar = () => {
        setmobileSidebarOpen(!mobilesidebarOpen)

    }

    return (
        <div className="bg-[#202222] absolute inset-0 overflow-hidden flex p-2 font-ccode text-white">
            <Sidebar />

            <div className={`${mobilesidebarOpen ? "translate-x-0" : "-translate-x-full"} fixed inset-0 bg-[#202222] z-50 md:hidden w-[70%] h-full transform transition-transform ease duration-1000`}>
                <div className="">
                    <Sidebar isMobile={true} externalToggle={toggleMobileSidebar}/>
                </div>
            </div>
            {mobilesidebarOpen && (
                <div className="fixed inset-0 bg-black/50 md:hidden" onClick={toggleMobileSidebar}></div>
            )}
            <div className="flex flex-col w-full h-full">
                <div className="bg-[#191A1A] w-full h-full rounded-t-lg border-x border-t border-[#2D2F2F] overflow-y-auto shadow-lg">
                    <div className="flex justify-between items-center border-b border-[#2D2F2F] w-full sticky top-0 bg-[#191A1A] z-10">
                        <div className="ml-4">
                            <a href="#" className="md:hidden text-xl text-[#20B8CD]" onClick={toggleMobileSidebar}><AiOutlineMenu /></a>
                        </div>
                        <div className="mt-2 text-white font-ibm">what is ai</div>
                        <div className="flex">
                            <div className="p-2 mt-2 text-white text-sm"><FaRegBookmark /></div>
                            <div className="bg-[#1F98A9] p-2 m-2 rounded-lg"><MdLink /></div>
                        </div>
                    </div>
                    <div className="flex flex-col px-4 sm:px-8 md:px-16 lg:px-32 xl:px-64 py-8 sm:py-10 lg:py-16 gap-2">
                        <div className="flex justify-between items-center">
                            <div className="text-2xl sm:text-3xl lg:text-4xl text-white">what is ai</div>
                            <div><MdCopyAll /></div>
                        </div>
                        <div className="">
                            <div className="flex gap-6">
                                <a href="#" className={`flex gap-2 justify-center items-center ${section != "AI Answer" ? "opacity-50 p-2" : "bg-[#202222] p-2 rounded-sm"}`} onClick={() => setSection("AI Answer")}><FaRobot />AI Answer</a>
                                <a href="#" className={`flex gap-2 justify-center items-center ${section != "Source" ? "opacity-50 p-2" : "bg-[#202222] p-2 rounded-sm"}`} onClick={() => setSection("Source")}><FaLink />Sources</a>
                            </div>
                        </div>
                        <div className="">
                            {section == "AI Answer" ?
                                (<div>
                                    <h1>What is Artificial Intelligence (AI)?</h1>
                                    <p>Artificial Intelligence (AI) refers to the simulation of human intelligence in machines that are programmed to think and act like humans. The term AI is often used to describe machines or software that can perform tasks that would normally require human intelligence, such as learning, problem-solving, perception, and language understanding.</p>
                                </div>) :
                                (<div>
                                    <a href="https://example.com" target="_blank">Example Site: example.com</a>
                                    <div class="link-description">
                                        This is a simple demo of a Google-style link with title and description.
                                    </div>
                                </div>)}
                        </div>
                    </div>
                </div>
                <div className="bg-[#191A1A] border-x rounded-b-lg border-[#2D2F2F] border-b flex justify-center items-center shadow-lg">
                    <div className="bg-[#202222] flex justify-between items-center w-full md:w-[60%]  m-2 rounded-lg border border-[#2D2F2F] shadow-lg">
                        <div className="text-[#20B8CD] py-2 px-4 font-semibold font-mono bg-[#191A1A] shadow-[inset_0_0_15px_rgba(59,130,246,0.5)] cursor-help rounded-lg border border-[#20B8CD] flex justify-center items-center gap-[2px] select-none m-2"><MdSearch /></div>
                        <input type="text" name="" id="" placeholder="Ask anything..." className="w-full p-2 m-2" />
                        <div>
                            <div className="text-black p-[10px] flex justify-center items-center bg-[#20B8CD] rounded-lg shadow-lg hover:scale-110 cursor-pointer hover:shadow-blue-500/50 m-2"><FaSearch /></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

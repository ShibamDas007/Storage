import Sidebar from "../components/Sidebar";
import { FaQuestionCircle } from "react-icons/fa";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { useState } from "react";
import { DesktopSearchBar, MobileSearchBar } from "../components/SearchBar";
import { Card } from "../components/DynamicCards";

function DashBoard() {
    const [mobilesidebarOpen, setmobileSidebarOpen] = useState(false);

    const toggleMobileSidebar = () => {
        setmobileSidebarOpen(!mobilesidebarOpen)

    }

    return (
        <div className="bg-[#202222] absolute inset-0 overflow-hidden flex p-2 font-ccode text-white">
            <Sidebar />
            <div className={`${mobilesidebarOpen ? "translate-x-0" : "-translate-x-full"} fixed inset-0 bg-[#202222] z-50 md:hidden w-[70%] h-full transform transition-transform ease-in-out duration-1000`}>
                <div className="">
                    <Sidebar isMobile={true}  externalToggle={toggleMobileSidebar}/>
                </div>
            </div>
            {mobilesidebarOpen && (
                <div className="fixed inset-0 bg-black/50 md:hidden" onClick={toggleMobileSidebar}></div>
            )}
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
                    <div className="md:block hidden w-full md:w-1/2">
                        <DesktopSearchBar />
                    </div>
                    <div className="md:hidden w-full">
                        <MobileSearchBar />
                    </div>
                    <div className="hidden md:block w-[50%]">
                        <Card/>
                    </div>
                </div>
            </div>
            <div className="hidden md:block absolute bottom-4 right-4 text-white text-lg cursor-pointer hover:opacity-50 transition-all mb-2 mr-2">
                <a href="#help" title="Help / Support">
                    <FaQuestionCircle />
                </a>
            </div>
        </div>
    )
}

export default DashBoard;
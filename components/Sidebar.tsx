import { useRouter } from "next/router";
import React, { useState } from "react";
import { CSSTransition } from 'react-transition-group';
import { FaCog } from 'react-icons/fa'
import { BsChevronRight } from "react-icons/bs";
import { BsChevronLeft } from "react-icons/bs";
import { useMeQuery } from "../generated/graphql";
import { CustomLink } from "./CustomLink";
interface SidebarProps {
	sidebarShow: boolean,
	setSidebarShow: React.Dispatch<React.SetStateAction<boolean>>
  handleLogout: () => Promise<void>
}
const Sidebar:React.FC<SidebarProps> = ({sidebarShow, setSidebarShow, handleLogout}) => {
  const router = useRouter();
  const { data, loading } = useMeQuery();
	const [ activeMenu, setActiveMenu ] = useState('main');
	return(
		<>
			<div className={`flex fixed flex-col px-3 top-14 left-0 bottom-0 w-2/4 z-50 h-full bg-tumblrBackground duration-200 overflow-hidden large:hidden ${sidebarShow ? '-translate-x-0' : '-translate-x-full' } `}>
			{!data?.Me
			?
				<div className="flex flex-col mt-2">
					<div className="w-full mb-2">
						<CustomLink text="Log in" color="green" linkTo="/login" variant="small" />
					</div>
					<div className="w-full">
					<CustomLink text="Sign in" color="blue" linkTo="/register" variant="small" />
				</div>
				</div>
			: <>
				<div className="w-full text-center my-3">
					<button 
						className="p-3 font-default rounded-sm bg-tumblrBlue w-2/4 font-bold text-center"
						onClick={async () => {
					    	await setSidebarShow(false)
							await router.push("/dashboard/?new=1","/createPost/")
						}}
					>
						Create Post
					</button>
				</div>
				<div className="w-full text-xl text-white">
					
					<CSSTransition 
						in={activeMenu === 'main'} 
						timeout={200}
						unmountOnExit
						classNames="menu-primary"
					>
						<div className="w-full">
							<button 
                className="flex flex-row h-6 w-full items-center justify-between" 
                onClick={() => {setActiveMenu('settings')}} > 
								<div className="flex flex-row  items-center">
									<FaCog className="mr-3"/>
                    Settings
								</div>
									<BsChevronRight/> 
							</button>
						</div>
					</CSSTransition>
					<CSSTransition 
						in={activeMenu === 'settings'} 
						timeout={200}
						unmountOnExit
						classNames="menu-secondary"
					>
						<div className="w-full">
              <button 
                className="flex flex-row h-6 w-full items-center justify-between" 
                onClick={() => {setActiveMenu('main')}} > 
                <BsChevronLeft/> 
              </button>
              <div className="mt-3">
                <button onClick={handleLogout}>
                  Log out
                </button>
              </div>
						</div>
					</CSSTransition>

				</div>
			</>
			}

			</div>
			<button className={`fixed top-14 bottom-0 w-full ${sidebarShow ? 'block' : 'hidden'} duration-200 bg-overlayBackground`} onClick={() => {setSidebarShow(false)}}>

			</button>
		</>		
	)
}

export default Sidebar;
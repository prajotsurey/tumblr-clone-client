import { useRouter } from "next/router";

interface SidebarProps {
	sidebarShow: boolean,
	setSidebarShow: React.Dispatch<React.SetStateAction<boolean>>
}
const Sidebar:React.FC<SidebarProps> = ({sidebarShow, setSidebarShow}) => {
  const router = useRouter();
	return(
		<>
			<div className={`flex fixed flex-col top-14 bottom-0 w-2/4 z-50 h-full bg-tumblrBackground duration-150 ${sidebarShow ? '-translate-x-0' : '-translate-x-full' } `}>
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
						<div className="w-full flex flex-col">
							
						</div>
					</div>
					<button className={`fixed top-14 bottom-0 w-full ${sidebarShow ? 'block' : 'hidden'} duration-200 bg-overlayBackground`} onClick={() => {setSidebarShow(false)}}>

					</button>
		</>		
	)
}

export default Sidebar;
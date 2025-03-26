import { ReactNode } from "react";
import { Link, useNavigate } from "react-router-dom";

interface HeaderProps {
    children: ReactNode;
}

function Header({ children }: HeaderProps) {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token"); // Clear auth
        navigate("/login"); // Redirect to login
      };

    return (
        <>
            <header className='bg-purple-700 flex h-20'>

                <div id='logo' className='w-3/12 flex items-center px-10'>
                    <img src="/vite.svg" alt="Logo" />
                </div>
                
                <div className='searchbar w-7/12 bg-purple-900 flex py-2 flex items-center gap-3 px-5'>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="size-6 absolute ms-4">
                        <path fill-rule="evenodd" d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z" clip-rule="evenodd" />
                    </svg>

                    <input className='border-2 border-solid border-white w-full rounded-[5px] h-10' type="text" />
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="white" className="size-8">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="white" className="size-8">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z" />
                    </svg>
                </div>

                <div className='w-2/12 py-2 px-5 flex items-center gap-4'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="white" className="size-8">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    </svg>
                    <h6 className='text-xl text-white'>Admin</h6>
                </div>

            </header>
            <div className='flex'>
                <div className='h-[calc(100vh-80px)] bg-gray-100 w-3/12 px-10'>
                    <ul>
                        <li className="my-5">
                            <Link className="text-xl" to="/">Dashboard</Link>
                        </li>
                        <li className="my-5">
                            <Link className="text-xl" to="/task">Task</Link>
                        </li>
                        <li className="my-5">
                            <Link className="text-xl" to="/attendance">Attendance</Link>
                        </li>
                        <li className="my-5">
                            <Link className="text-xl" to="/user">User</Link>
                        </li>
                        <li className="my-5">
                            <p className="text-xl" onClick={handleLogout}>Logout</p>
                        </li>
                        
                    </ul>
                </div>
                <div className='h-[calc(100vh-80px)] w-9/12 overflow-y-scroll p-5'>
                {children}
                </div>
                
            </div>
        </>
    )
}

export default Header;

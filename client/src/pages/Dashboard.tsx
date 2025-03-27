import { useEffect, useState } from "react"
import axios from "axios";

export default function Dashboard() {
    const [projectcount, setProjectcount] = useState(0)
    const [taskCount, setTaskCount] = useState(0)

    const fetchData= async ()=>{
        const response = await axios.get("http://localhost:5000/api/project");
        setProjectcount(response.data.length)

        const response1 = await axios.get("http://localhost:5000/api/task");
        setTaskCount(response1.data.length)

        const response2 = await axios.get("http://localhost:5000/api/task");
        console.log(response2.data)
    }

    useEffect(()=>{
        fetchData()
    },[])

    return (
        <div className='flex h-full gap-5'>
            <div className='w-1/3 bg-red-50 h-1/2 rounded-2xl p-5'>
                <div className='flex gap-2 items-center mb-5'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M10.125 2.25h-4.5c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125v-9M10.125 2.25h.375a9 9 0 0 1 9 9v.375M10.125 2.25A3.375 3.375 0 0 1 13.5 5.625v1.5c0 .621.504 1.125 1.125 1.125h1.5a3.375 3.375 0 0 1 3.375 3.375M9 15l2.25 2.25L15 12" />
                    </svg>

                    <h4 className='text-2xl'>{projectcount} Projects</h4>
                </div>

                <div className='flex gap-2 items-center mb-5'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M10.125 2.25h-4.5c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125v-9M10.125 2.25h.375a9 9 0 0 1 9 9v.375M10.125 2.25A3.375 3.375 0 0 1 13.5 5.625v1.5c0 .621.504 1.125 1.125 1.125h1.5a3.375 3.375 0 0 1 3.375 3.375M9 15l2.25 2.25L15 12" />
                    </svg>

                    <h4 className='text-2xl'>{taskCount} Task Assigned</h4>
                </div>

                <div className='flex gap-2 items-center mb-5'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M10.125 2.25h-4.5c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125v-9M10.125 2.25h.375a9 9 0 0 1 9 9v.375M10.125 2.25A3.375 3.375 0 0 1 13.5 5.625v1.5c0 .621.504 1.125 1.125 1.125h1.5a3.375 3.375 0 0 1 3.375 3.375M9 15l2.25 2.25L15 12" />
                    </svg>

                    <h4 className='text-2xl'>10 Task Completed</h4>
                </div>

                <div className='flex gap-2 items-center mb-5'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M10.125 2.25h-4.5c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125v-9M10.125 2.25h.375a9 9 0 0 1 9 9v.375M10.125 2.25A3.375 3.375 0 0 1 13.5 5.625v1.5c0 .621.504 1.125 1.125 1.125h1.5a3.375 3.375 0 0 1 3.375 3.375M9 15l2.25 2.25L15 12" />
                    </svg>

                    <h4 className='text-2xl'>5 Pending</h4>
                </div>

            </div>

            <div className='w-2/3 bg-red-50 h-1/2 rounded-2xl p-5'>
                <h3 className='text-2xl'>Employee Present</h3>
                <hr className='my-2' />

                <div className='grid grid-cols-3 gap-4'>
                    {/* heading */}
                    <h5 className='xl font-medium'>Employee</h5>
                    <h5 className='xl font-medium'>Check In</h5>
                    <h5 className='xl font-medium'>Check Out</h5>
                    {/* heading */}
                    <div className='flex gap-2'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                        </svg>
                        <h5>Prahalad Kumhar</h5>
                    </div>
                    <p>09:10 am</p>
                    <p>06:10 pm</p>

                    <div className='flex gap-2'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                        </svg>
                        <h5>Prahalad Kumhar</h5>
                    </div>
                    <p>09:10 am</p>
                    <p>06:10 pm</p>

                    <div className='flex gap-2'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                        </svg>
                        <h5>Prahalad Kumhar</h5>
                    </div>
                    <p>09:10 am</p>
                    <p>06:10 pm</p>

                </div>
            </div>
        </div>
    )
}

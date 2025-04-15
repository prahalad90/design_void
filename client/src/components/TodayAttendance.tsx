import axios from "axios"
import { Fragment, useEffect, useState } from "react";

const TodayAttendance = () => {
    const [attData, setAttData] = useState([]);

    const fetchAttendance = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:5000/api/attendance`);
            setAttData(response.data);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    useEffect(() => {
        fetchAttendance();
    }, []);

    return (
        <>
            <div className='w-2/3 bg-red-50 h-1/2 rounded-2xl p-5'>
                <h3 className='text-2xl'>Employee Present</h3>
                <hr className='my-2' />

                <div className='grid grid-cols-3 gap-4'>
                    {/* heading */}
                    <h5 className='xl font-medium'>Employee</h5>
                    <h5 className='xl font-medium'>Check In</h5>
                    <h5 className='xl font-medium'>Check Out</h5>

                    {attData.map((item, index) => (
                        <Fragment key={index}>
                            <div className='flex gap-2'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                                </svg>
                                <h5>{item.name}</h5>
                            </div>
                            <p>{item.check_in}</p>
                            <p>{item.check_out}</p>
                        </Fragment>
                    ))}
                </div>
            </div>
        </>
    )
}

export default TodayAttendance;
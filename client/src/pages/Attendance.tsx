import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import CameraComponent from '../components/CameraComponent'
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Attendance() {
  const [attData, setAttData] = useState([]);

  const fetchAttendance = async () => {
    const userid = localStorage.getItem('id')
    try {
      const response = await axios.get(`http://127.0.0.1:5000/api/attendance?id=${userid}`);
      const attData = response.data;
      console.log(attData)
      setAttData(attData);

    } catch (error) {
      console.error("Error fetching users:", error);  
    }
  };

  useEffect(() => {
      fetchAttendance();
    }, []);

  return (
<>
    <div>
    <CameraComponent backendUrl="http://localhost:5000/api/attendance" />          
    </div>
    
    <div className='p-5'>
        <FullCalendar
        plugins={[ dayGridPlugin ]}
        initialView="dayGridMonth"
        events={attData.map(e => ({ title: `Check In: ${e.check_in}`, date: e.date }))}
      />
    </div>
    </>
  );
}

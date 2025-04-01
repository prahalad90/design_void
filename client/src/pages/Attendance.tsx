import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import CameraComponent from '../components/CameraComponent'
import { useEffect } from 'react';
import axios from 'axios';

export default function Attendance() {

  const fetchAttendance = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/attendance?id=1");
      console.log(response)
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
        events={[
          { title: 'Check In', date: '2025-03-25' },
          { title: 'Instagram', date: '2025-03-15' },
          { title: 'event 1', date: '2025-04-01' },
          { title: 'event 2', date: '2025-03-02' },
        ]}
      />
    </div>
    </>
  )
}

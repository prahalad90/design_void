import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'

export default function Attendance() {
  return (
    <div className='p-5'>
        <FullCalendar
        plugins={[ dayGridPlugin ]}
        initialView="dayGridMonth"
        events={[
            { title: 'event 1', date: '2025-04-01' },
            { title: 'event 2', date: '2025-03-02' }
        ]}
    />
    </div>
    
  )
}

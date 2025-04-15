import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

type CalendarParams = {
    project: string;
};

const Calendar: React.FC = () => {
    const [tasks, setTasks] = useState([]);
    const { project } = useParams<CalendarParams>();
    const fetchTask = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/task/project/${project}`);
            const taskData = response.data;
            setTasks(taskData);

        } catch (error) {
            console.log('Fetch Error')
            
        }
    };

    useEffect(() => {
        fetchTask();
    }, []);


    return (
        <>
            <div className='p-5'>
                <h1 className='text-2xl'>Content Calendar</h1>
                <hr />
                <FullCalendar
                    plugins={[dayGridPlugin]}
                    initialView="dayGridMonth"
                    events={tasks.map(e => ({ title: e.title, date: e.duedate }))}
                />
            </div>
        </>
    )
}
export default Calendar;
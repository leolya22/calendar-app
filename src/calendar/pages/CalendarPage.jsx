import { Calendar } from 'react-big-calendar'
import { addHours } from 'date-fns'
import 'react-big-calendar/lib/css/react-big-calendar.css';

import { NavBar } from "../components/NavBar"
import { localizer } from '../helpers/calendarLocalizer';
import { getMessages } from '../helpers/getMessages';
import { CalendarEvent } from '../components/CalendarEvent';


export const CalendarPage = () => {
    const events = [
        {
            title: 'Cumle del jefe',
            notes: 'Comprar pastel',
            start: new Date(),
            end: addHours( new Date(), 2 ),
            bgColor: '#000000',
            user: {
                _id: '123',
                name: 'Leonardo'
            }
        },
    ]
    const eventStyleGetter = ( event, start, end, isSelected ) => {
        const style = {
            backgroundColor: 'red',
            borderRadius: '0px',
            opacity: 0.8,
            color: 'white'
        }

        return {
            style
        }
    }

    return (
        <>
            <NavBar />
            <Calendar
                culture='es'
                localizer={ localizer }
                events={ events }
                startAccessor="start"
                endAccessor="end"
                style={{ height: 'calc(100vh - 80px)' }}
                messages={ getMessages() }
                eventPropGetter={ eventStyleGetter }
                components={ CalendarEvent }
            />
        </>
    )
}
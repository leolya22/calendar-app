import { Calendar } from 'react-big-calendar'
import { addHours } from 'date-fns'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useState } from 'react';

import { NavBar } from "../components/NavBar"
import { localizer } from '../helpers/calendarLocalizer';
import { getMessages } from '../helpers/getMessages';
import { CalendarEvent } from '../components/CalendarEvent';
import { CalendarModal } from '../components/CalendarModal';


export const CalendarPage = () => {
    const [ lastView, setLastView ] = useState( localStorage.getItem('lastView') || 'week' );
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

    const onDoubleClick = event => {
        
    }

    const onSelect = event => {

    }

    const onViewChanged = ( event ) => {
        localStorage.setItem( 'lastView', event )
        setLastView( event );
        console.log( lastView );
    }

    return (
        <>
            <NavBar />
            <Calendar
                culture='es'
                localizer={ localizer }
                events={ events }
                defaultView={ lastView }
                startAccessor="start"
                endAccessor="end"
                style={{ height: 'calc(100vh - 80px)' }}
                messages={ getMessages() }
                eventPropGetter={ eventStyleGetter }
                components={{
                    event: CalendarEvent
                }}
                onDoubleClickEvent={ onDoubleClick }
                onSelectEvent={ onSelect }
                onView={ onViewChanged }
            />
            <CalendarModal />
        </>
    )
}
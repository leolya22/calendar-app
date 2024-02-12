import { Calendar } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useState } from 'react';

import { NavBar } from "../components/NavBar"
import { localizer } from '../helpers/calendarLocalizer';
import { getMessages } from '../helpers/getMessages';
import { CalendarEvent } from '../components/CalendarEvent';
import { CalendarModal } from '../components/CalendarModal';
import { useUiStore } from '../../hooks/useUiStore';
import { useCalendarStore } from '../../hooks/useCalendarStore';
import { FabAddNew } from '../components/FabAddNew';


export const CalendarPage = () => {
    const [ lastView, setLastView ] = useState( localStorage.getItem('lastView') || 'week' );
    const { openDateModal } = useUiStore();
    const { events, setActiveEvent } = useCalendarStore();

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
        openDateModal();
    }

    const onSelect = event => {
        setActiveEvent( event );
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
            <FabAddNew />
        </>
    )
}
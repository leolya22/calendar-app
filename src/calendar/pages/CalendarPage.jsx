import { Calendar } from 'react-big-calendar'
import { useState } from 'react';
import { useSelector } from 'react-redux';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import { NavBar } from "../components/NavBar"
import { localizer } from '../helpers/calendarLocalizer';
import { getMessages } from '../helpers/getMessages';
import { CalendarEvent } from '../components/CalendarEvent';
import { CalendarModal } from '../components/CalendarModal';
import { useUiStore } from '../../hooks/useUiStore';
import { useCalendarStore } from '../../hooks/useCalendarStore';
import { FabAddNew } from '../components/FabAddNew';
import { FabDelete } from '../components/FabDelete';


export const CalendarPage = () => {
    const [ lastView, setLastView ] = useState( localStorage.getItem('lastView') || 'week' );
    const { isDateModalOpen, openDateModal } = useUiStore();
    const { events, setActiveEvent } = useCalendarStore();
    const { activeEvent } = useSelector( state => state.calendar )

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

    const onSelect = event => {
        setActiveEvent( event );
    }

    const onViewChanged = ( event ) => {
        localStorage.setItem( 'lastView', event )
        setLastView( event );
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
                onDoubleClickEvent={ openDateModal }
                onSelectEvent={ onSelect }
                onView={ onViewChanged }
            />
            <CalendarModal />
            { activeEvent && !isDateModalOpen && <FabDelete /> }
            <FabAddNew />
        </>
    )
}
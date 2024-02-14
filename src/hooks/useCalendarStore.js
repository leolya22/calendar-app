import { useDispatch, useSelector } from "react-redux";

import { onAddNewEvent, onDeleteEvent, onSetActiveEvent, onUpdateEvent } from "../store/calendar/calendarSlice";


export const useCalendarStore = () => {
    const dispatch = useDispatch();
    const { events, activeEvent } = useSelector( state => state.calendar );

    const setActiveEvent = ( calendarEvent ) => {
        dispatch( onSetActiveEvent( calendarEvent ) );
    }
    const startSavingEvent = async ( calendarEvent ) => {
        if( calendarEvent._id ) {
            dispatch( onUpdateEvent( calendarEvent ) );
        } else {
            dispatch( onAddNewEvent({
                _id: new Date().getTime(),
                ...calendarEvent
            }));
        }
    }
    const startDeletingEvent = async () => {
        dispatch( onDeleteEvent() );
    }
    
    return {
        events,
        activeEvent,
        setActiveEvent,
        startSavingEvent,
        startDeletingEvent
    }
}
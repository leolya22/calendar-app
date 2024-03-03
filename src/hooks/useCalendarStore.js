import { useDispatch, useSelector } from "react-redux";

import { onAddNewEvent, onChargeEvents, onDeleteEvent, onSetActiveEvent, onUpdateEvent } from "../store/calendar/calendarSlice";
import calendarApi from "../api/calendarApi";
import { convertStringToDate } from "../calendar/helpers/convertStringToDate";


export const useCalendarStore = () => {
    const dispatch = useDispatch();
    const { events, activeEvent } = useSelector( state => state.calendar );
    const { user } = useSelector( state => state.auth );

    const setActiveEvent = ( calendarEvent ) => {
        dispatch( onSetActiveEvent( calendarEvent ) );
    }

    const startSavingEvent = async ( calendarEvent ) => {
        if( calendarEvent._id ) {
            dispatch( onUpdateEvent( calendarEvent ) );
        } else {
            const { data } = await calendarApi.post( '/calendar', calendarEvent )
            dispatch( onAddNewEvent({
                _id: data.eventoDB.id,
                user,
                ...calendarEvent
            }));
        }
    }

    const startDeletingEvent = async () => {
        try {
            if( activeEvent._id ) {
                await calendarApi.delete( '/calendar/' + activeEvent._id );
            }
            dispatch( onDeleteEvent() );
        } catch ( error ) {
            console.log( error );
        }
    }

    const startChargingEvents = async () => {
        try {
            const { data } = await calendarApi.get( '/calendar' );
            const eventosParseados = convertStringToDate( data.eventos );
            dispatch( onChargeEvents( eventosParseados ) );
        } catch ( error ) {
            console.log( 'Error al cargar los eventos: ', error );
        }
    }
    
    return {
        events,
        activeEvent,
        setActiveEvent,
        startSavingEvent,
        startDeletingEvent,
        startChargingEvents
    }
}
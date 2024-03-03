import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";

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
        try {
            if( calendarEvent._id ) {
                await calendarApi.put( '/calendar/' + calendarEvent._id , calendarEvent );
                dispatch( onUpdateEvent({ ...calendarEvent, user }) );
                return;
            }

            const { data } = await calendarApi.post( '/calendar', calendarEvent )
            dispatch( onAddNewEvent({
                _id: data.eventoDB.id,
                user,
                ...calendarEvent
            }));
        } catch ( error ) {
            console.log( error );
            Swal.fire( 'Error al guardar', error.response.data.message, 'error' );
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
            Swal.fire( 'Error al borrar', error.response.data.message, 'error' );
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
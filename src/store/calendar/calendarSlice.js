import { createSlice } from '@reduxjs/toolkit';


export const calendarSlice = createSlice({
    name: 'calendar',
    initialState: {
        isLoadingEvents: true,
        events: [],
        activeEvent: null,
    },
    reducers: {
        onSetActiveEvent: ( state, { payload } ) => {
            state.activeEvent = payload;
        },
        onAddNewEvent: ( state, { payload } ) => {
            state.events.push( payload );
            state.activeEvent = null;
        },
        onUpdateEvent: ( state, { payload } ) => {
            state.events = state.events.map( event => {
                if( event._id == payload._id ) {
                    return payload;
                }
                return event;
            })
        },
        onDeleteEvent: ( state ) => {
            state.events = state.events.filter( event => event._id != state.activeEvent._id );
            state.activeEvent = null;
        },
        onChargeEvents: ( state, { payload } ) => {
            state.isLoadingEvents = false;
            state.events = payload;
            state.activeEvent = null;
        },
        onCleanCalendar: ( state ) => {
            state.isLoadingEvents = true;
            state.events = [];
            state.activeEvent = null;
        }
    },
})

export const {
    onSetActiveEvent,
    onAddNewEvent,
    onUpdateEvent,
    onDeleteEvent,
    onChargeEvents,
    onCleanCalendar
} = calendarSlice.actions;
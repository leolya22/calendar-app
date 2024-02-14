import { createSlice } from '@reduxjs/toolkit';
import { addHours } from 'date-fns';


const temporalEvent = {
    _id: new Date(),
    title: 'Cumle del jefe',
    notes: 'Comprar pastel',
    start: new Date(),
    end: addHours( new Date(), 2 ),
    bgColor: '#000000',
    user: {
        _id: '123',
        name: 'Leonardo'
    }
}

export const calendarSlice = createSlice({
    name: 'calendar',
    initialState: {
        events: [ temporalEvent ],
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
        onDeleteEvent: state => {
            state.events = state.events.filter( event => event._id != state.activeEvent._id );
            state.activeEvent = null;
        }
    },
})

export const { onSetActiveEvent, onAddNewEvent, onUpdateEvent, onDeleteEvent } = calendarSlice.actions;
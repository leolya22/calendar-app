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
        }
    },
})

export const { onSetActiveEvent } = calendarSlice.actions;
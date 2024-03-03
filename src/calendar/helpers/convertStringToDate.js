import { parseISO } from "date-fns"


export const convertStringToDate = ( events = [] ) => {
    return events.map( event => {
        event.start = parseISO( event.start );
        event.end = parseISO( event.end );
        event._id = event.id;
        delete event.id;
        return event;
    })
}
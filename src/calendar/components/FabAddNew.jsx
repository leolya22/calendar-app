import { useDispatch, useSelector } from "react-redux";
import { addHours } from "date-fns";

import { useUiStore } from "../../hooks/useUiStore"
import { useCalendarStore } from "../../hooks/useCalendarStore";


export const FabAddNew = () => {
    const dispatch = useDispatch();
    const { openDateModal } = useUiStore();
    const { setActiveEvent } = useCalendarStore();
    const { user } = useSelector( state => state.auth );

    const addNewEvent = () => {
        setActiveEvent({
            title: '',
            notes: '',
            start: new Date(),
            end: addHours( new Date(), 2 ),
            bgColor: '#000000',
            user
        });
        dispatch( openDateModal() );
    }
    return (
        <button className="btn btn-primary fab" onClick={ addNewEvent }>
            <i className="fas fa-plus"/>
        </button>
    )
}
import { useCalendarStore } from "../../hooks/useCalendarStore";


export const FabDelete = () => {
    const { startDeletingEvent } = useCalendarStore();

    return (
        <button className="btn btn-danger fab-danger" onClick={ startDeletingEvent }>
            <i className="fas fa-trash-alt"/>
        </button>
    )
}
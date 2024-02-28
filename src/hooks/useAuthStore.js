import { useDispatch, useSelector } from "react-redux"

import calendarApi from "../api/calendarApi";


export const useAuthStore = () => {
    const { status, user, errorMessage } = useSelector( state => state.auth );
    const dispatch = useDispatch();

    const startLogin = async ({ email, password }) => {
        try {
            const response = await calendarApi.post( '/auth', { email, password } );
            console.log(response);
        } catch ( error ) {
            console.log( error );
        }
    }

    const startRegister = async ({ name, email, password }) => {
        try {
            const response = await calendarApi.post( '/auth/new', { name, email, password } );
            console.log(response);
        } catch ( error ) {
            console.log( error );
        }
    }

    return {
        errorMessage,
        user,
        status,
        startLogin,
        startRegister
    }
}
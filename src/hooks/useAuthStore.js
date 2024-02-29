import { useDispatch, useSelector } from "react-redux"

import calendarApi from "../api/calendarApi";
import { clearErrorMessage, onChecking, onLogin, onLogout } from "../store/auth/authSlice";


export const useAuthStore = () => {
    const { status, user, errorMessage } = useSelector( state => state.auth );
    const dispatch = useDispatch();

    const startLogin = async ({ email, password }) => {
        dispatch( onChecking() );
        try {
            const { data } = await calendarApi.post( '/auth', { email, password } );
            localStorage.setItem( 'token', data.token );
            localStorage.setItem( 'token-init-date', new Date().getTime() );

            dispatch( onLogin( data ) );
        } catch ( error ) {
            dispatch( onLogout( error.response.data.message ) );
            setTimeout(() => {
                dispatch( clearErrorMessage() );
            }, 100);
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
import { useDispatch, useSelector } from "react-redux"

import calendarApi from "../api/calendarApi";
import { clearErrorMessage, onChecking, onLogin, onLogout } from "../store/auth/authSlice";
import { onCleanCalendar } from "../store/calendar/calendarSlice";


export const useAuthStore = () => {
    const { status, user, errorMessage } = useSelector( state => state.auth );
    const dispatch = useDispatch();

    const startLogin = async ({ email, password }) => {
        dispatch( onChecking() );
        try {
            const { data } = await calendarApi.post( '/auth', { email, password } );
            localStorage.setItem( 'token', data.token );
            localStorage.setItem( 'token-init-date', new Date().getTime() );

            dispatch( onLogin({ name: data.name, id: data.uid}) );
        } catch ( error ) {
            console.log(error);
            dispatch( onLogout( error.response.data.message ) );
            setTimeout(() => {
                dispatch( clearErrorMessage() );
            }, 100);
        }
    }

    const startRegister = async ({ name, email, password }) => {
        try {
            const { data } = await calendarApi.post( '/auth/new', { name, email, password } );
            localStorage.setItem( 'token', data.token );
            localStorage.setItem( 'token-init-date', new Date().getTime() );

            dispatch( onLogin({ name: data.name, id: data.uid}) );
        } catch ( error ) {
            dispatch( onLogout( error.response.data.message ) );
            setTimeout(() => {
                dispatch( clearErrorMessage() );
            }, 100);
        }
    }

    const checkAuthToken = async () => {
        const token = localStorage.getItem( 'token' );
        if( !token ) return dispatch( onLogout( 'No se encontro el token' ) );
        try {
            const { data } = await calendarApi.get( '/auth/renew' );
            localStorage.setItem( 'token', data.token );
            localStorage.setItem( 'token-init-date', new Date().getTime() );

            dispatch( onLogin({ name: data.name, id: data.uid}) );
        } catch ( error ) {
            localStorage.clear();
            dispatch( onLogout( error.response.data.message || null ) );
            setTimeout(() => {
                dispatch( clearErrorMessage() );
            }, 100);
        }
    }

    const startLogout = () => {
        localStorage.clear();
        dispatch( onCleanCalendar() );
        dispatch( onLogout( null ) );
    }

    return {
        errorMessage,
        user,
        status,
        startLogin,
        startRegister,
        checkAuthToken,
        startLogout
    }
}
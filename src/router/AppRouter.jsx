import { Routes, Route } from "react-router-dom";

import { LoginPage } from "../auth/pages/LoginPage";
import { CalendarPage } from "../calendar/pages/CalendarPage";
import { useAuthStore } from "../hooks/useAuthStore";
import { useEffect } from "react";


export const AppRouter = () => {
    const { status, checkAuthToken } = useAuthStore();

    useEffect( () => {
        checkAuthToken();
    }, [])

    if( status === 'checking' ) {
        return (
            <h3>Cargando...</h3>
        )
    }

    return (
        <Routes>
            { status === 'not-authenticated' 
                ? <Route path='/*' element={ <LoginPage /> } />
                : <Route path='/*' element={ <CalendarPage /> } />
            }
        </Routes>
    )
}
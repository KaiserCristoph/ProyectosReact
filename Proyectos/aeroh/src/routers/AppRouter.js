import { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import { authInstance } from '../firebase/firebase-config';
import { onAuthStateChanged } from 'firebase/auth';

import PrivateRoute from './PrivateRoute';
import DashboardRoutes from './DashboardRoutes';

import LoginScreen from '../components/auth/LoginScreen';
import RegisterScreen from '../components/auth/RegisterScreen';

import { login } from '../actions/auth';

const AppRouter = () => {

    const dispatch = useDispatch();

    const [checking, setChecking] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const auth = useSelector(state => state.auth)

    useEffect(() => {

        onAuthStateChanged(authInstance, user => {
            if (user?.uid) {
                dispatch(login(user.uid, user.displayName));
                setIsLoggedIn(true);
            } else {
                setIsLoggedIn(false);
            }

            setChecking(false);
        });

    }, [])


    if (checking) {
        return (
            <p>Espere...</p>
        )
    }

    console.log('Login: ', isLoggedIn)


    return (
        <Routes>
            {/* Public Routes */}
            {!isLoggedIn && (<>
                <Route
                    path="/auth/login"
                    element={<LoginScreen />}
                />

                <Route
                    path="/auth/register"
                    element={<RegisterScreen />}
                />

                <Route
                    path="/auth/*"
                    element={<Navigate to="/auth/login" />}
                />
            </>)}


            <Route path="/*" element={
                <PrivateRoute isAuthenticated={isLoggedIn}>
                    <DashboardRoutes />
                </PrivateRoute>
            }
            />
        </Routes>
    )
}

export {
    AppRouter
}
import Swal from 'sweetalert2';

import { getAuth, signInWithPopup, createUserWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth';
import { googleAuthProvider } from '../firebase/firebase-config.js';
import { types } from '../types/types';

export const startLoginEmailPassword = (email, password) => {
    return (dispatch) => {
        setTimeout(() => {
            dispatch(login(password, email))
        }, 3500);
    }
}

export const startGoogleLogin = () => {
    return (dispatch) => {
        const auth = getAuth();
        signInWithPopup(auth, googleAuthProvider)
            .then(({ user }) => {
                dispatch(login(user.uid, user.displayName))
            });
    }
}

export const login = (uid, displayName) => (
    {
        type: types.login,
        payload: {
            uid,
            displayName
        }
    }
)

export const startRegisterWithEmailPasswordName = (email, password, name) => {
    return (dispatch) => {

        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
            .then(async ({ user }) => {

                await updateProfile(user, { displayName: name });

                dispatch(
                    login(user.uid, user.displayName)
                );
                console.log(user);
            })
            .catch(e => {
                console.log(e);
                Swal.fire('Error', e.message, 'error');
            });
    };
};

export const startLogout = () => {
    return async (dispatch) => {
        await signOut();

        dispatch(logout());
    }
}


export const logout = () => ({
    type: types.logout
})
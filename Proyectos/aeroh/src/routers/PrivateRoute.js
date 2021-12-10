import {Navigate} from 'react-router-dom';

const PrivateRoute = ({
    isAuthenticated,  
    children
}) => {
    // const { pathname, search } = useLocation();
    
    // localStorage.setItem('lastPath', pathname + search );
    
    return isAuthenticated
        ? children
        : <Navigate to="/auth/login" />
}

export {
    PrivateRoute as default
}
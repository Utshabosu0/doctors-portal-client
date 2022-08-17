
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Navigate, useLocation } from 'react-router-dom';
import auth from '../../firebase.init';
import Loading from '../Shared/Loading';
import useAdmin from '../../hooks/useAdmin';
import { signOut } from 'firebase/auth';
import useDoctor from '../../hooks/useDoctor';

const RequireDoctor = ({children}) => {
    const [user, loading] = useAuthState(auth);
    const [admin, adminLoading] = useAdmin(user);
    const [doctor,doctorLoading] = useDoctor(user);

    const location = useLocation();

    if(doctorLoading){
        return <Loading></Loading>
    }

    if(!doctor){
        signOut(auth);
        return <Navigate to="/login" state={{ from: location }} replace></Navigate>
    }
    return children;
};

export default RequireDoctor;
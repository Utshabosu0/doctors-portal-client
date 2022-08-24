import React, { useEffect, useState } from 'react';

const MyService = () => {
    const [services, setServices] = useState([]);
    console.log(services)
    // const [user] = useAuthState(auth);
    // const navigate = useNavigate()

    // useEffect(() => {
    //     if (user) {
    //         fetch(`http://localhost:5000/booking?patient=${user.email}`, {
    //             method: 'GET',
    //             headers: {
    //                 'authorization': `Bearer ${localStorage.getItem('accessToken')}`
    //             }
    //         })
    //             .then(res => {
    //                 console.log('res', res);
    //                 if (res.status === 401 || res.status === 403) {
    //                     signOut(auth);
    //                     localStorage.removeItem('accessToken');
    //                     navigate('/');
    //                 }
    //                 return res.json()
    //             })
    //             .then(data => {

    //                 setAppointments(data);
    //             });
    //     }
    // }, [user])

    useEffect(() => {
        fetch(`http://localhost:5000/service`)
            .then(res => res.json())
            .then(data => setServices(data));

    }, [])

    return (
        <div>
            
        </div>
    );
};

export default MyService;
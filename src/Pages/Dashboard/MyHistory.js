import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
// import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const MyHistory = () => {

    const [appointments, setAppointments] = useState([]);

    const [user] = useAuthState(auth);
    const navigate = useNavigate()

    useEffect(() => {
        if (user) {
            fetch(`http://localhost:5000/booking?patient=${user.email}`, {
                method: 'GET',
                headers: {
                    'authorization': `Bearer ${localStorage.getItem('accessToken')}`
                }
            })
                .then(res => {
                    console.log('res', res);
                    if (res.status === 401 || res.status === 403) {
                        signOut(auth);
                        localStorage.removeItem('accessToken');
                        navigate('/');
                    }
                    return res.json()
                })
                .then(data => {

                    setAppointments(data);
                });
        }
    }, [user]);

    const todayDate = new Date();
    todayDate.setHours(0,0,0,0);
    const pastAppointments = appointments.filter(appointment => new Date(appointment.date) < todayDate );
    

    console.log(new Date(pastAppointments[0]?.date), 'past');

    return (
        <div>
        <h2>My History: {pastAppointments.length}</h2>
        <div class="flex justify-end ">
        </div>
        <div class="overflow-x-auto">
            <table class="table w-full">
                <thead>
                    <tr>
                        <th></th>
                        <th>Name</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Treatment</th>
                        <th>Comment</th>
                    </tr>
                </thead>
                
                <tbody>
                    {
                        pastAppointments.map((a, index) => <tr key={a._id}>
                            <th>{index + 1}</th>
                            <td>{a.patientName}</td>
                            <td>{a.date}</td>
                            <td>{a.slot}</td>
                            <td>{a.treatment}</td>
                            <td>{a.comment}</td>
                        </tr>)
                    }


                </tbody>
            </table>
        </div>
    </div>
    );
};

export default MyHistory;
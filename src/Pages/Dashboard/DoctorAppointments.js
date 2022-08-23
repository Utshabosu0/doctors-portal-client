
// import { signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom';
// import { Link, useNavigate } from 'react-router-dom';
import auth from '../../firebase.init';

const DoctorAppointments = () => {

    const [appointments, setAppointments] = useState([]);
    console.log(appointments)
    
    const [user] = useAuthState(auth);
    // const navigate = useNavigate()

    useEffect(() => {
        if (user) {
            fetch(`http://localhost:5000/bookingss?doctorName=${user.name}`, {
                method: 'GET',
                headers: {
                    'authorization': `Bearer ${localStorage.getItem('accessToken')}`
                }
            })
                .then(res => {
                    console.log('res', res);
                    if (res.status === 401 || res.status === 403) {
                        // signOut(auth);
                        // localStorage.removeItem('accessToken');
                        // navigate('/');
                    }
                    return res.json()
                })
                .then(data => {

                    setAppointments(data);
                });
        }
    }, [user])
  

    // useEffect(() => {
    //     fetch(`http://localhost:5000/bookings`)
    //         .then(res => res.json())
    //         .then(data => setAppointments(data));

    // }, [])

    return (
        <div>
            <h2>Appointments: {appointments.length}</h2>
            <div class="overflow-x-auto">
                <table class="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Treatment</th>
                            <th>Message</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            appointments.map((a, index) => <tr key={a._id}>
                                <th>{index + 1}</th>
                                <td>{a.patientName}</td>
                                <td>{a.date}</td>
                                <td>{a.slot}</td>
                                <td>{a.treatment}</td>
                                <td><Link to={`/dashboard/updateComment/${a._id}`}><button className='btn btn-xs btn-success'>Comment</button></Link></td>
                            </tr>)
                        }


                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default DoctorAppointments;
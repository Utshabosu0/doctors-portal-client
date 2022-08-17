import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
// import {  useNavigate } from 'react-router-dom';
// import { signOut } from 'firebase/auth';
// import { useAuthState } from 'react-firebase-hooks/auth';
// import auth from '../../firebase.init';

const AdminAppointments = () => {

    const [appointments, setAppointments] = useState([]);
    console.log(appointments)
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
        fetch(`http://localhost:5000/bookings`)
            .then(res => res.json())
            .then(data => setAppointments(data));

    }, [])

   
    return (
        <div>
            <h2>Appointments: {appointments.length}</h2>
            <div class="flex justify-end ">
            <Link to={`/dashboard/pay`}><button className='btn btn-xs btn-success'>User Payment Page</button></Link>             
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
                            <th>Payment Status</th>
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
                                <td>
                                {(a.price && !a.paid)&& <Link to={`/dashboard/updateBooking/${a._id}`}><button className='btn btn-xs btn-success'>UpdateBooking</button></Link>
}
                                    {(a.price && a.paid) && <div>
                                        <p><span className='text-success'>Paid</span></p>
                                        {/* <p>Transaction id: <span className='text-success'>{a.transactionId}</span></p> */}
                                    </div>}
                                </td>
                            </tr>)
                        }


                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminAppointments;
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
        fetch(`http://localhost:5000/booking-list`)
            .then(res => res.json())
            .then(data => setAppointments(data));

    }, [])

    const handleRemove = id => {
        fetch(`http://localhost:5000/booking/${id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount > 0) {
                    alert('Cancel Your Appointment');
                    const cancelAppointment = appointments.filter(appointment => appointment._id !== id);
                    setAppointments(cancelAppointment);
                }
            });
    

}
    return (
        <div>
            <h2>Appointments: {appointments.length}</h2>
            <div class="flex justify-end ">
            </div>
            <div class="overflow-x-auto">
                <table class="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>AppointmentID</th>
                            <th>Name</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Treatment</th>
                            <th>Doctor</th>
                            <th>Amount</th>
                            <th> Status</th>
                            <th>Action</th>
                            <th>Action</th>

                        </tr>
                    </thead>
                    <tbody>
                        {
                            appointments.map((a, index) => <tr key={a._id}>
                                <th>{index + 1}</th>
                                <td>{a._id}</td>
                                <td>{a.patientName}</td>
                                <td>{a.appointmentDate}</td>
                                <td>{a.appointmentSlot}</td>
                                <td>{a.patientTreatment}</td>
                                <td>{a.doctorName}</td>
                                <td>{a.patientPay}</td>
                                <td>
                                {(a.price && !a.paid)&& <Link to={`/dashboard/updateBooking/${a._id}`}><button className='btn btn-xs btn-success'>Payment Update</button></Link>
}
                                    {(a.price && a.paid) && <div>
                                        <p><span className='text-success'>Paid</span></p>
                                        {/* <p>Transaction id: <span className='text-success'>{a.transactionId}</span></p> */}
                                    </div>}
                                </td>
                                <td>
                                <button
                         onClick={() => handleRemove(a._id)}
                        className='delete-button text-center '>
                        <FontAwesomeIcon className='delete-icon text-red-600 text-2xl' icon={faTrashAlt}></FontAwesomeIcon></button>
                                </td> <td>
                                {(a.price && !a.paid)&&             <Link to={`/dashboard/pay`}><button className='btn btn-xs btn-success'>Payment Page</button></Link>             

}
                                   
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
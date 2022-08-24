import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import { Link, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const MyAppointments = () => {

    const [appointments, setAppointments] = useState([]);
    const [user] = useAuthState(auth);
    const navigate = useNavigate()

    useEffect(() => {
        if (user) {
            fetch(`http://localhost:5000/booking?patientEmail=${user.email}`, {
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
    }, [user])

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
    const todayDate = new Date();
    todayDate.setHours(0,0,0,0);

    const futureApointments = appointments.filter(appointment => new Date(appointment.appointmentDate) >= todayDate);
    console.log(futureApointments, 'future');

    
    return (
        <div>
            <h2>My Appointments: {futureApointments.length}</h2>
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
                            <th>Doctor</th>
                            <th>Pay</th>
                            <th>Payment</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    
                    <tbody>
                        {
                            futureApointments.map((a, index) => <tr key={a._id}>
                                <th>{index + 1}</th>
                                <td>{a.patientName}</td>
                                <td>{a.appointmentDate}</td>
                                <td>{a.appointmentSlot}</td>
                                <td>{a.patientTreatment}</td>
                                <td>{a.doctorName}</td>
                                <td>{a.patientPay}</td>
                                <td>
                                    {(a.patientPay && !a.paid) && <Link to={`/dashboard/payment/${a._id}`}><button className='btn btn-xs btn-success'>pay</button></Link>}
                                    {(a.patientPay && a.paid) && <div>
                                        <p><span className='text-success'>Paid</span></p>
                                        {/* <p>Transaction id: <span className='text-success'>{a.transactionId}</span></p> */}
                                    </div>}
                                </td>
                                <td>{(a.patientPay && !a.paid) &&
                                <button
                         onClick={() => handleRemove(a._id)}
                        className='delete-button text-center '>
                        <FontAwesomeIcon className='delete-icon text-red-600 text-2xl' icon={faTrashAlt}></FontAwesomeIcon></button>}
                                </td>
                                <td>

                                </td>
                            </tr>)
                        }


                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyAppointments;
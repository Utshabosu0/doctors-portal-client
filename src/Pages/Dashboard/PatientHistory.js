import { signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import auth from '../../firebase.init';

const PatientHistory = () => {
    const [appointments, setAppointments] = useState([]);
    const [user] = useAuthState(auth);
    const navigate = useNavigate()

    useEffect(() => {
        if (user) {
            fetch(`http://localhost:5000/doctor-booking?doctorEmail=${user.email}`, {
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

    const todayDate = new Date();
    todayDate.setHours(0,0,0,0);
    const pastAppointments = appointments.filter(appointment => new Date(appointment.appointmentDate) < todayDate );
    

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
                        <th> Patient Name</th>
                            <th>Date</th>
                        <th>Treatment</th>
                        <th>Instruction </th>

                    </tr>
                </thead>
                
                <tbody>
                    {
                        pastAppointments.map((a, index) => <tr key={a._id}>
                            <th>{index + 1}</th>
                            <td>{a.patientName}</td>
                            <td>{a.appointmentDate}</td>
                            <td>{a.patientTreatment}</td>
                            <td>{a.comment}</td>
                      
                        </tr>)
                    }


                </tbody>
            </table>
        </div>
    </div>
    );
};

export default PatientHistory;
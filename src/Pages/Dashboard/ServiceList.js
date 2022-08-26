import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import auth from '../../firebase.init';

const ServiceList = () => {
    const [services, setServices] = useState([]);
    console.log(services);

    // const [user] = useAuthState(auth);
    // const navigate = useNavigate()

    // useEffect(() => {
    //     if (user) {
    //         fetch(`http://localhost:5000/booking?patient?doctorEmail=${user.email}`, {
    //             method: 'GET',
    //             headers: {
    //                 'authorization': `Bearer ${localStorage.getItem('accessToken')}`
    //             }
    //         })
    //             .then(res => {
    //                 console.log('res', res);
    //                 if (res.status === 401 || res.status === 403) {
    //                     
    //                 }
    //                 return res.json()
    //             })
    //             .then(data => {

    //                 setAppointments(data);
    //             });
    //     }
    // }, [user])

    // useEffect(() => {
    //     fetch(`http://localhost:5000/service`)
    //         .then(res => res.json())
    //         .then(data => setServices(data));

    // }, [])

    useEffect(() => {
        fetch(`http://localhost:5000/service-list`)
            .then(res => res.json())
            .then(data => setServices(data));

    }, [])
    

    const handleRemove = id => {
        fetch(`http://localhost:5000/service/${id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount > 0) {
                    alert('Cancel Your Appointment');
                    const cancelService = services.filter(service => service._id !== id);
                    setServices(cancelService);
                }
            });
    

}

    return (
        <div>
                        <h2>My Services: {services.length}</h2>
                        <div class="overflow-x-auto">
                <table class="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Service Name</th>
                            <th>Amount</th>
                            <th>Action</th>

                        </tr>
                    </thead>
                    <tbody>
                        {
                            services.map((a, index) => <tr key={a._id}>
                                <th>{index + 1}</th>
                                <td>{a.serviceName}</td>
                   
                                <td>{a.pay}</td>
                                
                                <td>
                                <button
                         onClick={() => handleRemove(a._id)}
                        className='delete-button text-center '>
                        <FontAwesomeIcon className='delete-icon text-red-600 text-2xl' icon={faTrashAlt}></FontAwesomeIcon></button>
                                </td>
                                
                            </tr>)
                        }


                    </tbody>
                </table>
            </div>

        </div>
    );
};

export default ServiceList;
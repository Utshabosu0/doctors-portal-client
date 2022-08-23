import React, { useEffect, useState } from 'react';
import Footer from '../Shared/Footer';
import DoctorsRow from './DoctorsRow';


const Doctor = () => {
    const [userDoctors, setUserDoctors] = useState([]);

    // product to be rendered on the uI
    // API
    useEffect(() => {
        fetch('http://localhost:5000/doctors')
            .then(res => res.json())
            .then(data => {
                setUserDoctors(data);
            });
    }, []);
    return (
        <>
        <div className='my-10'>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
            {
                            userDoctors.map(doctor => <DoctorsRow
                                key={doctor._key}
                                doctor={doctor}
                            ></DoctorsRow>)
                        }
            </div>
            
        </div>
        <div>
            <Footer></Footer>
        </div>
        </>
    );
};

export default Doctor;
import React from 'react';
import doctor1 from '../../assets/images/doctor1.png';
import doctor2 from '../../assets/images/doctor2.png';
import doctor3 from '../../assets/images/doctor3.png';
import MyDoctor from './MyDoctor'

const Doctors = () => {
    const Doctors = [
        {
            _id: 1,
            name: 'Dr.rafiq',
            specialist: 'Teeth Orthodontics',
            img: doctor1,
            experience:3
        },
        {
            _id: 2,
            name: 'Dr.rafiq',
            specialist: 'Cosmetic Dentistry',
            img: doctor2,
            experience:4

        },
        {
            _id: 3,
            name: 'Dr.rafiq',
            specialist: 'Teeth Cleaning',
            img: doctor3,
            experience:5

        },
    ];
    return (
        <div className='my-28'>
            <div className='text-center'>
                <h2 className='text-4xl'>Our Doctors</h2>
            </div>
            <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10'>
                {
                    Doctors.map(Doctor =><MyDoctor
                        key={Doctor._id}
                        Doctor={Doctor}
                    ></MyDoctor>)
                }
            </div>
        </div>
    );
};

export default Doctors;
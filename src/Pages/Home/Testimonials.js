import React from 'react';
import quote from '../../assets/icons/quote.svg';
import people1 from '../../assets/images/people1.png'
import people2 from '../../assets/images/people2.png'
import people3 from '../../assets/images/people3.png'
import Review from './Review';
const Testimonials = () => {
    
    const reviews = [
        {
            _id:1,
            name: 'Winson',
            message: 'Hanif Ulubby is a great doctor! He is very understanding and listens to your concerns. He takes time with the patient to help them with their health issues! I highly recommend him to anyone looking for a specialist',
            location: 'savar',
            specialty: 'Teeth Orthodontics',
            img: people1
        },
        {
            _id:2,
            name: 'Luna',
            message: 'Zebunnesa Begum is a great doctor! He is very understanding and listens to your concerns. He takes time with the patient to help them with their health issues! I highly recommend him to anyone looking for a specialist',
            location: 'Uttara',
            specialty: 'Teeth Cleaning',
            img: people2
        },
        {
            _id:3,
            name: 'Mila',
            message: 'Ashikur Rahman is a great doctor! He is very understanding and listens to your concerns. He takes time with the patient to help them with their health issues! I highly recommend him to anyone looking for a specialist',
            location: 'savar',
            specialty: 'Cosmetic Dentistry',
            img: people3
        },
    ];
    return (
        <section className='my-24'>
            <div className='flex justify-between'>
                <div>
                    <h4 className="text-xl text-primary font-bold">Testimonials</h4>
                    <h2 className='text-3xl'>What our Patients say</h2>
                </div>
                <div>
                    <img src={quote} className="w-24 lg:w-48" alt="" />
                </div>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
                {
                    reviews.map(review =><Review
                        key={review._id}
                        review={review}
                    ></Review>)
                }
            </div>
        </section>
    );
};

export default Testimonials;
import React from 'react';

const Service = ({ service, setTreatment }) => {
    const { name, slots, price } = service;
    return (
        <div style={{backgroundColor: "#c0c5d1"}} className="card lg:max-w-lg bg-base-100 shadow-md">
            <div className="card-body text-center">
                <h2 className="text-xl font-bold text-dark">{name}</h2>
                <p>{
                    slots.length > 0
                        ? <span>{slots[0]}</span>
                        : <span className='text-red-500'>Try another date.</span>
                }</p>
                <p>{slots.length} {slots.length > 1 ? 'spaces' : 'space'} available</p>
                <p><small>Price: ${price}</small></p>
                <div className="card-actions justify-center">
                    <label
                        htmlFor="booking-modal"
                        disabled={slots.length === 0}
                        onClick={() => setTreatment(service)}
                        className="btn btn-sm btn-dark text-white uppercase bg-gradient-to-r "
                    >Book Appointment</label>
                </div>
            </div>
        </div>
    );
};

export default Service;
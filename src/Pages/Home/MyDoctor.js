import React from 'react';

const MyDoctor = ({Doctor}) => {
    return (
        <div className="card lg:max-w-lg bg-base-100 shadow-xl">
            <figure className="px-10 pt-10">
                <img src={Doctor.img} alt="doctors" className="rounded-4xl h-64 w-48" />
            </figure>
            <div className="card-body items-center text-center">
                <h2 className="card-title">{Doctor.name}</h2>
                <p>{Doctor.specialist}</p>
                <p>{Doctor.experience} years experience</p>
            </div>
        </div>
    );
};

export default MyDoctor;
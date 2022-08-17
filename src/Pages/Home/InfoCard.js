import React from 'react';

const InfoCard = ({img, cardTitle}) => {
    return (
        <div style={{backgroundColor: "#c0c5d1"}} className={`card lg:card-side bg-base-100 shadow-md `}>
            <figure className='pl-5 pt-5'>
                <img src={img} alt="Album" />
            </figure>
            <div className="card-body text-dark">
                <h2 className="card-title">{cardTitle}</h2>
                <p>Click the button to listen on Spotiwhy app.</p>
            </div>
        </div>
    );
};

export default InfoCard;
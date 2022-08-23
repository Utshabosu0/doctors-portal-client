import React from 'react';

const DoctorReviewRow = ({ review, index }) => {
    const { name,location,comment, specialty, img,email } = review;

    return (
        <tr>
            <th>{index + 1}</th>
            <td><div class="avatar">
                <div class="w-8 rounded">
                    <img src={img} alt={name} />
                </div>
            </div></td>
            <td>{name}</td>
            <td>{location}</td>
            <td>{comment}</td>
            <td>{specialty}</td>
        </tr>
    );
};

export default DoctorReviewRow;
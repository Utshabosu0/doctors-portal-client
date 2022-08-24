import React from 'react';
import { toast } from 'react-toastify';

const ReviewRow = ({ review, index, refetch, setDeletingReview }) => {
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
            <td >{comment}</td>
            <td>{specialty}</td>
            <td>
                <label onClick={() => setDeletingReview(review)} for="delete-confirm-modal" class="btn btn-xs btn-error">Delete</label>
            </td>
        </tr>
    );
};

export default ReviewRow;
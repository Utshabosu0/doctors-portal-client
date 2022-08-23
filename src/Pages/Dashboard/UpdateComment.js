import React from 'react';
import { useParams } from 'react-router-dom';
import { useForm } from "react-hook-form";

const UpdateComment = () => {
    const { id } = useParams();
    const { register,formState: { errors },reset } = useForm();

    const handleBookingUpdate = async e => {
        const comment = e.target.comment.value;

        const updatedComment = { comment}
        const url = `http://localhost:5000/bookings/${id}`;
        fetch(url, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
                // authorization: `Bearer ${localStorage.getItem('accessToken')}`
    
            },
            body: JSON.stringify(updatedComment)
        })
            .then(res => res.json())
            .then(data => {
                    alert('Doctor Added Comment');
                    reset();
                
            })
        e.preventDefault();
    }

    return (
        <div>
                        
        <form onSubmit={handleBookingUpdate}>
        <div className="form-control w-full max-w-xs">

        <div className="form-control w-full max-w-xs">
                <label className="label">
                    <span className="label-text">Doctor Comment</span>
                </label>
                <textarea
                    type="text"
                    placeholder="Your Comment"
                    name='comment'
                    className="textarea textarea-bordered w-full max-w-xs"
                    {...register("comment", {
                        required: {
                            value: true,
                            message: 'Comment is Required'
                        }
                    })}
                />
                <label className="label">
                    {errors.comment?.type === 'required' && <span className="label-text-alt text-red-500">{errors.name.message}</span>}
                </label>
            </div>
      </div>
      <br />
      <input className='btn w-full max-w-xs text-white' type="submit"  />
    </form>

        </div>
    );
};

export default UpdateComment;
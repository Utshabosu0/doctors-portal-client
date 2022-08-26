import React from 'react';
import { useParams } from 'react-router-dom';
import { useForm } from "react-hook-form";

const UpdateBooking = () => {
    const { id } = useParams();
    const { register,formState: { errors },reset } = useForm();

    const handleBookingUpdate = async e => {
        const paid = e.target.paid.value;

        const updatedBooking = { paid}
        const url = `http://localhost:5000/booking/${id}`;
        fetch(url, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
                // authorization: `Bearer ${localStorage.getItem('accessToken')}`
    
            },
            body: JSON.stringify(updatedBooking)
        })
            .then(res => res.json())
            .then(data => {
                    alert('Payment Update');
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
                    <span className="label-text">Paid</span>
                </label>
                <input
        type="text"
        name='Paid'
        placeholder="Your Paid"
        className="input input-bordered w-full max-w-xs"
        {...register("paid", {
            required: {
                value: true,
                message: 'Paid is Required'
            }
        })}
    />
     <label className="label">
        {errors.Paid?.type === 'required' && <span className="label-text-alt text-red-500">{errors.name.message}</span>}
    </label>
      </div>
      </div>
      <br />
      <input className='btn w-full max-w-xs text-white' type="submit"  />
    </form>

        </div>
    );
};

export default UpdateBooking;
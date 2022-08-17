import React from 'react';
import { useParams } from 'react-router-dom';
// import Loading from '../Shared/Loading';
import { useForm } from "react-hook-form";

const Update = () => {
    const { register, formState: { errors }, reset } = useForm();
    // console.log(about)
    const { id } = useParams();


// const onUpdateSubmit = async e => {
//     const url = `http://localhost:5000/about/${id}`;
//     fetch(url, {
//         method: 'PUT',
//         headers: {
//             'content-type': 'application/json',
//             authorization: `Bearer ${localStorage.getItem('accessToken')}`

//         },
//         body: JSON.stringify(about)
//     })
//         .then(res => res.json())
//         .then(data => {
//             if (data.modifiedCount > 0) {
//                 alert('Update Successful');
//                 setAbout({});
//                 reset();
//             }
//         })
//     e.preventDefault();

//             }

      

const handleUpdateUser = async e => {
    const job = e.target.job.value;
    const age = e.target.age.value;
    const gender = e.target.gender.value;
    const location = e.target.location.value;
    const updatedUser = { job,age, gender,location}
    const url = `http://localhost:5000/about/${id}`;
    fetch(url, {
        method: 'PUT',
        headers: {
            'content-type': 'application/json',
            authorization: `Bearer ${localStorage.getItem('accessToken')}`

        },
        body: JSON.stringify(updatedUser)
    })
        .then(res => res.json())
        .then(data => {
                alert('Update Successful');
                reset();
            
        })
    e.preventDefault();
}



    return (
        <div>
            <p><small>{id}</small></p>
        <div>

            <form onSubmit={handleUpdateUser}>


<div className="form-control w-full max-w-xs">
    <label className="label">
        <span className="label-text">Job</span>
    </label>
    <input
        type="text"
        name='job'
        placeholder="Your Job"
        className="input input-bordered w-full max-w-xs"
        {...register("job", {
            required: {
                value: true,
                message: 'Job is Required'
            }
        })}
    />
    <label className="label">
        {errors.Job?.type === 'required' && <span className="label-text-alt text-red-500">{errors.name.message}</span>}
    </label>
</div>
<div className="form-control w-full max-w-xs">
    <label className="label">
        <span className="label-text">Age</span>
    </label>
    <input
        type="number"
        name='age'
        placeholder="Your Age"
        className="input input-bordered w-full max-w-xs"
        {...register("age", {
            required: {
                value: true,
                message: 'Age is Required'
            }
        })}
    />
    <label className="label">
        {errors.Age?.type === 'required' && <span className="label-text-alt text-red-500">{errors.name.message}</span>}
    </label>
</div>
<div className="form-control w-full max-w-xs">
    <label className="label">
        <span className="label-text">Gender</span>
    </label>
    <input
        type="text"
        placeholder="Your Gender"
        name='gender'
        className="input input-bordered w-full max-w-xs"
        {...register("gender", {
            required: {
                value: true,
                message: 'Gender is Required'
            }
        })}
    />
    <label className="label">
        {errors.Gender?.type === 'required' && <span className="label-text-alt text-red-500">{errors.name.message}</span>}
    </label>
</div>
<div className="form-control w-full max-w-xs">
    <label className="label">
        <span className="label-text">Location</span>
    </label>
    <input
        type="text"
        name='location'
        placeholder="Your Location"
        className="input input-bordered w-full max-w-xs"
        {...register("location", {
            required: {
                value: true,
                message: 'Location is Required'
            }
        })}
    />
    <label className="label">
        {errors.Location?.type === 'required' && <span className="label-text-alt text-red-500">{errors.name.message}</span>}
    </label>
</div>





{/* <div className="form-control w-full max-w-xs">
    <label className="label">
        <span className="label-text"> Your Photo</span>
    </label>
    <input
        type="file"
        className="input input-bordered w-full max-w-xs"
        {...register("image", {
            // required: {
            //     value: true,
            //     message: 'Image is Required'
            // }
        }
        )}
    />
    <label className="label">
        {errors.name?.type === 'required' && <span className="label-text-alt text-red-500">{errors.name.message}</span>}
    </label>
</div> */}
<br />

<input className='btn w-full max-w-xs text-white' type="submit" value="Add" />
</form>
        </div>
        </div>
    );
};

export default Update;
import React from 'react';
import { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useForm } from "react-hook-form";
import { useQuery } from 'react-query';
import { toast } from 'react-toastify';
import auth from '../../firebase.init';
import Loading from '../Shared/Loading';
import bg from '../../assets/images/bg.png';

const Information = () => {
    const [disable, setDisable]=useState(0)
    const [user] = useAuthState(auth);

const { register, formState: { errors }, handleSubmit, reset } = useForm();

const { data: services, isLoading } = useQuery('services', () => fetch('http://localhost:5000/service').then(res => res.json()))

// const imageStorageKey = '4295ac4d47b569312bea67b440cdbdbb';


const onSubmits = async data => {
    // const image = data.image[0];
    // const formData = new FormData();
    // formData.append('image', image);
    // const url = `https://api.imgbb.com/1/upload?key=${imageStorageKey}`;
    // fetch(url, {
    //     method: 'POST',
    //     body: formData
    // })
    //     .then(res => res.json())
    //     .then(result => {
    //         if (result.success) {
    //             const img = result.data.url;
                const about = {
                    // name:data.name,
                    job:data.job,
                    age:data.age,
                    gender:data.gender,
                    location:data.location,
                    email:user.email
                }
                // send to your database 
                fetch('http://localhost:5000/about', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json',
                          authorization: `Bearer ${localStorage.getItem('accessToken')}`
                    },
                    body: JSON.stringify(about)
                })
                    .then(res => res.json())
                    .then(inserted => {
                        if (inserted.insertedId) {
                            toast.success('Information successfully added')
                            reset();
                            setDisable(true);
                        }
                        else {
                            toast.error('Failed ');
                        }
                    })

            }

        


if (isLoading) {
    return <Loading></Loading>
}
    return (
        <div style={{
            background: `url(${bg})`,
            backgroundSize: 'cover'
        }} className="">
            <h1 className='text-4xl' > Your Information</h1>
            <form className='border' onSubmit={handleSubmit(onSubmits)}>

{/* <div className="form-control w-full max-w-xs">
    <label className="label">
        <span className="label-text"> Your Name</span>
    </label>
    <input
        type="text"
        placeholder="Your Name"
                disabled value={user?.displayName || ''}

        className="input input-bordered w-full max-w-xs"
        {...register("name", {
            required: {
                value: true,
                message: 'Name is Required'
            }
        })}
    />
    <label className="label">
        {errors.name?.type === 'required' && <span className="label-text-alt text-red-500">{errors.name.message}</span>}
    </label>
</div> */}
<div className="form-control w-full max-w-xs">
    <label className="label">
        <span className="label-text">Profession</span>
    </label>
    <input
        type="text"
        placeholder="Your Profession"
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
<div className="form-control w-full max-w-xs">
                <label className="label">
                    <span className="label-text">Email</span>
                </label>
                <input
                    type="email"
                    disabled value={user?.email || ''}
                    placeholder="Your Email"
                    className="input input-bordered w-full max-w-xs"
                    {...register("email", {
                        // required: {
                        //     value: true,
                        //     message: 'Email is Required'
                        // },
                        pattern: {
                            value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                            message: 'Provide a valid Email'
                        }
                    })}
                />
                <label className="label">
                    {errors.email?.type === 'required' && <span className="label-text-alt text-red-500">{errors.email.message}</span>}
                    {errors.email?.type === 'pattern' && <span className="label-text-alt text-red-500">{errors.email.message}</span>}
                </label>
            </div>

{/* <div className="form-control w-full max-w-xs">
    <label className="label">
        <span className="label-text">Email</span>
    </label>
    <input
        type="email"
        disabled value={user?.email || ''}
        placeholder="Your Email"
        className="input input-bordered w-full max-w-xs"
        {...register("email", {
            // required: {
            //     value: true,
            //     message: 'Email is Required'
            // },
            pattern: {
                value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                message: 'Provide a valid Email'
            }
        })}
    />
    <label className="label">
        {errors.email?.type === 'required' && <span className="label-text-alt text-red-500">{errors.email.message}</span>}
        {errors.email?.type === 'pattern' && <span className="label-text-alt text-red-500">{errors.email.message}</span>}
    </label>
</div> */}



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

<input className='btn w-full max-w-xs text-white' disabled={disable} type="submit"  />
</form>
        </div>
    );
};

export default Information;
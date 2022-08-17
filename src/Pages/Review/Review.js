import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useForm } from "react-hook-form";
import { useQuery } from 'react-query';
import { toast } from 'react-toastify';
import auth from '../../firebase.init';
import Loading from '../Shared/Loading';

const Review = () => {

  // const [reviews, setReviews] = useState([]);
  // const nameRef = useRef();
  // const addressRef = useRef();
  // const reviewRef = useRef();
  

  // const handleReview = e => {
  //   const name = nameRef.current.value;
  //   const address = addressRef.current.value;
  //   const review = reviewRef.current.value;
  //   const newReview = { name: name, address: address,review:review }

  //   // send data to the server
  //   fetch('http://localhost:5000/users', {
  //     method: 'post',
  //     headers: {
  //       'content-type': 'application/json'
  //     },
  //     body: JSON.stringify(newReview)
  //   })
  //     .then(res => res.json())
  //     .then(data => {
  //       const addedUser = data;
  //       const newUsers = [...newReview, addedUser];
  //       setReviews(newUsers);
  //       // reset name and email
  //       nameRef.current.value = '';
  //       addressRef.current.value = '';
  //       reviewRef.current.value = '';
  //     })

  //   e.preventDefault();
  // }

//   const { register,errors,  handleSubmit, reset } = useForm();


//     return (
//         < >
//         <div >
//         <h1 className='text-4xl'>What You Say</h1>
//       </div>
//       <div className=' my-5  py-10'>
  
//       <form className=' justify-items-center m-15' onSubmit={handleSubmit()}>
//         <label htmlFor="">Name</label><br />
//         <input type="text" placeholder="Your name" className='form-control input w-1/2 max-w-md border-2 border-orange-600 mb-2'  {...register("name", {
//                             required: {
//                                 value: true,
//                                 message: 'Name is Required'
//                             }
//                         })}  />
//                         <label className="label">
//                         {errors.name?.type === 'required' && <span className="label-text-alt text-red-500">{errors.name.message}</span>}
//                     </label> <br />
//         <label htmlFor="">Address</label><br />
//         <input type="address" placeholder="Your Address" className=' form-control input w-1/2 max-w-md border-2 border-orange-600 mb-2'   {...register("address", {
//                             required: {
//                                 value: true,
//                                 message: 'Name is Required'
//                             }
//                         })} /> 
//                         <label className="label">
//                         {errors.name?.type === 'required' && <span className="label-text-alt text-red-500">{errors.name.message}</span>}
//                     </label><br />
//         <label htmlFor="">Review</label><br />

//         <textarea type="review" placeholder="Your Review" className='form-control  textarea w-full max-w-md border-2 border-orange-600 mb-2' rows={4}  {...register("review", {
//                             required: {
//                                 value: true,
//                                 message: 'Name is Required'
//                             }
//                         })} />
//                         <label className="label">
//                         {errors.name?.type === 'required' && <span className="label-text-alt text-red-500">{errors.name.message}</span>}
//                     </label> <br />
//         <input type="submit" className="btn btn-active btn-secondary w-2/6 m-6" value="Submit" />
//       </form>
//         {/* <input
//           type='text'
//           placeholder='Your name'
//           className='input w-1/2 max-w-md border-2 border-orange-600'
//         />
//         <input
//           type='text'
//           placeholder='Address'
//           className='input w-full max-w-md border-2 border-orange-600'
//         />
//         <textarea
//         type='text'
//           className='textarea w-full max-w-md border-2 border-orange-600'
//           placeholder='Your Review'
//           rows={6}
//         ></textarea> */}

// {/* <button class="btn btn-active btn-secondary w-2/5">Submit</button> */}
//       </div>
//       </>
//     );
// };

const [user] = useAuthState(auth);

const { register, formState: { errors }, handleSubmit, reset } = useForm();

const { data: services, isLoading } = useQuery('services', () => fetch('http://localhost:5000/service').then(res => res.json()))

const imageStorageKey = '4295ac4d47b569312bea67b440cdbdbb';

/**
 * 3 ways to store images
 * 1. Third party storage //Free open public storage is ok for Practice project 
 * 2. Your own storage in your own server (file system)
 * 3. Database: Mongodb 
 * 
 * YUP: to validate file: Search: Yup file validation for react hook form
*/
const onSubmits = async data => {
    const image = data.image[0];
    const formData = new FormData();
    formData.append('image', image);
    const url = `https://api.imgbb.com/1/upload?key=${imageStorageKey}`;
    fetch(url, {
        method: 'POST',
        body: formData
    })
        .then(res => res.json())
        .then(result => {
            if (result.success) {
                const img = result.data.url;
                const review = {
                    name:data.name,
                    comment:data.comment,
                    email:user.email,
                    specialty:data.specialty,
                    img: img
                }
                // send to your database 
                fetch('http://localhost:5000/review', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json',
                        // authorization: `Bearer ${localStorage.getItem('accessToken')}`
                    },
                    body: JSON.stringify(review)
                })
                    .then(res => res.json())
                    .then(inserted => {
                        if (inserted.insertedId) {
                            toast.success('successfully')
                            reset();
                        }
                        else {
                            toast.error('Failed ');
                        }
                    })

            }

        })
}

if (isLoading) {
    return <Loading></Loading>
}

return (
    <div className='pb-5'>
        <h2 className="text-2xl">What You Say</h2>
        <form onSubmit={handleSubmit(onSubmits)}>

            <div className="form-control w-full max-w-xs">
                <label className="label">
                    <span className="label-text">Name</span>
                </label>
                <input
                    type="text"
                    placeholder="Your Name"
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
            </div>
            {/* <div className="form-control w-full max-w-xs">
                <label className="label">
                    <span className="label-text">Address</span>
                </label>
                <input
                    type="text"
                    placeholder="Your Address"
                    className="input input-bordered w-full max-w-xs"
                    {...register("address", {
                        required: {
                            value: true,
                            message: 'Address is Required'
                        }
                    })}
                />
                <label className="label">
                    {errors.address?.type === 'required' && <span className="label-text-alt text-red-500">{errors.name.message}</span>}
                </label>
            </div> */}
            <div className="form-control w-full max-w-xs">
                <label className="label">
                    <span className="label-text">Review</span>
                </label>
                <textarea
                    type="text"
                    placeholder="Your Review"
                    className="textarea textarea-bordered w-full max-w-xs"
                    {...register("comment", {
                        required: {
                            value: true,
                            message: 'Comment is Required'
                        }
                    })}
                />
                <label className="label">
                    {errors.review?.type === 'required' && <span className="label-text-alt text-red-500">{errors.name.message}</span>}
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

            <div className="form-control w-full max-w-xs">
                <label className="label">
                    <span className="label-text">Specialty</span>
                </label>
                <select {...register('specialty')} class="select input-bordered w-full max-w-xs">
                    {
                        services.map(service => <option
                            key={service._id}
                            value={service.name}
                        >{service.name}</option>)
                    }
                </select>
            </div>

            <div className="form-control w-full max-w-xs">
                <label className="label">
                    <span className="label-text"> Your Photo</span>
                </label>
                <input
                    type="file"
                    className="input input-bordered w-full max-w-xs pt-2"
                    {...register("image", {
                        required: {
                            value: true,
                            message: 'Image is Required'
                        }
                    })}
                />
                <label className="label">
                    {errors.name?.type === 'required' && <span className="label-text-alt text-red-500">{errors.name.message}</span>}
                </label>
            </div>
            <br />

            <input className='btn w-full max-w-xs text-white' type="submit" value="Add" />
        </form>
    </div>
);
};

export default Review;
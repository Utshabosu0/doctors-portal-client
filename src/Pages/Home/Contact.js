import React from "react";
import appointment from '../../assets/images/appointment.png';
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';

const Contact = () => {
  const {register, handleSubmit, reset } = useForm();

  const onSubmit = async data => {
    const contract = {
      email: data.email,
      subject: data.subject,
      message: data.message
  }
  // send to your database 
  fetch('http://localhost:5000/contract', {
      method: 'POST',
      headers: {
          'content-type': 'application/json',
          // authorization: `Bearer ${localStorage.getItem('accessToken')}`
      },
      body: JSON.stringify(contract)
  })
  .then(res =>res.json())
  .then(inserted =>{
      if(inserted.insertedId){
          toast.success('Send email')
          reset();
      }
      else{
          toast.error('Failed Send email');
      }
  })
  }
  return (
    <div style={{
        background:`url(${appointment})`
    }} className='bg-primary px-10 py-14 '>
      <div className='text-center pb-14 text-white'>
        <p className='text-xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-accent to-secondary'>
          Contact Us
        </p>
        <h1 className='text-4xl'>Stay connected with us</h1>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
      <div className='grid grid-cols-1 justify-items-center gap-5'>
        <input
          type='email'
          placeholder='Your Email Address'
          className='input w-full max-w-md'
          {...register("email", {
            required: {
                value: true,
                message: 'Email is Required'
            }
        })}
        />
        <input
          type='text'
          placeholder='Subject'
          className='input w-full max-w-md'
          {...register("subject", {
            required: {
                value: true,
                message: 'Subject is Required'
            }
        })}
        />
        <textarea
          className='textarea w-full max-w-md'
          placeholder='Your message'
          rows={6}
          {...register("message", {
            required: {
                value: true,
                message: 'Message is Required'
            }
        })}
        ></textarea>
                <input className='btn w-full max-w-xs text-white' type="submit" value="Submit" />
      </div>
      </form>
    </div>
  );
};

export default Contact;
import React from "react";
import appointment from '../../assets/images/appointment.png';
import PrimaryButton from "../Shared/PrimaryButton";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot,faPhone,faEnvelope } from '@fortawesome/free-solid-svg-icons';


const Contact = () => {
  return (
    <>
      <div  className='bg-stone-400 px-10 py-14 '>
      <div className='text-center pb-14'>
        <p className='text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-accent to-secondary'>
        Contact Us
        </p>
        </div>
        <div className="grid grid-cols-3 gap-5 ">
        <div class="mt-8 text-center text-zinc-50">
            <p className="">
            <span className='text-4xl text-black '> <FontAwesomeIcon icon={faLocationDot} /></span><br />
              <span className='text-2xl text-black '>Uttara,Dhaka</span>
            </p>
          </div>
          <div class="mt-8 text-center text-zinc-50">
            <p class="">
              <span className='text-4xl text-black '> <FontAwesomeIcon icon={faPhone} /></span><br />
              <a href="/#" className='text-2xl text-black '>01648393509</a>
            </p>
          </div>
          <div class="mt-8 text-center text-zinc-50">
            <p class="">
            <span className='text-4xl text-black '> <FontAwesomeIcon icon={faEnvelope} /></span><br />
              <a href="/#" className='text-2xl text-black '>youremail@gmail.com</a>
            </p>
          </div>

        </div>
        </div>
   
     <br /><br />   
    {/* <div style={{
        background:`url(${appointment})`
    }} className='bg-primary px-10 py-14 '>
      <div className='text-center pb-14 text-white'>
        <p className='text-xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-accent to-secondary'>
        Contact Form
        </p>
        <h1 className='text-4xl'>Stay connected with us</h1>
      </div>
      <div className='grid grid-cols-1 justify-items-center gap-5'>
        <input
          type='text'
          placeholder='Email Address'
          className='input w-full max-w-md'
        />
        <input
          type='text'
          placeholder='Subject'
          className='input w-full max-w-md'
        />
        <textarea
          className='textarea w-full max-w-md'
          placeholder='Your message'
          rows={6}
        ></textarea>
        <PrimaryButton>Submit</PrimaryButton>
      </div>
    </div> */}
    </>
  );
};

export default Contact;
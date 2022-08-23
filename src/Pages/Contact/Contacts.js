import { faEnvelope, faLocationDot, faPhone } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import Contact from '../Home/Contact';
import Footer from '../Shared/Footer';

const Contacts = () => {
  return (
    <>
    <div  className='bg-slate-100 px-10 py-14 '>
    <div className='text-center pb-14'>
      <p className='text-4xl font-bold  '>
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
            <a href="/#" className='text-2xl text-black '>utsha.bosu.cse@gmail.com</a>
          </p>
        </div>

      </div>
      </div>
      <br />
      {/* <Contact></Contact> */}
      <div>
        <Footer></Footer>
      </div>
  </>
  );
};

export default Contacts;
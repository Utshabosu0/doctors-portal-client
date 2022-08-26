import { signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link, useNavigate } from 'react-router-dom';
import auth from '../../firebase.init';
import Footer from '../Shared/Footer';

const About = () => {
    const [abouts, setAbouts] = useState([]);
    const [user] = useAuthState(auth);
    const navigate = useNavigate()

    useEffect(() => {
        if (user) {
            fetch(`http://localhost:5000/about?email=${user.email}`, {
                method: 'GET',
                headers: {
                    'authorization': `Bearer ${localStorage.getItem('accessToken')}`
                }
            })
                .then(res => {
                    console.log('res', res);
                    if (res.status === 401 || res.status === 403) {
                        signOut(auth);
                        localStorage.removeItem('accessToken');
                        navigate('/');
                    }
                    return res.json()
                })
                .then(data => {

                    setAbouts(data[0]);
                });
        }
    }, [user])
    return (

<>

<div class="card w-98 bg-neutral text-neutral-content">
  <div class="card-body">
  <div className="text-2xl border-solid border-1"> Name : {user.displayName}</div>
                                <div className="text-2xl border-solid border-1">Email: {user.email}</div>
                                <div className="text-2xl border-solid border-1"> profession: {abouts.job}</div>
                                <div className="text-2xl border-solid border-1">Age: {abouts.age}</div>
                                <div className="text-2xl border-solid border-1">Gender: {abouts.gender}</div>
                                <div className="text-2xl border-solid border-1">Address: {abouts.location}</div>
                                <div class="card-actions justify-end">
                                    <Link to={`/about/update/${abouts._id}`}><button className='btn btn-success'>Profile Update</button></Link>
                                    
                                </div>
  </div>
</div>


<Footer></Footer>
       
</>            
    );
};

export default About;
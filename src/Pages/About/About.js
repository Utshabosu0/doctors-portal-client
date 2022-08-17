import { signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link, useNavigate } from 'react-router-dom';
import auth from '../../firebase.init';

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

                    setAbouts(data);
                });
        }
    }, [user])
    return (
        <div>
            <h2 className="text-2xl">Name : {user.displayName} <br />   Email: {user.email}   </h2>
            <div class="flex justify-end ">
            <Link to="/add"><button className='btn btn-xs btn-primary'>Your Information</button></Link>             
            </div>
            <div class="overflow-x-auto">
                <table class="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Job</th>
                            <th>Age</th>
                            <th>Gender</th>
                            <th>Location</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>

                    {/* <ul>
                    {
                    abouts.map(about => <li
                        key={about._id}>
                       name: {about.name} <br />
                       Job: {about.job}
                        <Link to={`/about/update/${about._id}`}><button className='btn btn-xs btn-success'>Update</button></Link>                    </li>)

                }
                    </ul> */}
                    {
                            abouts.map((a,index) => <tr key={a._id}>
                                <th>{index+1}</th>
                                <td>{a.job}</td>
                                <td>{a.age}</td>
                                <td>{a.gender}</td>
                                <td>{a.location}</td>
                                <td>
                                    <Link to={`/about/update/${a._id}`}><button className='btn btn-xs btn-success'>Update</button></Link>
                                    
                                </td>
                            </tr>)
                        }
                     </tbody>
                </table>
                </div>
                </div>
            
    );
};

export default About;
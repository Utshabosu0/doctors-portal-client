import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link, Outlet } from 'react-router-dom';
import auth from '../../firebase.init';
import useAdmin from '../../hooks/useAdmin';
import useDoctor from '../../hooks/useDoctor';

const Dashboard = () => {
    const [user] = useAuthState(auth);
    const [admin] = useAdmin(user);
    const [doctor] = useDoctor(user);

    return (
        <div class="drawer drawer-mobile">
            <input id="dashboard-sidebar" type="checkbox" class="drawer-toggle" />
            <div class="drawer-content">
                <h2 className='text-2xl font-bold text-purple-500'>Welcome to your Dashboard</h2>
                <Outlet></Outlet>
            </div>
            <div class="drawer-side">
                <label for="dashboard-sidebar" class="drawer-overlay"></label>
                <ul class="menu p-4 overflow-y-auto w-48 bg-base-100 text-base-content">
                    {/* <!-- Sidebar content here --> */}

                    {doctor ?
                    
                    <>
                        <li><Link to="/dashboard/doctorAppointment">Patient Appointments</Link></li>

                    <li><Link to="/dashboard/doctorService">My Service</Link></li>
                    <li><Link to="/dashboard/doctorAddSchedule">Make Appointment Schedules</Link></li>
                    <li><Link to="/dashboard/patientHistory">Patient History</Link></li>
                    {/* <li><Link to="/dashboard/doctorReview">Patient Reviews</Link></li> */}
                    </>
                    
                    
                    
                    :
                    <>
                    <li><Link to="/dashboard/appointment">My Appointments</Link></li>
                    <li><Link to="/dashboard/review">My Reviews</Link></li>
                    <li><Link to="/dashboard/payment">My Payment</Link></li>
                    <li><Link to="/dashboard/history">My History</Link></li>
                        </>
                        
                    
                }
                    {/* <li><Link to="/dashboard/appointment">My Appointments</Link></li>
                    <li><Link to="/dashboard/review">My Reviews</Link></li>
                    <li><Link to="/dashboard/payment">My Payment</Link></li>
                    <li><Link to="/dashboard/history">My History</Link></li> */}
                    { admin && <>
                        <li><Link to="/dashboard/addSchedule">Make Appointment Schedules</Link></li>
                        <li><Link to="/dashboard/serviceList">service</Link></li>
                        <li><Link to="/dashboard/adminAppointment">Appointment Lists</Link></li>
                        <li><Link to="/dashboard/manageReview">Reviews</Link></li>
                        <li><Link to="/dashboard/users">All Users</Link></li>
                        <li><Link to="/dashboard/addDoctor">Add a Doctor</Link></li>
                        <li><Link to="/dashboard/manageDoctor">Manage Doctors</Link></li>
                        
                    </>}
                </ul>

            </div>
        </div>
    );
};

export default Dashboard;
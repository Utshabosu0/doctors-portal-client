import React from 'react';
import { toast } from 'react-toastify';

const UserRow = ({ user,index, refetch ,setDeletingUser }) => {
    const { email, role } = user;
    const makeAdmin = () => {
        fetch(`http://localhost:5000/user/admin/${email}`, {
            method: 'PUT',
            headers: {
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => {
                if(res.status === 403){
                    toast.error('Failed to Make an admin');
                }
                return res.json()})
            .then(data => {
                if (data.modifiedCount > 0) {
                    refetch();
                    toast.success(`Successfully made an admin`);
                }

            })
    }
    const makeDoctor = () => {
        fetch(`http://localhost:5000/users/admin/${email}`, {
            method: 'PUT',
            headers: {
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => {
                if(res.status === 403){
                    toast.error('Failed to Make an Doctor');
                }
                return res.json()})
            .then(data => {
                if (data.modifiedCount > 0) {
                    refetch();
                    toast.success(`Successfully made an Doctor`);
                }

            })
    }
    return (
        <tr>
            <th>{index + 1}</th>
            <td>{email}</td>
            <td>{role?role:'user'}</td>
            <td>{(role !== 'admin' && role !== 'doctor')? <div> <button onClick={makeAdmin} class="btn btn-xs">Make Admin</button> <button onClick={makeDoctor} class="btn btn-xs">Make Doctor</button></div> : ''}</td>
            <td>{(role !== 'admin')? <label onClick={() => setDeletingUser(user)} for="delete-confirm-modal" class="btn btn-xs btn-error">Remove User</label> : ''}</td>
           
            
        </tr>
    );
};

export default UserRow;
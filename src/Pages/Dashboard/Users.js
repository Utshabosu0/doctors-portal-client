import React, { useState } from 'react';
import { useQuery } from 'react-query';
import Loading from '../Shared/Loading';
import DeleteUserModal from './DeleteUserModal';
import UserRow from './UserRow';

const Users = () => {
    const [deletingUser, setDeletingUser] = useState(null);

    const { data: users, isLoading, refetch } = useQuery('users', () => fetch('http://localhost:5000/user', {
        method: 'GET',
        headers:{
            authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
    }).then(res => res.json()));
    if (isLoading) {
        return <Loading></Loading>
    }
    return (
        <div>
            <h2 className="text-2xl">All Users: {users.length}</h2>
            <div class="overflow-x-auto">
                <table class="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Job</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                       {
                           users.map((user,index)=><UserRow
                           key={user._id}
                           user={user}
                           index={index}
                           refetch={refetch}
                           setDeletingUser={setDeletingUser}
                           ></UserRow>)
                       }
                    </tbody>
                </table>
            </div>
            {
               deletingUser&&<DeleteUserModal
               deletingUser={deletingUser}
               refetch={refetch}
                           setDeletingUser={setDeletingUser}
               >

               </DeleteUserModal> 
            }
        </div>
    );
};

export default Users;
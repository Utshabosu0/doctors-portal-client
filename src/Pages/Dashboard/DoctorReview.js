import React from 'react';
import { useQuery } from 'react-query';
import Loading from '../Shared/Loading';
import DoctorReviewRow from './DoctorReviewRow';

const DoctorReview = () => {
    const { data: reviews, isLoading, refetch } = useQuery('reviews', () => fetch('http://localhost:5000/review', {
        // headers: {
        //     authorization: `Bearer ${localStorage.getItem('accessToken')}`
        // }
    }).then(res => res.json()));

    if (isLoading) {
        return <Loading></Loading>
    }
    return (
        <div>
            <h2 className="text-2xl">Manage : {reviews.length}</h2>
            <div class="overflow-x-auto">
                <table class="table w-full ">
                    <thead>
                        <tr className="hover">
                            <th></th>
                            <th>Avatar</th>
                            <th>Name</th>
                            <th>Address</th>
                            <th>Review</th>
                            <th>Specialty</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            reviews.map((review, index) => <DoctorReviewRow
                                key={review._key}
                                review={review}
                                index={index}
                                refetch={refetch}
                            ></DoctorReviewRow>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default DoctorReview;
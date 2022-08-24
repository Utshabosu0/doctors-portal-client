import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useQuery } from 'react-query';
import auth from '../../firebase.init';
import Loading from '../Shared/Loading';
import DeleteReviewModal from './DeleteReviewModal';
import ReviewRow from './ReviewRow';

const MyReview = () => {
    const [user] = useAuthState(auth);

    const [deletingReview, setDeletingReview] = useState(null);
    // const [reviews, setReviews] = useState([]);
    // console.log(reviews)
    const { data: reviews, isLoading, refetch } = useQuery('reviews', () => fetch(`http://localhost:5000/reviews?email=${user.email}`, {
        headers: {
            authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
    }).then(res => res.json()));

    if (isLoading) {
        return <Loading></Loading>
    }

    // useEffect(() => {
    //     fetch(`http://localhost:5000/review`)
    //         .then(res => res.json())
    //         .then(data => setReviews(data));

    // }, [])

    return (
        <div>
            <h2 className="text-2xl">My Review : {reviews.length}</h2>
            <div >
                <table class="table-auto border-separate ">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Avatar</th>
                            <th>Name</th>
                            <th>Location</th>
                            <th>Review</th>
                            <th>Specialty</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody >
                        {
                            reviews.map((review, index) => <ReviewRow
                                key={review._key}
                                review={review}
                                index={index}
                                refetch={refetch}
                                setDeletingReview={setDeletingReview}
                            ></ReviewRow>)
                        }
                    </tbody>
                </table>
            </div>
            {deletingReview && <DeleteReviewModal
                deletingReview={deletingReview}
                refetch={refetch}
                setDeletingReview={setDeletingReview}
            ></DeleteReviewModal>}
        </div>
    );
};

export default MyReview;

import React, {  useState } from 'react';
import { useQuery } from 'react-query';
import Loading from '../Shared/Loading';
import DeleteReviewModal from './DeleteReviewModal';
import ReviewRow from './ReviewRow';

const ManageReviews = () => {
    const [deletingReview, setDeletingReview] = useState(null);
    // const [reviews, setReviews] = useState([]);
    // console.log(reviews)
    const { data: reviews, isLoading, refetch } = useQuery('reviews', () => fetch('http://localhost:5000/review', {
        // headers: {
        //     authorization: `Bearer ${localStorage.getItem('accessToken')}`
        // }
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
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
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

export default ManageReviews;
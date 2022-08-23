import React from 'react';
import { format } from 'date-fns';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import { toast } from 'react-toastify';
import { useQuery } from 'react-query';
import Loading from '../Shared/Loading';

const BookingModal = ({ date, treatment, setTreatment, refetch }) => {
    const { data: doctors, isLoading } = useQuery('services', () => fetch('http://localhost:5000/doctors').then(res => res.json()))

    const { _id, name, slots, price } = treatment;
    const [user] = useAuthState(auth);
    const formattedDate = format(date, 'PP');
    const handleBooking = event => {
        event.preventDefault();
        const slot = event.target.slot.value;
        const doctorName = event.target.doctorName.value;

        const booking = {
            treatmentId: _id,
            treatment: name,
            date: formattedDate,
            slot,
            doctorName,
            price,
            patient: user.email,
            patientName: user.displayName,
            phone: event.target.phone.value
        }

        fetch('http://localhost:5000/booking', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(booking)
        })
            .then(res => res.json())
            .then(data => {
                if(data.success){
                    toast(`Appointment is sending email, ${formattedDate} at ${slot}`)
                }
                else{
                    toast.error(`Already have and appointment on ${data.booking?.date} at ${data.booking?.slot}`)
                }
                setTreatment(null);
                refetch();
            });
    }

    if (isLoading) {
        return <Loading></Loading>
    }
    return (
        <div>
            <input type="checkbox" id="booking-modal" className="modal-toggle" />
            <div className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <label htmlFor="booking-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="font-bold text-xl text-blue-700">Booking for: {name}</h3>
                    <form onSubmit={handleBooking} className='grid grid-cols-1 gap-3 justify-items-center mt-2'>
                    <select name="doctorName" className="select select-bordered w-full max-w-xs">
                    {
                            doctors.map(doctor => <option
                                key={doctor._id}
                                value={doctor.name}
                            >{doctor.name}</option>)
                        }
                        </select>
                        <input type="text" disabled value={format(date, 'PP')} className="input input-bordered w-full max-w-xs" />
                        <select name="slot" className="select select-bordered w-full max-w-xs">
                            {
                                slots.map((slot, index) => <option
                                    key={index}
                                    value={slot}
                                >{slot}</option>)
                            }
                        </select>
                        <input type="text" name="name" disabled value={user?.displayName || ''} className="input input-bordered w-full max-w-xs" />
                        <input type="email" name="email" disabled value={user?.email || ''} className="input input-bordered w-full max-w-xs" />
                        <input type="text" name="phone" placeholder="Phone Number" className="input input-bordered w-full max-w-xs" />
                        <input type="submit" value="Submit" className="btn btn-secondary w-full max-w-xs" />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default BookingModal;
import React from 'react';
import { toast } from 'react-toastify';
import { useForm } from "react-hook-form";
import { useQuery } from 'react-query';
import Loading from '../Shared/Loading';

const PaymentModal = () => {
    const { register, formState: { errors }, handleSubmit, reset } = useForm();
    const { data: services, isLoading } = useQuery('services', () => fetch('http://localhost:5000/service').then(res => res.json()))

    

    const onSubmit=async data=>{
        const pay = {
            patientPay:data.patientPay,
            patientPhone: data.patientPhone,
            appointmentId: data.appointmentId,
            patientName: data.patientName,
            patientEmail: data.patientEmail,
                    patientTreatment: data.patientTreatment,
        }
            fetch('http://localhost:5000/payments', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    // 'authorization': `Bearer ${localStorage.getItem('accessToken')}`
                },
                body: JSON.stringify(pay)
            })
                .then(res => res.json())
                .then(inserted =>{
                    if(inserted.insertedId){
                        toast.success('successfully Payment')
                        reset();
                    }
                    else{
                        toast.error('Failed Payment');
                    }
                })
    }
    if (isLoading) {
        return <Loading></Loading>
    }
    return (
        <div className='flex h-screen justify-center items-center mt-20'>
            <div className="card w-96 bg-base-100 shadow-xl">
                <div className="card-body">
                    <h2 className="text-center text-2xl font-bold">Payment Page</h2>
                    <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Patient AppointmentID</span>
                            </label>

                            <input
                                type="text"
                                placeholder="Patient AppointmentId"
                                className="input input-bordered w-full max-w-xs"
                                {...register("appointmentId", {
                                    required: {
                                        value: true,
                                        message: 'appointmentId is Required'
                                    }
                                })}
                            />
                            <label className="label">
                                {errors.appointmentId?.type === 'required' && <span className="label-text-alt text-red-500">{errors.name.message}</span>}
                            </label>
                        </div>
                    <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Patient Name</span>
                            </label>

                            <input
                                type="text"
                                placeholder="Patient Name"
                                className="input input-bordered w-full max-w-xs"
                                {...register("patientName", {
                                    required: {
                                        value: true,
                                        message: 'patientName is Required'
                                    }
                                })}
                            />
                            <label className="label">
                                {errors.patientName?.type === 'required' && <span className="label-text-alt text-red-500">{errors.name.message}</span>}
                            </label>
                        </div>

                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Patient Email</span>
                            </label>
                            <input
                                type="email"
                                placeholder="Patient Email"
                                className="input input-bordered w-full max-w-xs"
                                {...register("patientEmail", {
                                    required: {
                                        value: true,
                                        message: 'patientEmail is Required'
                                    },
                                    pattern: {
                                        value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                                        message: 'Provide a valid Email'
                                    }
                                })}
                            />
                            <label className="label">
                                {errors.patientEmail?.type === 'required' && <span className="label-text-alt text-red-500">{errors.email.message}</span>}
                                {errors.patientEmail?.type === 'pattern' && <span className="label-text-alt text-red-500">{errors.email.message}</span>}
                            </label>
                        </div>
                        <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Patient Treatment</span>
                    </label>
                    <select {...register('patientTreatment')} class="select input-bordered w-full max-w-xs">
                        {
                            services.map(service => <option
                                key={service._id}
                                value={service.name}
                            >{service.name}</option>)
                        }
                    </select>
                </div>
                
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Amount</span>
                            </label>
                            <input
                                type="number"
                                placeholder="Amount"
                                className="input input-bordered w-full max-w-xs"
                                {...register("patientPay", {
                                    required: {
                                        value: true,
                                        message: 'patientPay is Required'
                                    }
                                })}
                            />
                            <label className="label">
                                {errors.patientPay?.type === 'required' && <span className="label-text-alt text-red-500">{errors.name.message}</span>}
                            </label>
                        </div>
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Phone No</span>
                            </label>
                            <input
                                type="number"
                                placeholder="Your Phone"
                                className="input input-bordered w-full max-w-xs"
                                {...register("patientPhone", {
                                    required: {
                                        value: true,
                                        message: 'patientPhone is Required'
                                    }
                                })}
                            />
                            <label className="label">
                                {errors.patientPhone?.type === 'required' && <span className="label-text-alt text-red-500">{errors.name.message}</span>}
                            </label>
                        </div>
                        <input className='btn w-full max-w-xs text-white' type="submit" value="Pay" />
                    </form>
                   
                </div>
            </div>
        </div >
    );
};

export default PaymentModal;
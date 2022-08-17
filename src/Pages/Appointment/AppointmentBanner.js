import React from 'react';
import chair from '../../assets/images/chair.png';
import bg from '../../assets/images/bg.png';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';

const AppointmentBanner = ({date, setDate}) => {
    
    return (
        <div style={{
            background: `url(${bg})`,
            backgroundSize: 'cover'
        }} className="hero min-h-screen">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <img src={chair} className=" rounded-lg" alt='Dentist Chair' width='500px' height='400px' />
                <div>
                    <DayPicker
                        mode="single"
                        required
                        selected={date}
                        onSelect={setDate}
                    />
                </div>
            </div>

        </div>
    );
};

export default AppointmentBanner;
import React ,{useState, useRef}from 'react';
import { useForm } from 'react-hook-form';
import { Navigate } from 'react-router-dom';
import Swal from 'sweetalert2';
// import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquareMinus } from '@fortawesome/free-solid-svg-icons'
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init'


const AddSchedule = () => {


  const weekDays = [
      {label:'All Days', value:'All Days'},
      {label:'Saturday', value:'Sat'},
      {label :'Sunday', value:'Sun'},
      {label :'Monday', value:'Mon'},
      {label :'TuesDay', value:'Tue'},
      {label :'Wednesday', value:'Wed'},
      {label :'Thursday', value:'Thu'},
      {label :'Friday', value:'Fri'},
  ]

  const { register, handleSubmit, reset } = useForm();
const onSubmit = async (data) => {
  
    // user.displayName=doctorName,

    // user.email=doctorEmail,
    //               data.serviceName=serviceName,
    // data.pay=pay,
    
  data.slots = slot;
  data.days = day;
  console.log(data)
  console.log(data)
  Swal.fire({
    icon: 'warning',
    title: 'Are you sure to add this package?',
    showCancelButton: true,
    confirmButtonText: 'Yes',
  }).then((result) => {
    if (result.isConfirmed) {
      fetch('http://localhost:5000/service', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then((data) => {
          // console.log(data,'inserted')
          if (data.insertedId) {
            reset();
            Swal.fire('Confirmed!', '', 'success');
          //   Navigate.replace('/service');
          }
        })
        .catch((err) => {
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Something went wrong!',
            html: 'Please, try again',
            showConfirmButton: false,
            timer: 1500,
          });
        });
    }
  });
  reset();
};

const startRef = useRef('')
const endRef = useRef('')

const [startTime, setStartTime] = useState('');
const [endTime, setEndTime] = useState('');

const handleStartTimeChange = () => {
  setStartTime(startRef.current.value)
}
const handleEndTimeChange = () => {
  setEndTime(endRef.current.value)
}

console.log(startTime, 'startTime');
console.log(endTime, 'endTime');

// slot
const [slotBtn, setSlotBtn] = useState(true);
const [isSlot, setisSlot] = useState(false);
const [slotTable, setSlotTable] = useState(false);
const slotRef = useRef('');
const handleslot = () => {
  setisSlot(!isSlot);
  setSlotBtn(!slotBtn);
};
// addSlot
const [slot, setSlot] = useState([]);
const addSlot = () => {
  if (slotRef.current.value === '') {
    alert('Please Enter value for adding plan ');
  } else {
    const slotValue = `${startTime} - ${endTime}`;
    setSlot([...slot, slotValue]);
    console.log(slot);
    startRef.current.value = '';
    endRef.current.value='';
    setSlotTable(true);
  }
};
const slotDelete = (index) => {
  let newslot = slot.slice(0, index).concat(slot.slice(index + 1));
  if (slot.length == 1 || slot.length == 0) {
    setSlotTable(false);
  }
  setSlot(newslot);
};

// END



console.log(startTime, 'startTime');
console.log(endTime, 'endTime');

// day
const [oneDay, setOneDay] = useState('');

const [dayButton, setDayButton] = useState(true);
const [isDay, setIsDay] = useState(false);
const [dayTable, setDayTable] = useState(false);
const dayRef = useRef('');
const handleDay = () => {
  setIsDay(!isDay);
  setDayButton(!dayButton);
};
// addDay
const [day, setDay] = useState([]);
console.log(day)
const addDay = () => {
  if (dayRef.current.value === '') {
    alert('Please Enter value for adding plan ');
  } else {
      if(oneDay === 'All Days'){
          const dayValue = ['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
          setDay([...day, ...dayValue]);
      }
      else{
          const dayValue = oneDay;
          if(dayValue !== ''){
              setDay([...day, dayValue]);
          }
      }
    console.log(day);
    dayRef.current.value = '';
    setDayTable(true);
  }
};
const dayDelete = (index) => {
  let newday = day.slice(0, index).concat(day.slice(index + 1));
  if (day.length === 1 || day.length === 0) {
    setDayTable(false);
  }
  setDay(newday);
};

const dayChange = () => {
      setOneDay(dayRef.current.value);
}





  return (
    <section className='add-service grid-cols-1 border-solid border-1'>
    <h3 className='text-center text-2xl'>Add a new Services</h3>
    <br /><br />
    <form class="w-full max-w-lg " onSubmit={handleSubmit(onSubmit)}>
    <div class="flex flex-wrap  mb-6 ml-10">
<div class="w-full md:w-1/2 px-3 md:mb-0">
  <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 ml-7" for="grid-first-name">
    Doctor Name
  </label>
  <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text"  placeholder=" Name" {...register('doctorName', { required: true })}/>
</div>
<div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
  <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 ml-7" for="grid-first-name">
   Doctor Email
  </label>
  <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="email"   placeholder="Valid Email" {...register('doctorEmail', { required: true })}/>
</div>
</div>
<div class="flex flex-wrap  mb-6 ml-10">
<div class="w-full md:w-1/2 px-3 md:mb-0">
  <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 ml-7" for="grid-first-name">
    Service Name
  </label>
  <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="Service Name" {...register('serviceName', { required: true })}/>
</div>
<div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
  <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 ml-7" for="grid-first-name">
  pay
  </label>
  <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="number" placeholder="Amount" {...register('pay', { required: true })}/>
</div>
</div>
{/* day starts  */}
<div class="flex flex-wrap  mb-10 ">


<div class="w-full md:w-1/2 px-3 md:mb-0">
<div class="w-full px-3">
<label class="block uppercase tracking-wide text-gray-700 text-xs font-bold  ml-10" for="grid-first-name">
    Days
  </label>
  {/* ADD dayS  */}
    <div class='m-3 ml-2'>
        <div class='flex mt-3'>
            <p class='fs-4 ms-4 ml-10'>Add dayes</p>
            {dayButton && (
                <button
                      onClick={handleDay}
                      style={{ cursor: 'pointer' }}
                      class='btn btn-sm btn-outline btn-success ml-2'
                >Add</button>
            )}
            {!dayButton && (
                <button
                    onClick={handleDay}
                    style={{ cursor: 'pointer' }}
                    class='ml-3 '
                ><FontAwesomeIcon icon={faSquareMinus} /></button>
            )}
        </div>
    </div>
    {isDay && (
        <div class='px-5'>
            <div style={{ position: 'relative', marginBottom: '70px' }}>
                <div class="w-full px-3">
                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 ml-4" for="grid-password">
                        Days
                    </label>
                    <select ref={dayRef} onChange={dayChange} class="ml-4 appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="text">
                            <option disabled>Select Days</option>
                        {
                            weekDays?.map(weekDay => 
                                <option key={weekDay.value} value={weekDay.value}>{weekDay.label}</option>
                            )
                        }
                    </select>
                </div>
            <div>
            <button
            onClick={addDay}
            className='ml-9 btn btn-sm btn-success'
            type='button'
            >
             ADD
            </button>
        </div>
        </div>
        </div>)}
              <div class='px-5 mt-3'>
                {dayTable && (
                  <div style={{ marginBottom: '20px', marginTop: '0px' }}>
                    <table
                      style={{ borderColllaps: 'collapse', width: '100%' }}
                      class='table  border border-1'
                    >
                      <thead>
                        <tr>
                          <th
                            style={{
                              backgroundColor: '#ecedf7',
                              width: '5%',
                            }}
                            class='fs-6 fw-normal p-6  border'
                          >
                            #
                          </th>
                          <th
                            style={{ backgroundColor: '#ecedf7' }}
                            class='fs-6 fw-normal p-6 ps-5 text-center border'
                          >
                            Days
                          </th>
                          <th
                            style={{
                              backgroundColor: '#ecedf7',
                              width: '5%',
                            }}
                            class='fs-6 fw-normal p-6 ps-5 border'
                          >
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {day.map((day, index) => (
                          <tr>
                            <td
                              style={{ width: '5%' }}
                              class='fs-6 fw-normal border'
                            >
                              {index + 1}
                            </td>
                            <td class='fs-6 ps-5 text-start fw-normal border'>
                              {day}
                            </td>
                            <td class='fs-5 ps-5 fw-normal border'>
                              <button
                                style={{
                                  color: '#ff4533',
                                  cursor: 'pointer',
                                }}
                                onClick={() => dayDelete(index)}
                                class='bi bi-trash ms-2'
                              >Delete</button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
              {/* END  */}
</div>
</div>
{/* day ends  */}
<div class="w-full md:w-1/2 px-3 md:mb-0">
<div class="w-full">
  <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold ml-10" for="grid-password">
    Slots
  </label>
  {/* ADD slotS  */}
  <div class='m-3 ml-2'>
        <div class='flex mt-3'>
            <p class='fs-4 ms-4 ml-10'>Add Slotes</p>
            {slotBtn && (
                <button
                      onClick={handleslot}
                      style={{ cursor: 'pointer' }}
                      class='btn btn-sm btn-outline btn-success ml-2'
                >Add</button>
            )}
            {!slotBtn && (
                <button
                    onClick={handleslot}
                    style={{ cursor: 'pointer' }}
                    class='ml-3 '
                ><FontAwesomeIcon icon={faSquareMinus} /></button>
            )}
        </div>
    </div>
    {isSlot && (
        <div class='px-5'>
            <div style={{ position: 'relative', marginBottom: '70px' }}>
                <div class='form-floating mb-3 ml-5'>
                <label for='floatingTextarea' className='font-bold'>Slots</label>
                    {/* <textarea
                    class='form-control'
                    placeholder='Leave a comment here'
                    id='floatingTextarea'
                    ref={slotRef}
                    ></textarea> */}
                    <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 ml-2" for="grid-first-name">
                             StartTime
                        </label>
                        <input ref={startRef} onChange={handleStartTimeChange} class="ml-5 appearance-none block w-30 bg-gray-200 text-gray-700 border border-gray-500 rounded py-3 px-4  mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="time" />
                    </div>
                    <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 ml-2" for="grid-first-name">
                            EndTime
                        </label>
                        <input onChange={handleEndTimeChange} ref={endRef} class="ml-5 appearance-none block w-30 bg-gray-200 text-gray-700 border border-gray-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="time" />
                    </div>
                </div>
            <div>
            <button
            onClick={addSlot}
            className='ml-14 btn btn-sm btn-success'

            type='button'
            >
             ADD
            </button>
        </div>
        </div>
        </div>)}
              <div class='px-5 mt-3'>
                {slotTable && (
                  <div style={{ marginBottom: '20px', marginTop: '0px' }}>
                    <table
                      style={{ borderColllaps: 'collapse', width: '100%' }}
                      class='table  border border-1'
                    >
                      <thead>
                        <tr>
                          <th
                            style={{
                              backgroundColor: '#ecedf7',
                              width: '5%',
                            }}
                            class='fs-6 fw-normal p-6  border'
                          >
                            #
                          </th>
                          <th
                            style={{ backgroundColor: '#ecedf7' }}
                            class='fs-6 fw-normal p-6 ps-5 text-center border'
                          >
                            slots
                          </th>
                          <th
                            style={{
                              backgroundColor: '#ecedf7',
                              width: '5%',
                            }}
                            class='fs-6 fw-normal p-6 ps-5 border'
                          >
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {slot.map((slot, index) => (
                          <tr>
                            <td
                              style={{ width: '5%' }}
                              class='fs-6 fw-normal border'
                            >
                              {index + 1}
                            </td>
                            <td class='fs-6 ps-5 text-start fw-normal border'>
                              {slot}
                            </td>
                            <td class='fs-5 ps-5 fw-normal border'>
                              <button
                                style={{
                                  color: '#ff4533',
                                  cursor: 'pointer',
                                }}
                                onClick={() => slotDelete(index)}
                                class='bi bi-trash ms-2'
                              >Delete</button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
              {/* END  */}
</div>
</div>
</div>

<div class=" mb-10  ml-60">
<button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-7 rounded-full " type='submit'>
Submit
</button>
</div>
</form>

  </section>
  );
};

export default AddSchedule;
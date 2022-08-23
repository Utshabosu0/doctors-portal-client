import React ,{useState, useRef}from 'react';
import { useForm } from 'react-hook-form';
import { Navigate } from 'react-router-dom';
import Swal from 'sweetalert2';
// import { useHistory } from 'react-router-dom';
import { useQuery } from 'react-query';
import Loading from '../Shared/Loading';

const AddSchedule = () => {
  const { isLoading } = useQuery()

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
    data.slots = slot;
    data.days = day;
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

  if (isLoading) {
    return <Loading></Loading>
}


    return (
        <section className='add-service'>
        <h3 className='text-center mb-3 fw-bold'>Add a new Schedule</h3>
        
        <form class="w-full max-w-lg" onSubmit={handleSubmit(onSubmit)}>
  <div class="flex flex-wrap -mx-3 mb-6">
    <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
      <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
        Service Name
      </label>
      <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="Jane" {...register('name', { required: true })}/>
    </div>
    <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
      <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
        Price
      </label>
      <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="number" placeholder="5000" {...register('price', { required: true })}/>
    </div>
  </div>
  {/* day starts  */}
  <div class="flex flex-wrap -mx-3 mb-6">
    


    <div class="flex flex-wrap -mx-3 mb-6">
    <div class="w-full px-3">
      <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
        Days
      </label>
      {/* ADD dayS  */}
        <div class='m-3'>
            <div class='flex mt-3'>
                <p class='fs-4 ms-4'>Add dayes</p>
                {dayButton && (
                    <button
                          onClick={handleDay}
                          style={{ cursor: 'pointer' }}
                          class='bi bi-plus-square fs-4 ml-3 '
                    >Add</button>
                )}
                {!dayButton && (
                    <button
                        onClick={handleDay}
                        style={{ cursor: 'pointer' }}
                        class='ml-3 '
                    >Minus</button>
                )}
            </div>
        </div>
        {isDay && (
            <div class='px-5'>
                <div style={{ position: 'relative', marginBottom: '70px' }}>
                    <div class="w-full px-3">
                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
                            Days
                        </label>
                        <select ref={dayRef} onChange={dayChange} class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="text">
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
                className=''
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
  </div>
  {/* day ends  */}
  <div class="flex flex-wrap -mx-3 mb-6">
    <div class="w-full px-3">
      <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
        Slots
      </label>
      {/* ADD slotS  */}
        <div class=' m-3  '>
            <div class='flex mt-3'>
                <p class='fs-4 ms-4'>Add Slotes</p>
                {slotBtn && (
                    <button
                          onClick={handleslot}
                          style={{ cursor: 'pointer' }}
                          class='bi bi-plus-square fs-4 ml-3 '
                    >Add</button>
                )}
                {!slotBtn && (
                    <button
                        onClick={handleslot}
                        style={{ cursor: 'pointer' }}
                        class='ml-3 '
                    >Minus</button>
                )}
            </div>
        </div>
        {isSlot && (
            <div class='px-5'>
                <div style={{ position: 'relative', marginBottom: '70px' }}>
                    <div class='form-floating mb-3'>
                    <label for='floatingTextarea'>Slots</label>
                        {/* <textarea
                        class='form-control'
                        placeholder='Leave a comment here'
                        id='floatingTextarea'
                        ref={slotRef}
                        ></textarea> */}
                        <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                                 Start Time
                            </label>
                            <input ref={startRef} onChange={handleStartTimeChange} class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="time" />
                        </div>
                        <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                                End Time
                            </label>
                            <input onChange={handleEndTimeChange} ref={endRef} class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="time" />
                        </div>
                    </div>
                <div>
                <button
                onClick={addSlot}
                className=''
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
  <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" type='submit'>
  Submit
</button>
</form>

      </section>
    );
};

export default AddSchedule;
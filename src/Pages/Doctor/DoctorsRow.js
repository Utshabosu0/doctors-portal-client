import React from 'react';

const DoctorsRow = (props) => {
    const { name, specialty, img,experience } = props.doctor;

    return (
        <div class="card w-96 bg-base-100 shadow-xl">
  <figure class="px-10 pt-10">
    <img src={img} alt="Shoes" class="rounded-xl h-64 w-48"  />
  </figure>
  <div class="card-body items-center text-center">
    <h2 class="card-title">{name}</h2>
    <p>{specialty}</p>
    <p>{experience} years experience</p>

  </div>
</div>
    );
};

export default DoctorsRow;
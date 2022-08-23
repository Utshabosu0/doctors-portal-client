import React from 'react';

const PrimaryButton = ({children}) => {
    return (
        <button style={{color: "#DAE7FC"}} className="btn  uppercase text-white font-bold  ">{children}</button>
    );
};

export default PrimaryButton;
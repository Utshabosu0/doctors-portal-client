import React from 'react';

const PrimaryButton = ({children}) => {
    return (
        <button style={{color: "#DAE7FC"}} className="btn  uppercase text-white font-bold bg-gradient-to-r ">{children}</button>
    );
};

export default PrimaryButton;
import React from 'react';

const WrongInput = ({ msg, slovak }) => {
    return (
        <div className='wrong-input' style={{ fontSize: '18px' }}>
            {slovak ? <p> Zadali ste zlý vstup.</p> :
                <p> You have entered wrong input: {msg}</p>}
        </div>
    );

}

export default WrongInput
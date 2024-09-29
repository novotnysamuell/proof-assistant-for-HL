import React from 'react';


const Alert = ({ slovak }) => {

    return (
        <div style={{ marginTop: '2.5%', marginBottom: '0%', background: 'white', border: '3px double red', display: 'flex', flexDirection: 'column', width: '20rem', alignSelf: 'center', alignItems: 'center', alignSelf: 'center' }}>
            {slovak ? <p style={{ fontWeight: '600', marginTop: '1%', marginBottom: '0.7%' }}>Tento program obsahuje príkaz cyklu.</p> :
                <p style={{ fontWeight: '600', marginTop: '1%', marginBottom: '0.7%' }}>This program contains while loop.</p>}
            {slovak ? <p style={{ marginTop: '0.5%', marginBottom: '2%' }}>Je potrebné zadať invariant.</p> :
                <p style={{ marginTop: '0.5%', marginBottom: '2%' }}>Additional input for invariant is needed.</p>}
        </div>
    );
};

export default Alert;



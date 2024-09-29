import React from 'react';


const Language = ({ setSlovak }) => {

    function hangleClick(id) {
        if (id === "sk") {
            setSlovak(true)
            let el = document.getElementById("slovak")
            el.className = "language-button-clicked"
            el = document.getElementById("english")
            el.className = "language-button"
        } else {
            setSlovak(false)
            let el = document.getElementById("slovak")
            el.className = "language-button"
            el = document.getElementById("english")
            el.className = "language-button-clicked"
        }
    }


    return (
        <div className="language">
            <button id="slovak" className="language-button-clicked" onClick={() => hangleClick("sk")}>SK</button>
            <p style={{ margin: '0%', font: '18px', marginTop: '4%' }}>/</p>
            <button id="english" className="language-button" onClick={() => hangleClick("eng")}>ENG</button>
        </div>
    );
};

export default Language;



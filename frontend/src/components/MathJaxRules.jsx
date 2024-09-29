import React, { useState } from "react";
import rules from "./rules.png";
import rulesSK from "./rulesSk.png";
import Button from "./Button";


const Rules = ({ slovak, openedHelper }) => {
    const [show, setShow] = useState(false)

    function handleClick() {
        show ? setShow(false) : setShow(true)
    }


    return (
        <div>
            {slovak ? <Button theme="default ruleBut" onClick={handleClick}>Pravidlá</Button> :
                <Button theme="default ruleBut" onClick={handleClick}>Rules</Button>}
            {(show && !openedHelper) &&
                <div className="ruleShow">
                    <div>
                        {slovak ? <p style={{ fontSize: '17px', fontWeight: 'bold', marginLeft: '1%', marginTop: '0.5%', float: 'left', background: 'transparent', color: 'white' }}>Zoznam pravidiel</p> :
                            <p style={{ fontSize: '17px', fontWeight: 'bold', marginLeft: '1%', marginTop: '0.5%', float: 'left', background: 'transparent', color: 'white' }}>Rules possible to use</p>}
                        <button onClick={handleClick} style={{ fontSize: '17px', fontWeight: 'bold', marginTop: '0.5%', float: 'right', marginRight: '2%', background: 'transparent', cursor: 'pointer', border: 'none', color: 'white' }}> X</button>
                    </div>
                    {slovak ? <img src={rulesSK} style={{ height: '666px', }} alt=""></img> : <img src={rules} style={{ height: '666px', }} alt=""></img>}
                </div>
            }
        </div>
    )
}


export default Rules
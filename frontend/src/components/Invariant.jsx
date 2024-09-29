import React, { useState } from "react";
import Button from './Button';
import BackendParser from './BackendParser'
import polygon1 from "./Polygon.png";

const Invariant = ({ slovak, setInvariantVal, calculateProblem }) => {
    const [inputValue, setInputValue] = useState('');
    const [error, setError] = useState(false);

    const handleChange = (event) => {
        setInputValue(event.target.value);
    };

    function appendInput() {
        let result = inputValue;
        result = result.trim()
        result = result.split('').join(' ')
        result = result.replaceAll('a n d', 'and')
        result = result.replaceAll('o r', 'or')
        result = result.replaceAll('< =', '<=')
        result = result.replaceAll('> =', '>=')
        result = result.replaceAll('t r u e', 'true')
        result = result.replaceAll('f a l s e', 'false')
        if (checkRule(result)) {
            return result
        }
        return false
    }

    function checkRule(input) {
        let parser = new BackendParser(input)
        setError(false)
        try {
            parser.check()
        } catch (error) {
            setError(true)
            return false
        }
        return true
    }

    const handleClick = () => {
        let result = appendInput()
        //console.log("result: ", result)
        if (result) {
            setInvariantVal(result)
            calculateProblem(result)
        }
    };

    return (
        <div>
            {slovak ? <p className="invariant-input">Zadajte invariant:</p> : <p className="invariant-input">Enter invariant:</p>}
            <div style={{ display: 'flex', flexDirection: 'row', width: '35rem' }}>
                <input className="invariant-input-block" type="text" value={inputValue} onChange={handleChange} />
                {(inputValue.length > 0 && slovak) && <Button theme="default invariantSk" onClick={handleClick}><img src={polygon1} className="polygon" alt="" /></Button>}
                {(inputValue.length > 0 && !slovak) && <Button theme="default invariant" onClick={handleClick}>Set</Button>}
                {(error && slovak) && <p className="wrong-input" style={{ width: '7rem', fontWeight: 'bold', marginLeft: '2.5%' }}>Zlý vstup</p>}
                {(error && !slovak) && <p className="wrong-input" style={{ width: '7rem', fontWeight: 'bold', marginLeft: '2.5%' }}>Wrong input</p>}
            </div>
        </div>
    );
}

export default Invariant
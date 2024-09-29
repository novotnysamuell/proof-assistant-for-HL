import React, { useEffect, useState } from 'react';


const GuessRuleBar = ({ obj, counter, setCountSteps, parserCount, slovak }) => {
    const [error, setError] = useState(false)
    const [previous, setPrevious] = useState(1)

    useEffect(() => {
        if (previous > counter) {
            setError(false)
        }
    }, [counter])

    const click = (id) => {
        //console.log("counter ", counter)
        setPrevious(counter)
        setAllToDef()
        let error = false
        setError(false)
        let el = document.getElementById(id)
        if (id.includes("as")) {
            el.className = "button-rule button-rule-clicked"
        } else {
            el.className = "button-conseq button-conseq-clicked"
        }
        let result = checkRule()
        if (result < 7) {
            if (id.includes(result)) {
                setCountSteps((counter => (counter + 1)))
            }
            else if (result === 6) {
                if ("left" + counter in obj && "right" + counter in obj && id === "CON") {
                    setCountSteps((counter => (counter + 1)))
                } else if ("left" + counter in obj && !("right" + counter in obj) && id === "LCON") {
                    setCountSteps((counter => (counter + 1)))
                } else if (("right" + counter in obj && !("left" + counter in obj) && id === "RCON")) {
                    setCountSteps((counter => (counter + 1)))
                } else {
                    setError(true)
                    error = true
                }
            }
            else {
                //console.log("error")
                setError(true)
                error = true
            }
        }
    }

    function setAllToDef() {
        let def = "button-rule"
        let el = ""
        for (let i = 1; i < 6; i++) {
            let str = i + "as"
            el = document.getElementById(str)
            el.className = def
        }
        def = "button-conseq"
        el = document.getElementById("CON")
        el.className = def
        el = document.getElementById("LCON")
        el.className = def
        el = document.getElementById("RCON")
        el.className = def
    }


    function checkRule() {
        let str = "rule" + counter
        //console.log("string", str)
        if (str in obj) {
            return obj[str]
        }
        return 20
    }


    return (
        <div style={{ display: 'flex', flexDirection: 'column', marginTop: '1.5%', height: '5rem' }}>
            <div className='rules-wrapper'>
                <button id="1as" className="button-rule" onClick={() => click("1as")}>1 AS</button>
                <button id="2as" className="button-rule" onClick={() => click("2as")}>2 AS</button>
                <button id="3as" className="button-rule" onClick={() => click("3as")}>3 AS</button>
                <button id="4as" className="button-rule" onClick={() => click("4as")}>4 AS</button>
                <button id="5as" className="button-rule" onClick={() => click("5as")}>5 AS</button>
                <button id="CON" className="button-conseq" onClick={() => click("CON")}>CONSEQ</button>
                <button id="LCON" className="button-conseq" onClick={() => click("LCON")}>L CONSEQ</button>
                <button id="RCON" className="button-conseq" onClick={() => click("RCON")}>R CONSEQ</button>
            </div>
            {(error && slovak) && <p className='wrong-input' style={{ paddingLeft: '0.5%', marginLeft: '0%', marginTop: '0.2%', marginBottom: '0%', fontWeight: '600' }}>Zvolené pravidlo je nesprávne</p>}
            {(error && !slovak) && <p className='wrong-input' style={{ paddingLeft: '0.5%', marginLeft: '0%', marginTop: '0.2%', marginBottom: '0%', fontWeight: '600' }}>The rule you chose is incorrect.</p>}
        </div>
    );
};

export default GuessRuleBar;


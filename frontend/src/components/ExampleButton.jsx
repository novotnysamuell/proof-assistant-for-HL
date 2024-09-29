import React from 'react';

const ExampleButton = ({ setEditorText, slovak }) => {

    const examples = {
        example1: "{ k = 5 } k := k + 1 { k = 6 }",
        example2: "{ j = 3 } skip { j = 3 }",
        example3: "{true} if x < 0 then x := -1 * x else x := x {x >= 0}",
        example4:
            "{x = m and y = n}\n" +
            "x:= x + y;\n" +
            "y:= x - y;\n" +
            "x:= x - y\n" +
            "{x = n and y = m}",
        example5: "{ x <= 0 } while x <= 5 do x := x + 1 { x = 6 }",
        example6: "{x >= 0 and y >= 0}\n" +
            "q:=0;\n" +
            "r:=x;\n" +
            "while not (r <= y) do\n" +
            "(r:=r - y;\n" +
            "q:=q + 1)\n" +
            "{q * y + r = x and 0 <= r and r <= y}", // invariant     q * y + r = x and 0 <= r
    };

    function clickChange(e) {
        setEditorText(e.target.value)
    }

    return (
        <div className="custom-select ">
            <select id="example" onChange={clickChange}>
                {slovak ? <option hidden value={0}>Vložiť príklad</option> : <option hidden value={0}>Paste example</option>}
                {slovak ? <option value={examples.example1}>Jednoduchá inkrementácia</option> : <option value={examples.example1}>Simple increment</option>}
                {slovak ? <option value={examples.example4}>Výmena premenných</option> : <option value={examples.example4}>Swap variables</option>}
                {slovak ? <option value={examples.example3}>Absolútna hodnota</option> : <option value={examples.example3}>Absolute value</option>}
                {slovak ? <option value={examples.example5}>Dynamická inkrementácia</option> : <option value={examples.example5}>Dynamic value increment</option>}
                {slovak ? <option value={examples.example6}>Delenie prirodzených čísel</option> : <option value={examples.example6}>Division of Natural numbers</option>}
            </select>
        </div>
    )
};

export default ExampleButton;


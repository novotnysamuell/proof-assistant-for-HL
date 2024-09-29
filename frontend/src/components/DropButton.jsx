import React from "react";

const DropDown = ({ handleclick }) => {

    function clickChange(e) {
        handleclick(prev => ({ ...prev, fontSize: `${e.target.value}px`, lineHeight: `${((e.target.value / 2) * 3) + 3}px` }))
    }

    return (
        <div className="custom-select ">
            <select id="font" onChange={clickChange}>
                <option value={18}>18px</option>
                <option value={24}>24px</option>
                <option value={36}>36px</option>
                <option value={48}>48px</option>
                <option value={72}>72px</option>
            </select>
        </div>
    )
}

export default DropDown;

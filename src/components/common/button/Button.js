import React from "react";
import "./button.css"

/**
 * State less component
 */
export const Button = ({type, text, onClick})=>{
    return (<button className={type ? `btn ${type}` : 'btn'} onClick={(event)=>onClick(event)}>{text}</button>);
}
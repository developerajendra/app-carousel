import React from "react";
import "./button.css"

/**
 * State less component
 */
export const Button = ({type, text, onClick, disabled})=>{
     let _class = type ? `btn ${type}` : 'btn';
    return (<button  className={_class} onClick={(event)=>onClick(event)}>{text}</button>);
}
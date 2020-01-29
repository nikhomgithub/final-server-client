import React from 'react'
import './Test.css'
import $ from 'jquery';

export default function Test() {

    const turnRed=(e)=>{
        //$('.ul-box li').css('color','red');
    }
    const turnGreen=(e)=>{
       // $('li').css('color','green')
    }
    const hideh1=(e)=>{
        $('document').hide();
    }
    const changeColor=(e)=>{
        
    }

    return (
        <div onMouseEnter={turnRed} onMouseLeave={turnGreen}>
            <ul className="ul-box">
                <li>red</li>
                <li>green</li>
                <li>yellow</li>
            </ul>
                <input 
                    onFocus={(e)=>{$('input').css('background-color','pink')}}
                    onBlur={(e)=>{$('input').css('background-color','white')}}
                ></input>
              <button onClick={hideh1}>Hide</button>
        </div>  
    )
}

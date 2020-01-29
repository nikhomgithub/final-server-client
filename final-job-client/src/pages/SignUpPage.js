import React , {useContext,useEffect,useRef,useState} from 'react'
import './SignUpPage.css'
import {Redirect} from 'react-router-dom'
import axios from 'axios';
import $ from 'jquery';
import {AddContext} from '../context/AddContext';

export default function SignUpPage() {
    const {loadShopuser}=useContext(AddContext)
    const [inputActiveState,setInputActiveState]=useState(false);

    const [buttonFocusState,setButtonFocusState]=useState(false);
   
    const [inputDetail,setInputDetail]=useState({
        shopname:'',
        email:'',
        password:'',
        confirmedPassword:''
    });
   
    const refshopname=useRef();
    const refemail=useRef();
    const refpassword=useRef();
    const refconfirmedPassword=useRef();
    const refsubmit=useRef();

    useEffect(()=>{
        refshopname.current.focus()
        
    },[])
   
    const getStyleFalse =()=> { return{}}
    
    const getStyleTrue =()=> {
        return{
            position:'absolute',
            top:'0',
            left:'2%',
            color:'#222'
        }
    }

    const getStyleButtonTrue=()=>{
        return{
            color:'white',
            border:'white 1px solid'
        }
    }

    const getStyleButtonFalse=()=>{
        return{}
    }

    const changeInputDetail=(e)=>{
        setInputActiveState(true)
        setInputDetail({...inputDetail,[e.target.name]:e.target.value})
    }

    const keyDownInput=(e)=>{
        if(e.key=="Enter"){
            e.preventDefault();
            //console.log(e.target.name)
            switch(e.target.name){
                case "shopname":         
                    refemail.current.focus();
                    return;
                case "email":
                    refpassword.current.focus();
                    return;
                case "password":
                    refconfirmedPassword.current.focus()
                    return;
                case "confirmedPassword":
                    refsubmit.current.focus()
                    setButtonFocusState(true)
                    return;
                case "submitButton":
                    clickSubmit()
                    return;
                default:
                    return;
            }
        }
    }

    const [returnHome,setReturnHome]=useState(false);
    const handleRoute=()=>{
        return returnHome?<Redirect to="/" exact/>:null
    }

    const clickSubmit=(e)=>{
        e.preventDefault();
        //setReturnHome(true);
        const {shopname,email,password}=inputDetail;
        const config={headers:{"Content-type":"application/json"}}
        const body=JSON.stringify({shopname,email,password});
        //console.log(body)
        //console.log(config)
        axios.post('/shop/signup/',body,config)
        .then(res=>{
            //console.log(res)
            loadShopuser()}
        )
        .catch(err=>{console.log(err)})
    }

    return (
        <div className="hero-background">
            <div className="hero">
                {handleRoute()}
                <div className="center-box">
                    <h1 >Sign Up Page</h1>
                    <form className="sign-up-form">
                        <div>
                            <label htmlFor="shop-name-id" style={inputActiveState?getStyleTrue():getStyleFalse()}>Shop Name</label>
                            <input
                                className="form-input"
                                type="text"
                                name="shopname"
                                id="shop-name-id"
                                //or value={inputDetail.shopname||''} if not set initial value
                                value={inputDetail.shopname||''}
                                onChange={changeInputDetail}
                                onKeyDown = {keyDownInput}
                                ref={refshopname}
                                onFocus={(e)=>{$('#shop-name-id').css('background-color','pink')}}
                                onBlur={(e)=>{$('#shop-name-id').css('background-color','white')}}
                             />
                        </div>
                        <div>
                            <label htmlFor="email-id" style={inputActiveState?getStyleTrue():getStyleFalse()}>Email</label>
                            <input
                                className="form-input"
                                type="text"
                                name="email"
                                id="email-id"
                                value={inputDetail.email}
                                onChange={changeInputDetail}
                                onKeyDown = {keyDownInput}
                                ref={refemail}
                                onFocus={(e)=>{$('#email-id').css('background-color','pink')}}
                                onBlur={(e)=>{$('#email-id').css('background-color','white')}}
                            />
                        </div>
                        <div>
                            <label htmlFor="password-id" style={inputActiveState?getStyleTrue():getStyleFalse()}>Password</label>
                            <input
                                className="form-input"
                                type="text"
                                name="password"
                                id="password-id"
                                value={inputDetail.password}
                                onChange={changeInputDetail}
                                onKeyDown = {keyDownInput}
                                ref={refpassword}
                                onFocus={(e)=>{$('#password-id').css('background-color','pink')}}
                                onBlur={(e)=>{$('#password-id').css('background-color','white')}}
                            />
                        </div>
                        <div>
                            <label htmlFor="confirmed-password-id" style={inputActiveState?getStyleTrue():getStyleFalse()}>Confirmed Password</label>
                            <input
                                className="form-input"
                                type="text"
                                name="confirmedPassword"
                                id="confirmed-password-id"
                                value={inputDetail.confirmedPassword}
                                onChange={changeInputDetail}
                                onKeyDown = {keyDownInput}
                                ref={refconfirmedPassword}
                                onFocus={(e)=>{$('#confirmed-password-id').css('background-color','pink')}}
                                onBlur={(e)=>{$('#confirmed-password-id').css('background-color','white')}}
                            />
                        </div>
                        <div className="sign-up-div">
                            <input
                                className="sign-up-button"
                                name="submitButton"
                                type="submit"
                                value="Submit to Sign Up"
                                onClick={clickSubmit}
                                ref={refsubmit}
                                style={buttonFocusState?getStyleButtonTrue():getStyleButtonFalse()}
                            />
                        </div>    
                    </form>
                </div>
            </div>
        
        </div>
    )
 
}



import React , {useContext,useEffect,useRef,useState} from 'react'
import './LogInPage.css'
import {Redirect} from 'react-router-dom'
import axios from 'axios';
import $ from 'jquery';
import {AddContext} from '../context/AddContext';

export default function LogInPage() {
    const {token,setToken,isAuth,setIsAuth}=useContext(AddContext)

    const [inputActiveState,setInputActiveState]=useState(false);

    const [buttonFocusState,setButtonFocusState]=useState(false);
   
    const [inputDetail,setInputDetail]=useState({
        email:'',
        password:'',
    });
   
    const refemail=useRef();
    const refpassword=useRef();
    const refsubmit=useRef();

    useEffect(()=>{
        refemail.current.focus()
        
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
                case "email":
                    refpassword.current.focus();
                    return;
                case "password":
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
        const {email,password}=inputDetail;
        const config={headers:{"Content-type":"application/json"}}
        const body=JSON.stringify({email,password});
        axios.post('/shop/login/',body,config)
        .then(res=>{
            localStorage.setItem('fj-token',res.data.token)
            setToken(res.data.token);
            setIsAuth(true)
            console.log(res.data)
        })
        .catch(err=>{console.log(err)})
    }
    return (
        <div className="hero-background">
            <div className="hero">
                {handleRoute()}
                <div className="center-box">
                    <h1 >Log In Page</h1>
                    <form className="log-in-form">
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
                      
                        <div className="log-in-div">
                            <input
                                className="log-in-button"
                                name="submitButton"
                                type="submit"
                                value="Submit to Log In"
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

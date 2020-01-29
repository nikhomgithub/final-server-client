import React , {useEffect,useRef,useState} from 'react'
import './ChangePasswordPage.css'

export default function ChangePasswordPage() {
    
    const [inputActiveState,setInputActiveState]=useState(false);

    const [buttonFocusState,setButtonFocusState]=useState(false);
   
    const [inputDetail,setInputDetail]=useState({
        existingPassword:'',
        newPassword:'',
        confirmedNewPassword:''
    });
   
    const refexistingPassword=useRef();
    const refnewPassword=useRef();
    const refconfirmedNewPassword=useRef();
    const refsubmit=useRef();

    useEffect(()=>{
        refexistingPassword.current.focus()
        
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
                case "existingPassword":         
                    refnewPassword.current.focus();
                    return;
                case "newPassword":
                    refconfirmedNewPassword.current.focus();
                    return;
                case "confirmedNewPassword":
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

    const clickSubmit=(e)=>{
        e.preventDefault();
        console.log(e.target.name)
    }
    return (
        <div className="hero-background">
            <div className="hero">
                <div className="center-box">
                    <h1 >Confirmed Password Page</h1>
                    <form className="change-password-form">
                        <div>
                            <label htmlFor="existingPassword-id" style={inputActiveState?getStyleTrue():getStyleFalse()}>Existing Password</label>
                            <input
                                className="form-input"
                                type="text"
                                name="existingPassword"
                                id="existingPassword-id"
                                value={inputDetail.existingPassword}
                                onChange={changeInputDetail}
                                onKeyDown = {keyDownInput}
                                ref={refexistingPassword}
                             />
                        </div>
                        <div>
                            <label htmlFor="newPassword-id" style={inputActiveState?getStyleTrue():getStyleFalse()}>New Password</label>
                            <input
                                className="form-input"
                                type="text"
                                name="newPassword"
                                id="newPassword-id"
                                value={inputDetail.newPassword}
                                onChange={changeInputDetail}
                                onKeyDown = {keyDownInput}
                                ref={refnewPassword}
                            />
                        </div>
                        <div>
                            <label htmlFor="confirmedNewPassword-id" style={inputActiveState?getStyleTrue():getStyleFalse()}>Confirmed New Password</label>
                            <input
                                className="form-input"
                                type="text"
                                name="confirmedNewPassword"
                                id="confirmNewPassword-id"
                                value={inputDetail.confirmedNewPassword}
                                onChange={changeInputDetail}
                                onKeyDown = {keyDownInput}
                                ref={refconfirmedNewPassword}
                            />
                        </div>
                        <div className="change-password-div">
                            <input
                                className="change-password-button"
                                name="submitButton"
                                type="submit"
                                value="Submit"
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

import React,{useEffect,useRef,useState,useContext} from 'react'
import './AddUserPage.css'
import {AddContext} from '../context/AddContext';
import DeleteIcon from '@material-ui/icons/Delete';
import CreateIcon from '@material-ui/icons/Create';
import $ from 'jquery';

export default function AddUserPage() {
    const {findalluser,users,addUser,deleteUser,findUser,toeditUser,settoeditUser,editUser}=useContext(AddContext)

    const [inputActiveState,setInputActiveState]=useState(false);

    const [buttonFocusState,setButtonFocusState]=useState(false);
   
    const [editStatus,setEditStatus]=useState(false)

    const [inputDetail,setInputDetail]=useState({
        userid:'',
        userlevel:'',
        name:'',
        password:'',
    });

    const [isValid,setisValid]=useState({
        userlevel:true,
        name:true,
        password:true
    })

    const refuserid=useRef();
    const refuserlevel=useRef();
    const refname=useRef();
    const refpassword=useRef();
    const refsubmit=useRef();

    useEffect(()=>{
        refname.current.focus()
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

    const editUserClick=(id)=>{
        setEditStatus(true);
        findUser(id);
        refuserlevel.current.focus();
    }

    React.useEffect(()=>{
        const {userid,userlevel,name,password}=toeditUser;
        if(userid){
            setInputDetail({
                userid,userlevel,name,password
            });
            setInputActiveState(true);
        }  
    },[toeditUser])

    const keyDownInput=(e)=>{
        if(e.key=="Enter"){
            e.preventDefault();
            //console.log(e.target.name)
            switch(e.target.name){
                case "userid":         
                    refname.current.focus();
                    //refuserlevel.current.focus();
                    return;
                case "name":
                    refuserlevel.current.focus();
                    //refpassword.current.focus()
                    return;
                case "userlevel":
                    refpassword.current.focus()
                    //refname.current.focus();
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
  
    const regexname = /^[a-z\d]{1,12}$/i
    const regexpassword= /^[#\w@_-]{1,20}$/
    const regexuserlevel= /admin|manager|user/
    //const regexuserlevel=/^\d{1}$/

    const validateInput=()=>{
        const resultregexname= regexname.test(inputDetail.name);
        const resultregexpassword= regexpassword.test(inputDetail.password);
        const resultregexuserlevel= regexuserlevel.test(inputDetail.userlevel)
        
        if(resultregexname&&resultregexpassword&&resultregexuserlevel){
            return true;
        }
        else{
            setisValid({
                name:resultregexname,
                password:resultregexpassword,
                userlevel:resultregexuserlevel
            });
            return false
        }
    }

    const clickSubmit=(e)=>{
        e.preventDefault();
        const resultregexname= regexname.test(inputDetail.name);
        const resultregexpassword= regexpassword.test(inputDetail.password);
        const resultregexuserlevel= regexuserlevel.test(inputDetail.userlevel)

        console.log(validateInput());

        if(resultregexname&&resultregexpassword&&resultregexuserlevel){
            if(editStatus){
                const {userid,userlevel,name,password}=inputDetail;
                editUser(userid,userlevel,name,password);
                setInputDetail({userid:'',userlevel:'',name:'',password:''});
                setButtonFocusState(false);   
                setEditStatus(false);
                refname.current.focus();
            }
            else{
                const {userlevel,name,password}=inputDetail;
                addUser(Math.round(Math.random()*10000),userlevel,name,password);
                setInputDetail({userid:'',userlevel:'',name:'',password:''});
                setButtonFocusState(false);   
                refname.current.focus();
            }
        }
        else{
            if(!resultregexpassword){
                setInputDetail({...inputDetail,password:''});
                refpassword.current.focus();
            }
            if(!resultregexname){
                setInputDetail({...inputDetail,name:''});
                refname.current.focus();
            }
            if(!resultregexuserlevel){
                setInputDetail({...inputDetail,userlevel:''})
                refuserlevel.current.focus();
            }
        }
    }
   
    return (
        <div className="hero-background">
            <div className="hero">
                <div className="center-box">
                    <h1 >Add User Page</h1>
                    <form className="add-user-form">
                        <div style={{display:'none'}}>
                            <label htmlFor="userid-id" style={inputActiveState?getStyleTrue():getStyleFalse()}>User Id</label>
                            <input
                               className="form-input"
                               type="text"
                               name="userid"
                               id="userid-id"
                               //or value={inputDetail.shopName||''} if not set initial value
                               value={inputDetail.userid}
                               onChange={changeInputDetail}
                               onKeyDown = {keyDownInput}
                               ref={refuserid}
                               onFocus={(e)=>{$('#userid-id').css('background-color','pink')}}
                               onBlur={(e)=>{$('#userid-id').css('background-color','white')}}
                             />
                        </div>              
                        <div>
                            <label htmlFor="name-id" style={inputActiveState?getStyleTrue():getStyleFalse()}>User Name</label>
                            <input
                               className="form-input"
                               type="text"
                               name="name"
                               id="name-id"
                               //or value={inputDetail.shopName||''} if not set initial value
                               value={inputDetail.name}
                               onChange={changeInputDetail}
                               onKeyDown = {keyDownInput}
                               ref={refname}
                               onFocus={(e)=>{$('#name-id').css('background-color','pink')}}
                               onBlur={(e)=>{$('#name-id').css('background-color','white')}}
                            />
                        </div>
                        <div>
                            <label htmlFor="userlevel-id" style={inputActiveState?getStyleTrue():getStyleFalse()}>User Level</label>
                            <input
                               className="form-input"
                               type="text"
                               name="userlevel"
                               id="userlevel-id"
                               //or value={inputDetail.shopName||''} if not set initial value
                               value={inputDetail.userlevel}
                               onChange={changeInputDetail}
                               onKeyDown = {keyDownInput}
                               ref={refuserlevel}
                               onFocus={(e)=>{$('#userlevel-id').css('background-color','pink')}}
                               onBlur={(e)=>{$('#userlevel-id').css('background-color','white')}}
                             />
                        </div>
                        <div>
                            <label htmlFor="password-id" style={inputActiveState?getStyleTrue():getStyleFalse()}>User Password</label>
                            <input
                               className="form-input"
                               type="text"
                               name="password"
                               id="password-id"
                               //or value={inputDetail.shopName||''} if not set initial value
                               value={inputDetail.password}
                               onChange={changeInputDetail}
                               onKeyDown = {keyDownInput}
                               ref={refpassword}
                               onFocus={(e)=>{$('#password-id').css('background-color','pink')}}
                               onBlur={(e)=>{$('#password-id').css('background-color','white')}}
                             />
                        </div>
                        <div className="add-user-div">
                                <input
                                    className="add-user-button"
                                    name="submitButton"
                                    type="submit"
                                    value={editStatus?"Edit User":"Add User"}
                                    onClick={clickSubmit}
                                    ref={refsubmit}
                                    style={buttonFocusState?getStyleButtonTrue():getStyleButtonFalse()}
                                />
                        </div>    
                    </form>
                    <div className="display-user-div">
                         <ul className="display-user-header-ul">
                            <div><li>User-ID</li></div>                            
                            <div><li>Name</li></div>
                            <div><li>Password</li></div>
                            <div><li>Level-active</li></div>
                            <div></div>
                        </ul>
                            {users
                                ?users.user.map(u=>
                                    <ul key={u._id} className="display-user-ul">
                                        <div><li><h5>{u._id}</h5></li></div>
                                        <div><li>{u.username}</li></div>
                                        <div><li>{u.userpassword}</li></div>
                                        <div><li>{u.useractive?`${u.userlevel}-true`:`${u.userlevel}-false`}</li></div>
                                        <div><li>
                                            <CreateIcon onClick={(e)=>editUserClick(u.userid)}/>
                                            <DeleteIcon onClick={(e)=>{
                                                e.preventDefault();deleteUser(users._id,u._id)
                                            }}/>
                                        </li></div>
                                    </ul>
                                )
                                :null
                            }  
                    </div>
                </div>
            </div>
        </div>
    )
}

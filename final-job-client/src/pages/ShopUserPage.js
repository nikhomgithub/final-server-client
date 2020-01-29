import React,{useEffect,useRef,useState,useContext} from 'react'
import './ShopUserPage.css'
import {AddContext} from '../context/AddContext';
import DeleteIcon from '@material-ui/icons/Delete';
import CreateIcon from '@material-ui/icons/Create';
import $ from 'jquery';
import {Link} from 'react-router-dom';
export default function AddUserPage() {
    const {shopuser,deleteShopuser,findalluser}=useContext(AddContext)

    return (
        <div className="hero-background">
            <div className="hero">
                <div className="center-box">
                    <h1 >Add User Page</h1>

                        <div className="display-user-div">
                            <ul className="display-user-header-ul">
                                <div><li>User-ID</li></div>
                                <div><li>Shop-Name</li></div>
                                <div><li>E-mail</li></div>
                                <div><li>Level-active</li></div>
                                <div></div>
                            </ul>                    
                        </div>
                        {shopuser.map(u=>
                            <ul key={u._id} className="display-user-ul">
                                <div><li><h5>{u._id}</h5></li></div>
                                <div><li>{u.shopname}</li></div>
                                <div><li>{u.email}</li></div>
                                <div><li>{u.active?`${u.level}-true`:`${u.level}-false`}</li></div>
                                <div>
                                    <li>
                                        <Link to="/adduser"> 
                                            <CreateIcon onClick={(e)=>{findalluser(u._id)}}/>
                                        </Link>
                                        <DeleteIcon onClick={(e)=>{deleteShopuser(u._id)}}/>
                                    </li>
                                </div>
                            </ul>
                        )}
                </div>
            </div>
        </div>
    )
}

/*
<Link to="/adduser"> 
<CreateIcon onClick={(e)=>{findalluser(u._id)}}/>
</Link>
*/
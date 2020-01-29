import React from 'react';
import axios from 'axios';

export const AddContext=React.createContext();

const AddContextProvider = (props) => {
    /*
    const [user,setUser]=React.useState([  
        {
            userid:1,
            userlevel:'1',
            name:'Nikhom',
            password:'nik',
        },
        {
            userid:2,
            userlevel:'1',
            name:'Vijit',
            password:'vij',
        }
    ])

    const [toeditUser,settoeditUser]=React.useState({
        userid:'',
        userlevel:'',
        name:'',
        password:'',
    })

    const addUser=(userid,userlevel,name,password)=>{
        if(!userlevel){
            userlevel='1';
        }
        if(userid&&userlevel&&name&&password){
            setUser([...user,{userid,userlevel,name,password}])
        }
    }

    const deleteUser=(userid)=>{
        if(userid){
            setUser([...user.filter(i=>i.userid!==userid)])
        }
    }

    const findUser=(userid)=>{
        if(userid){
            settoeditUser([...user.filter(i=>i.userid==userid)][0])
        }
    }

    const editUser=async (userid,userlevel,name,password)=>{
        if(userid&&userlevel&&name&&password){
            const temp = await user.map(i=>{
                            if(i.userid==userid){
                                i.userlevel=userlevel;
                                i.name=name;
                                i.password=password;
                                return i
                            }
                            else{return i}
                         })
            setUser(temp)
            settoeditUser({
                userid:'',
                userlevel:'',
                name:'',
                password:'',
            })
        }
    }
    */
    //==================================
    const [token,setToken]=React.useState(localStorage.getItem('fj-token'))

    const [isAuth,setIsAuth]=React.useState(false)

    const [initial,setInitial]=React.useState(false)

    const [shopuser,setShopuser]=React.useState([])

    const loadShopuser=()=>{
        const config={headers:{"Content-type":"application/json"}}   
        axios.get('/shop/getall',config)
         .then(res=> {
            console.log(res.data) 
            return res.data
         })
         .then(resdata=>{setShopuser(resdata);setInitial(true);})
         .catch(err=> err);
    }
    
    const deleteShopuser=(id)=>{
        const config=tokenConfig();
        axios.delete(`/shop/delete/${id}`,config)
            .then(res=>{loadShopuser()})
            .catch(err=> err);         
    }

    React.useEffect(()=>{
        if(!initial)
        {
            loadShopuser();
            console.log("initial");
        }
    },[])

    const tokenConfig = () => {
        //Headers
        const config={
          headers:{
            "Content-type":"application/json"
          }
        }
        //if token, add to headers
        if(token){
          config.headers['Authorization']='Bearer '+token;
        }
        return config;
     }
    //=====================================
    const [users,setUsers]=React.useState(
       null
    )
    const [toeditUser,settoeditUser]=React.useState({
        userid:'',
        userlevel:'',
        name:'',
        password:'',
    })

    const addUser=(userid,userlevel,name,password)=>{}

    const deleteUser=(shopId,userId)=>{
        const config={headers:{"Content-type":"application/json"}}
        //const body={"shopId":shopId,"userId":userId}
        const body=JSON.stringify({shopId:shopId,userId:userId});
        //console.log(body)
        //console.log(config)
        axios.post('/shop/userdelete/',body,config)
            .then(res=>{
                //console.log(res)
                loadShopuser()
                findalluser(shopId)
            })
            .catch(err=>{console.log(err)})
    }

    const findUser=(userid)=>{}

    const findalluser=(id)=>{
        const config={headers:{"Content-type":"application/json"}}
        axios.get(`/shop/usergetall/${id}`,config)
            .then(result=>{
                setUsers(result.data)
            })
            .catch(err=> err)   
    }

    const editUser=async (userid,userlevel,name,password)=>{
        
    }
    //=====================================
    return (
        <AddContext.Provider value={{users,setUsers,addUser,deleteUser,
                                    findUser,toeditUser,settoeditUser,
                                    editUser,shopuser,loadShopuser,
                                    deleteShopuser,token,setToken,
                                    isAuth,setIsAuth,
                                    findalluser}}>
            {props.children}
        </AddContext.Provider>
    )
}

export default AddContextProvider;
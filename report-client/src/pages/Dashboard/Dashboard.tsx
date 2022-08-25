import "./Home.css"
import { useEffect, useState } from "react"
import {useAppDispatch ,useAppSelector} from "../../app/hooks"
import axios from "axios"
import config from "../../app/config"
import { Fetchusers } from "../../component/Usersinfo/GetUsers"
import { listUserAsync } from "../../app/redux/user/userSlice"


export function Dashboard(){

  const { user } = useAppSelector((state) => state.user);
    // const { reports } = useAppSelector((state) => state.report);
    const dispatch = useAppDispatch();
   
    useEffect(() => {
      dispatch(listUserAsync());
    }, []);

  // const [users ,setUsers] = useState([])
  //   const dispatch = useAppDispatch();
   

    // useEffect(() => {
    //  const getUsers= async()=>{
    //     const res=await axios.get(`${config.API_URL}/user`)
    //     setUsers(res.data)
    //  }
    //  getUsers()
    // }, 
    // []);
    return(
        <>
 <Fetchusers user={user}/>
         
        </>
    )
}
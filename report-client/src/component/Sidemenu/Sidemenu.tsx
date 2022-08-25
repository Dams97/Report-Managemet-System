import "./sidemenu.css"
import { AiFillHome } from "react-icons/ai";
import { FiLogOut} from "react-icons/fi";
import { TbReportAnalytics } from "react-icons/tb";
import { MdGroups } from "react-icons/md";
import { Link, useNavigate } from 'react-router-dom';
import {  useAppDispatch, useAppSelector } from '../../app/hooks';
import { logoutUserAsync } from '../../app/redux/user/userSlice';


export function Sidebar() {
  const { auth, user, ErrorMessage } = useAppSelector((state) => state.user);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const logout = ()=>{
      dispatch(logoutUserAsync());
      localStorage.clear();
      navigate("/login");
}
  return (


     <div className="sidebar">
       <div className='side-ps'>   <ul>
                  <li> <Link className="sidebar-list-item" to={'/dashboard'} > <AiFillHome className='side-icons' />Dashboard</Link></li>
                  <li> <Link className="sidebar-list-item" to={'/home'}> <TbReportAnalytics className='side-icons' />Reports</Link></li>
                  <li> <Link className="sidebar-list-item" to={'/groups'}> <MdGroups className='side-icons' />Groups</Link>
                  </li>
              </ul>

             <div className="sidebar-list-item" onClick={logout}>Log Out <FiLogOut/></div> </div>
           
          </div>
      


      

  )
}

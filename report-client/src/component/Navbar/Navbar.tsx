import "./Navbar.css";
import { FiSearch } from "react-icons/fi";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { AiOutlinePlus } from "react-icons/ai";

import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { loginUserAsync } from "../../app/redux/user/userSlice";
import React, { useState } from "react";


export function Navbar(props: any) {

   const { auth, user, ErrorMessage } = useAppSelector((state) => state.user);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const logout = ()=>{
      dispatch(loginUserAsync(auth));
   
}
const [data, setData] = useState("");
const [open, setOpen] = React.useState(false);
const [openReport, setOpenReport] = React.useState(false);


const handleClose = () => props.setLoginOpen(false);
const handleSubmit = (e: any) => {
  e.preventDefault();
  navigate(`search?q=${data}`);
};

const handleKeyDown = (e: any) => {
  if (e.key === "Enter") {
    e.preventDefault();
  }
};

  return (
    <div className="navbar">
      <div className="navbar_container">
        <div className="navbar__left">
          <Link to={"/home"}>
            <img src="https://icon-library.com/images/report-icon-png/report-icon-png-3.jpg" alt="report icon" />
          </Link>
          <div className="navbar__input">
            <input type="text"
             placeholder="Search..." 
             aria-describedby="emailHelp"
             value={data}
             onChange={(event) => setData(event.target.value)}
             />
       <FiSearch 
       onClick={handleSubmit}
        />
          </div>
        </div>
        <div className="navbar__right">
          <span>Hi,{user?.name}</span>
          <img className="my-avatar" src="profileimage.png" alt="" />
          {/* creating report Modal */}
{/* 
          <div>
      <Button onClick={handleOpen}><div className="tooltip">  <AiOutlinePlus className="createReport" title="Create a report" size={30}/>
  <span className="tooltiptext">New Report</span>
</div> </Button>
      <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={style}>
          <Typography id="keep-mounted-modal-title" variant="h6" component="h2">
        
          </Typography>
          <Typography id="keep-mounted-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box>
      </Modal>
    </div> */}
  <div className="tooltip"> <Link className="tooltip"  to={"/newreport"}> <AiOutlinePlus className="createReport" title="Create a report" size={30}/></Link>
  <span className="tooltiptext">New Report</span>
</div>
     
                      {/* <Link to="/login" className="navbar-buttons navbar__login">
              Log in
            </Link>
            <button className="navbar-buttons navbar__create">
              Create account
            </button> */}
          </div>
        
      </div>
    </div>
  );
};



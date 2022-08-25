import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import "./signup.css";
import TextField from "@mui/material/TextField";
import { useForm } from "react-hook-form";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { registerUserAsync } from "../../app/redux/user/userSlice";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";


export function Signup(){
  const {
    auth = null,
    user = null,
    ErrorMessage,
  } = useAppSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const onSubmit = async (data: any) => {
    dispatch(registerUserAsync(data));
    reset();
  };

  useEffect(() => {
    console.log(auth);
    if (auth) navigate("/home");
  }, [auth]);

  function getErrorMessage(error: any, field: string): string {
    if (error && error[field]) return error[field].message;
    return "";
  }


return (
  <>

   <div className="background"> 

<div className="greetings">Welcome!</div>

  
  <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
             className="login-form">
      <h3>Signup Here</h3>
<div className="reg-inputs">
      <TextField 
      type="text"
       id="name"
       fullWidth
       className="reg-input"
       required
       label="Name"
       {...register("name", {
        required: "required",
        minLength: {
          value: 3,
          message: "min length is 3",
        },
      })}
      error={errors.name && errors.name.message !== undefined}
      helperText={getErrorMessage(errors, "name")}
       />
      <TextField 
      type="email"
      label="Email Address"
       id="email"
       fullWidth
       className="reg-input"
       autoComplete="email"
       autoFocus
       {...register("email", {
        required: "required",
        pattern: {
          value: /\S+@\S+\.\S+/,
          message: "Email is not correct",
        },
      })}
      error={errors.email && errors.email.message !== undefined}
      helperText={getErrorMessage(errors, "email")}
       />
        <TextField
         type="password"
          label="Password"
           id="password"
           fullWidth
           className="reg-input"
           autoComplete="current-password"
           {...register("password", {
             required: "required",
             minLength: {
               value: 5,
               message: "min length is 5",
             },
           })}
           error={errors.password && errors.password.message !== undefined}
           helperText={getErrorMessage(errors, "password")}
           />
</div>
          <Button 
           type="submit"
              variant="contained"
              className="sign-btn"
              sx={{ mt: 3, mb: 2 }}
              >Sign Up</Button>
          <br />
          <br />
          <div className="signup-part"> 
          <p>Already a Member? </p>
          <Link className="sign2-btn" to={"/login"}>Sign In</Link>
          <Typography component="h3" variant="h5" color="#f00">
              {ErrorMessage}
            </Typography>
          </div>
  
        </Box> 
  
  
        {/* <Footer/> */}
        </div>
    
         </>
        )
        }
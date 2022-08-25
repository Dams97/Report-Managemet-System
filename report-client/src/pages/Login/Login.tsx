import { Button, createTheme, TextField } from "@mui/material";
import React from 'react';
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { loginUserAsync, profileUserAsync } from "../../app/redux/user/userSlice";
import { useForm } from "react-hook-form";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import "./Login.css";


export function Login(){

const { auth, user, ErrorMessage } = useAppSelector((state) => state.user);
const navigate = useNavigate();
const dispatch = useAppDispatch();

const {
  register,
  handleSubmit,
  formState: { errors },
  reset,
} = useForm();
const onSubmit = async (data: any) => {
  dispatch(loginUserAsync(data));
  reset();
};

useEffect(() => {
  console.log(auth);
  if (auth) navigate("/");
}, [auth]);

function getErrorMessage(error: any, field: string): string {
  if (error && error[field]) return error[field].message;
  return "";
}

  


return (
  <><div className="background">

<Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
  <Box 
  component="form"
  onSubmit={handleSubmit(onSubmit)}
  className="login-form" 
  noValidate
  sx={{ mt: 1 }}>
      <h3>Login Here</h3>

      {/* <label htmlFor="username">Email</label> */}
      <TextField 
      margin="normal"
      type="email" 
      required 
      fullWidth
      label="Email Address"
      autoComplete="email"
      id="email"
       className="log-input"
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

        {/* <label htmlFor="password">Password</label> */}
        <TextField type="password"
        required
        label="Password" 
         id="password"
         fullWidth
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

         <Button 
         fullWidth
         variant="contained"
         sx={{ mt: 3, mb: 2 }}
         className="sign-btn"
          type="submit"
       
          >Log In</Button>
       
          <div className="signup-part"> 
          <p>Don't have an account? </p>
          <Link className="sign2-btn" to={"/"}>SignUp</Link>
          </div>
          <Typography component="h3" variant="h5" color="#f00">
              {ErrorMessage}
            </Typography>
    
        </Box>
        </Box>
        </div>
         </>
        )
        }


        // import { Button, createTheme, TextField } from "@mui/material";
        // import React from 'react';
        // import { useEffect, useState } from "react";
        // import { Link, useNavigate } from "react-router-dom";
        // import { useAppSelector, useAppDispatch } from "../../app/hooks";
        // import { loginUserAsync, profileUserAsync } from "../../app/redux/user/userSlice";
        // import { useForm } from "react-hook-form";
        // import Box from "@mui/material/Box";
        // import "./Login.css";
        
        
        // export function Login(){
        // // 
        // const { auth, user, ErrorMessage } = useAppSelector((state) => state.user);
        // const navigate = useNavigate();
        // const dispatch = useAppDispatch();
        
        // const {
        //   register,
        //   handleSubmit,
        //   formState: { errors },
        //   reset,
        // } = useForm();
        // const onSubmit = async (data: any) => {
        //   dispatch(loginUserAsync(data));
        //   reset();
        // };
        
        // useEffect(() => {
        //   console.log(auth);
        //   if (auth) navigate("/");
        // }, [auth]);
        
        // function getErrorMessage(error: any, field: string): string {
        //   if (error && error[field]) return error[field].message;
        //   return "";
        // }
        
          
        
        
        // return (
        //   <><div className="background">
        
        
        //   <Box 
        //   component="form"
        //   onSubmit={handleSubmit(onSubmit)} 
        //   className="login-form" 
        //   noValidate>
        //       <h3>Login Here</h3>
        
        //       {/* <label htmlFor="username">Email</label> */}
        //       <TextField type="email" 
        //       required 
        //       placeholder="Email"
        //       label="Email Address"
        //        id="username"
        //        {...register("email", {
        //         required: "required",
        //         pattern: {
        //           value: /\S+@\S+\.\S+/,
        //           message: "Email is not correct",
        //         },
        //       })}
        //       error={errors.email && errors.email.message !== undefined}
        //       helperText={getErrorMessage(errors, "email")}
               
        //        />
        
        //         {/* <label htmlFor="password">Password</label> */}
        //         <TextField type="password"
        //          placeholder="Password" 
        //          id="password"
        //          autoComplete="current-password"
        //          {...register("password", {
        //            required: "required",
        //            minLength: {
        //              value: 6,
        //              message: "min length is 6",
        //            },
        //          })}
        //          error={errors.password && errors.password.message !== undefined}
        //          helperText={getErrorMessage(errors, "password")}
        //          />
        
        //          <Button className="sign-btn" type="submit">Log In</Button>
        //           <br />
        //           <br />
        //           <div className="signup-part"> 
        //           <p>Don't have an account? </p>
        //           <Link className="sign2-btn" to={"/"}>SignUp</Link>
        //           </div>
        //           {ErrorMessage}
        //         </Box>
            
        //         </div>
        //          </>
        //         )
        //         }
        
        
        
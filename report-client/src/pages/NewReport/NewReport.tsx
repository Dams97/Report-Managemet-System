import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import "./newreport.css";
import TagsInput from 'react-tagsinput'
import Layout from "../../Layout/Layout";
import { createReportAsync } from "../../app/redux/report/reportSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useForm } from "react-hook-form";
import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";


export interface Post {
  id: number;
  title: string;
  content: string;
  tags:string[];
  author: string;

}
export function NewPost(props:any){
 
  const [tags, setTags] = useState<string[]>([])

  const handleKeyDown=(e:any)=>{
       // If user did not press enter key, return
       if(e.key === ','&& e.target.value !== '') {
      //  return 
       // Get the value of the input
       const value = e.target.value
       // If the value is empty, return
       if(!value.trim()) return
       // Add the value to the tags array
       setTags([...tags, e.target.value])
       // Clear the input

       e.target.value = ''
   }
  }
   function removeTag(index: number){
    setTags([...tags.filter(tag => tags.indexOf(tag) !== index)]);

}

const { ErrorMessage, SuccessMessage } = useAppSelector(
  (state) => state.report
);
const { auth } = useAppSelector((state) => state.user);
const {
  register,
  handleSubmit,
  formState: { errors },
  reset,
} = useForm();

const navigate = useNavigate();
const dispatch = useAppDispatch();

const onSubmit = async (data: any) => {
  console.log({ auth });
  try {
    dispatch(
      createReportAsync({ ...data}, auth)
    );
    reset();
   
    // props.hide(true)
     navigate('/home')
  } catch (error) {
    
  }

};

function getErrorMessage(error: any, field: string): string {
  if (error && error[field]) return error[field].message;
  return "";
}



  return (

     <Layout >  
    <div className="newPost">
      <div className="newPost__left">
        <Box 
         component="form"
         onSubmit={handleSubmit(onSubmit)}
         noValidate
         sx={{ mt: 1 }}
        className="newPost__form" >
          
          <TextField
            className="newPost__inputTitle"
            type="text"
            id="name"
            variant="standard"
            placeholder="New Report title here..."
            required
            rows={15}
            autoComplete="name"
            autoFocus
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
            className="newPost__inputDesc"
            placeholder="Write your report content here..."
            id="content"
            type="text"
            autoComplete="content"
            variant="standard"
            InputProps={{
             disableUnderline: true,
           }}
            required
            rows={15}
            {...register("content", {
              required: "required",
              minLength: {
                value: 3,
                message: "min length is 3",
              },
            })}
            error={
              errors.content &&
              errors.content.message !== undefined
            }
            helperText={getErrorMessage(errors, "content")}
          />
               {/* <input
            className="newPost__inputTitle"
            type="text"
            name="tags"
            placeholder="tags"
            required
          /> */}
               <div className="tags-input-container">
            { tags.map((tag, index) => (
                <div className="tag-item" key={index}>
                    <span className="text">{tag}</span>
                    <span className="close" onClick={() => removeTag(index)}>&times;</span>
                </div>
            )) }
            <TextField 
            onKeyDown={handleKeyDown} type="text" 
            className="tags-input"
             placeholder="Enter some tags "
             id="tags"
             variant="standard"
             InputProps={{
              disableUnderline: true,
            }}
             required
             rows={15}
             autoComplete="tags"
             autoFocus
             {...register("tags", {
               required: "required",
               minLength: {
                 value: 3,
                 message: "min length is 3",
               },
             })}
             
             error={errors.tags && errors.tags.message !== undefined}
             helperText={getErrorMessage(errors, "tags")}
             
              />
        </div>
          <Button 
               type="submit"
      
               variant="contained"
               sx={{ mt: 3, mb: 2 }}
          className="newPost__btn">
            Publish
          </Button>
          <Typography component="h5" variant="h6" color="#f00">
              {ErrorMessage}
            </Typography>
        </Box>
      </div>

    </div>
    </Layout >  
   
    
  );
};



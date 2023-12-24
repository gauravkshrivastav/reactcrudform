import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { Link,useNavigate } from "react-router-dom";
import { Context } from '../../context/reactcontext';
import { loginpage } from '../../service/service';
import './login.css'
export const Login = () => {

  useEffect(()=>{
    setLogIn("notlogged");
  },[])

  const navigate = useNavigate();
  const [showerror, setShowError] = useState(false);
  const [urlerror, setUrlError] = useState(false);
  const { user,setUser,isloggedin, setIsLoggedIn,loginvalue,setLogIn } = useContext(Context);

  var invalid = false;

  const {register,handleSubmit, formState: { errors } } = useForm();

  console.log(">>>>>>>>errors",errors);

  console.log(">>>>>>>>errors",errors?.password?.ref?.maxLength);
  console.log(">>>>>>>>errors",errors?.password?.ref?.max);



  const handleFormData= async(data)=>{ 
  console.log(">>>>>>>>data",data);

      var response = await loginpage(data);
      console.log(">>>>",response);
      if(response.message != "Network Error"){
        if(response.data[0]){
          if(response.data[0].password == data.password){
              sessionStorage.setItem("id",response.data[0].id);
              if(response.data[0].admin_privilleged == "yes"){
                navigate("./admindashboard");
                sessionStorage.setItem("admin","yes");
                setLogIn("yes");
              } else {
                navigate("./userdashboard");
                sessionStorage.setItem("admin","no");
                setLogIn("no");
              }
          } else {
            setShowError(true);
          }
        } else {
          setShowError(true);
        }
      } else if(response.message == "Network Error") {
        setUrlError(true);
      }
  };

  return (
    <>
    <div className="form_cont">
      <div className="login_form">
        <h4 className="login_head">User/Admin Login</h4>
        <form onSubmit={handleSubmit(handleFormData)}>
            <div className="pwd_cont">
              <label>Email<span className="star">*</span></label>
              <input className="form-control" type="email" {...register("email", { required: true})} />
                  {errors.email?.type === 'required' && <p role="alert" className="star">email is required</p>}
            </div>
           
           <div className="pwd_cont">
            <label>Password<span className="star">*</span></label>
            <input className="form-control" type="password" {...register("password", { required: true, minLength: 10})} />
                {errors.password?.type === 'required' ? <p role="alert" className="star">password is required</p> :""}
                {errors.password?.type === 'minLength' ? <p role="alert" className="star">Min length should not be exceeded </p> : "" }

           </div>
           {showerror ? <p role="alert" className="star">Invalid crediantials</p>: ""}
           {urlerror ? <p role="alert" className="star">Some network issue</p>: ""}

           <div className="submit_cont">
              <input type="submit" value="Login" className="submitbtn"/>
           </div>
        </form>
        </div>
    </div>
    </>
  )

}
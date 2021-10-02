import React,{useRef,useContext} from 'react'
import "./login.css"
import { Link, useHistory } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { FormHelperText } from "@material-ui/core";
export default function Login() {
  // const [User,setUser]= useContext(UserContext)
  const Email=useRef()
  const Password=useRef()
  const history = useHistory();
  const formik = useFormik({
    initialValues: {
      UserName: "",
      Email: "",
      PasswordAgain: "",
      password: "",
    },

    validationSchema: yup.object({
      Password: yup
        .string()
        .max(40, "Password too long")
        .required("Please Enter your password")
        .min(6, "Password must be at least 6 charecters"),

      Email: yup
        .string()
        .email("Invalid email address")
        .required("Please Enter Email Address"),
    }),

    onSubmit: (userInfo) => {
    
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userInfo),
      };
      fetch("http://localhost:5000/api/v1/admin/login", requestOptions)
        .then(response => response.json())
        .then(async (data) => {
          if (data.error) {
            document.getElementById("error").innerHTML = data.error;
          } else {
            localStorage.setItem("token",JSON.stringify(data.jwt))
            localStorage.setItem("adminData",JSON.stringify({userData:data.user}))
            history.push("/")
          }
        });
    },
  });
    return (
      <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
        <img className="home-image" src="/assets/Theme-image.svg" />
          {/* <h3 className="loginLogo">Singram</h3> */}
          <span className="loginDesc">
            Express...Explore....
          </span>
        </div>
        <div className="loginRight">
        
        <form  onSubmit={formik.handleSubmit} className="loginBox">
          
        <span style={{ color: "red"}} id="error"></span>
            <input placeholder="Email" {...formik.getFieldProps("Email")} ref={Email} className="loginInput" />
            <FormHelperText>
                  {formik.touched.Email && formik.errors.Email ? (
                    <span style={{ color: "red" }}>{formik.errors.Email}</span>
                  ) : (
                    <span>We'll never share your email. </span>
                  )}
                </FormHelperText>
            <input type="password" placeholder="Password" ref={Password} {...formik.getFieldProps("Password")} className="loginInput" />
            <FormHelperText>
                  {formik.touched.Password && formik.errors.Password ? (
                    <span style={{ color: "red" }}>
                      {formik.errors.Password}
                    </span>
                  ) : (
                    <span>Enter Your Password</span>
                  )}
                </FormHelperText>
            <button type="submit" className="loginButton">Log In</button>
            <span className="loginForgot">Forgot Password?</span>
            {/* <button className="loginRegisterButton" type="submit">
              Create a New Account
            </button> */}
            <div className="links">

<Link to="/signup">
Don't have an account? sign up</Link>
</div>
          
          </form>
          
        </div>
      </div>
    </div>
    )
}

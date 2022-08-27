import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Messages from "./Messages";
import Loader from "./Loader";
import NavBar from "./NavBar/NavBar";
import Auth from "../Auth/Auth";

export default function Login() {
  Auth();
  const navigate = useNavigate();
  var Token = false;
  if (localStorage.getItem("Token")) {
    Token = JSON.parse(localStorage.getItem("Token"));
  }
  const [email, setEmail] = useState("");
  const [emailAlready, setEmailAlready] = useState("");
  const [password, setPassword] = useState("");
  const [passwordAlready, setPasswordAlready] = useState("");
  const [loader, setLoader] = useState("");
  const [message, setMessage] = useState("");
  const [color, setColor] = useState("");
  const [body, setBody] = useState("");
  const [emailInputClassName, setEmailInputClassName] =
    useState("form-control");
  const [emailFeedback, setEmailFeedback] = useState("");
  const [emailFeedbackClassName, setEmailFeedbackClassName] = useState("");
  const [passwordInputClassName, setPasswordInputClassName] =
    useState("form-control");
  const [passwordFeedback, setPasswordFeedback] = useState("");
  const [passwordFeedbackClassName, setPasswordFeedbackClassName] =
    useState("");
  const [inputTypePassword, setInputTypePassword] = useState("password");
  const [typePasswordClassName, setTypePasswordClassName] =
    useState("fa fa-eye-slash");
  const changeInputType = () => {
    if (inputTypePassword === "password") {
      setInputTypePassword("text");
      setTypePasswordClassName("fa fa-eye");
    }
    if (inputTypePassword === "text") {
      setInputTypePassword("password");
      setTypePasswordClassName("fa fa-eye-slash");
    }
  };
  const validateEmail = (email) => {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  };
  const validatePassword = (password) => {
    return password.match(/^[A-Za-z]\w{5,10}$/);
  };
  const emailInputFeild = () => {
    if (email !== "") {
      if (email !== emailAlready) {
        if (validateEmail(email)) {
          setEmailInputClassName("form-control is-valid");
          setEmailFeedback("Looks good!");
          setEmailFeedbackClassName("valid-feedback");
        } else {
          setEmailInputClassName("form-control is-invalid");
          setEmailFeedback("Please enter a valid email");
          setEmailFeedbackClassName("invalid-feedback");
        }
      } else {
        setEmailInputClassName("form-control is-invalid");
        setEmailFeedback(emailAlready + " not found!");
        setEmailFeedbackClassName("invalid-feedback");
      }
    }
  };
  const passwordInputFeild = () => {
    if (password !== "") {
      if (password !== passwordAlready) {
        if (password !== email) {
          if (validatePassword(password)) {
            setPasswordInputClassName("form-control is-valid");
            setPasswordFeedback("Looks good!");
            setPasswordFeedbackClassName("valid-feedback");
          } else {
            setPasswordInputClassName("form-control is-invalid");
            setPasswordFeedback("Enter 6 digit password");
            setPasswordFeedbackClassName("invalid-feedback");
          }
        } else {
          setPasswordInputClassName("form-control is-invalid");
          setPasswordFeedback("Password is not be your email!");
          setPasswordFeedbackClassName("invalid-feedback");
        }
      } else {
        setPasswordInputClassName("form-control is-invalid");
        setPasswordFeedback("Incorrect Password!");
        setPasswordFeedbackClassName("invalid-feedback");
      }
    }
  };
  const submit = async (e) => {
    setInputTypePassword("password");
    setTypePasswordClassName("fa fa-eye-slash");
    emailInputFeild();
    passwordInputFeild();
    e.preventDefault();
    if (!email || !password) {
      alert("Please fill all the fields");
    } else {
      if (
        emailFeedback === "Looks good!" &&
        passwordFeedback === "Looks good!"
      ) {
        const data = {
          email: email,
          password: password,
        };
        await axios({
          url: "http://localhost:5000/auth/login",
          method: "POST",
          data: data,
        })
          .then((res) => {
            if (res.data.access_token) {
              localStorage.setItem(
                "Token",
                JSON.stringify(res.data.access_token)
              );
              localStorage.setItem("user", JSON.stringify(res.data.user));
              setMessage("show");
              setColor("text-success");
              setBody("Login Successfully!");
              setTimeout(() => {
                setLoader("show");
              }, 300);
              setTimeout(() => {
                navigate("/dashboard");
              }, 1500);
            }
          })
          .catch((error) => {
            if (error.response) {
              if (error.response.data.error === "email") {
                setPassword("");
                setPasswordInputClassName("form-control");
                setPasswordFeedback("");
                setPasswordFeedbackClassName("");
                setEmailAlready(error.response.data.email);
                setEmailInputClassName("form-control is-invalid");
                setEmailFeedback(error.response.data.message + "!");
                setEmailFeedbackClassName("invalid-feedback");
              }
              if (error.response.data.error === "password") {
                setPasswordAlready(error.response.data.password);
                setPasswordInputClassName("form-control is-invalid");
                setPasswordFeedback("Incorrect Password!");
                setPasswordFeedbackClassName("invalid-feedback");
              }
            }
          });
      } else {
        emailInputFeild();
        passwordInputFeild();
      }
    }
  };
  useEffect(() => {
    emailInputFeild();
    passwordInputFeild();
    if (Token) {
      navigate("/dashboard");
    }
  }, [email, password, emailAlready, passwordAlready, Token]);
  if (!Token) {
    return (
      <>
        <NavBar />
        <div className="container-fluid mt-5">
          <div className="row">
            <div className="col-lg-4 col-md-4 col-sm-12"></div>
            <div className="col-lg-4 col-md-4 col-sm-12">
              <form
                onSubmit={submit}
                className="bg-color shadow p-lg-5 p-md-4 p-sm-3 p-2"
              >
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email address
                  </label>
                  <input
                    type="email"
                    className={emailInputClassName}
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      emailInputFeild();
                    }}
                    id="emailValidation"
                    aria-describedby="emailValidation"
                    autoComplete="true"
                    required
                  />
                  <div
                    id="emailValidationFeedback"
                    className={emailFeedbackClassName}
                  >
                    {emailFeedback}
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <div className="input-group">
                    <input
                      type={inputTypePassword}
                      className={passwordInputClassName}
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        passwordInputFeild();
                      }}
                      id="passwordValidation"
                      aria-describedby="passwordValidation"
                      autoComplete="true"
                      required
                    />
                    <span className="input-group-text">
                      <i
                        className={typePasswordClassName}
                        onClick={changeInputType}
                      ></i>
                    </span>
                    <div
                      id="passwordValidationFeedback"
                      className={passwordFeedbackClassName}
                    >
                      {passwordFeedback}
                    </div>
                  </div>
                </div>
                <button type="submit" className="btn btn-primary">
                  Login
                </button>
              </form>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-12"></div>
          </div>
        </div>
        {message === "show" ? <Messages body={body} color={color} /> : ""}
        {loader === "show" ? <Loader /> : ""}
      </>
    );
  }
}

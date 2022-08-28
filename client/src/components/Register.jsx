import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Messages from "./Messages";
import Loader from "./Loader";
import NavBar from "./NavBar/NavBar";
import Auth from "../Auth/Auth"

export default function Register() {
  Auth();
  const navigate = useNavigate();
  var Token = false;
  if (localStorage.getItem("Token")) {
    Token = JSON.parse(localStorage.getItem("Token"));
  }
  const [name, setName] = useState("");
  const [nameAlready, setNameAlready] = useState("");
  const [email, setEmail] = useState("");
  const [emailAlready, setEmailAlready] = useState("");
  const [password, setPassword] = useState("");
  const [passwordAlready, setPasswordAlready] = useState("");
  const [loader, setLoader] = useState("");
  const [message, setMessage] = useState("");
  const [color, setColor] = useState("");
  const [body, setBody] = useState("");
  const [nameInputClassName, setNameInputClassName] = useState("form-control");
  const [nameFeedback, setNameFeedback] = useState("");
  const [nameFeedbackClassName, setNameFeedbackClassName] = useState("");
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
  const validateName = (name) => {
    name.match(/\d+/g);
    var matches = name.match(/\d+/g);
    if (matches === null) {
      return name.match(/^[a-zA-Z]\w{2,10}$/);
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
  const nameInputFeild = () => {
    if (name !== "") {
      if (name !== nameAlready) {
        if (validateName(name)) {
          setNameInputClassName("form-control is-valid");
          setNameFeedback("Looks good!");
          setNameFeedbackClassName("valid-feedback");
        } else {
          setNameInputClassName("form-control is-invalid");
          setNameFeedback("Please enter a valid username");
          setNameFeedbackClassName("invalid-feedback");
        }
      } else {
        setNameInputClassName("form-control is-invalid");
        setNameFeedback(nameAlready + " is already taken!");
        setNameFeedbackClassName("invalid-feedback");
      }
    }
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
        setEmailFeedback(emailAlready + " is already taken!");
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
        setPasswordFeedback("Password is already taken!");
        setPasswordFeedbackClassName("invalid-feedback");
      }
    }
  };
  const submit = async (e) => {
    nameInputFeild();
    emailInputFeild();
    passwordInputFeild();
    e.preventDefault();
    if (!email || !password) {
      alert("Please fill all the fields");
    } else {
      if (
        nameFeedback === "Looks good!" &&
        emailFeedback === "Looks good!" &&
        passwordFeedback === "Looks good!"
      ) {
        const data = {
          name: name,
          email: email,
          password: password,
        };
        await axios({
          url: "https://react-nest-auth.herokuapp.com/user/add",
          method: "POST",
          data: data,
        })
          .then((res) => {
            if (res.data._id) {
              setMessage("show");
              setColor("text-success");
              setBody("Register Successfully!");
              setTimeout(() => {
                setLoader("show");
              }, 300);
              setTimeout(() => {
                navigate("/login");
              }, 1500);
            }
          })
          .catch((error) => {
            if (error.response) {
              if (error.response.data.keyValue.name) {
                setNameAlready(error.response.data.keyValue.name);
                nameInputFeild();
              }
              if (error.response.data.keyValue.email) {
                setEmailAlready(error.response.data.keyValue.email);
                emailInputFeild();
              }
              if (error.response.data.keyValue.password) {
                setPasswordAlready(error.response.data.keyValue.password);
                passwordInputFeild();
              }
            }
          });
      } else {
        nameInputFeild();
        emailInputFeild();
        passwordInputFeild();
      }
    }
  };
  useEffect(() => {
    nameInputFeild();
    emailInputFeild();
    passwordInputFeild();
    if (Token) {
      navigate("/dashboard");
    }
  }, [
    name,
    email,
    password,
    nameAlready,
    emailAlready,
    passwordAlready,
    Token,
  ]);
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
                  <label htmlFor="name" className="form-label">
                    Username
                  </label>
                  <input
                    type="text"
                    className={nameInputClassName}
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      nameInputFeild();
                    }}
                    id="nameValidation"
                    aria-describedby="nameValidation"
                    autoComplete="true"
                    required
                  />
                  <div
                    id="nameValidationFeedback"
                    className={nameFeedbackClassName}
                  >
                    {nameFeedback}
                  </div>
                </div>
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
                      {passwordFeedback === "Enter 6 digit password" ? (
                        <>
                          {passwordFeedback}
                          <ul>
                            <li>First character must be an alphabet</li>
                            <li>Password must include alphabets & numbers</li>
                            <li>No character allowed</li>
                          </ul>
                        </>
                      ) : (
                        <>{passwordFeedback}</>
                      )}
                    </div>
                  </div>
                </div>
                <button type="submit" className="btn btn-primary">
                  Register
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

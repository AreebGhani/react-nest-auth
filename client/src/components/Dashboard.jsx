import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import userImg from "../assest/img/user.png";
import NavBar from "./NavBar/NavBar";
import Auth from "../Auth/Auth";
import axios from "axios";
import Messages from "./Messages";
import Loader from "./Loader";

export default function Dashboard() {
  Auth();
  const navigate = useNavigate();
  var Token = false;
  if (localStorage.getItem("Token")) {
    Token = JSON.parse(localStorage.getItem("Token"));
  }
  const user = JSON.parse(localStorage.getItem("user"));
  const [name, setName] = useState(user.name);
  const [nameAlready, setNameAlready] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [emailAlready, setEmailAlready] = useState(user.email);
  const [password, setPassword] = useState(user.password);
  const [passwordAlready, setPasswordAlready] = useState(user.password);
  const [loader, setLoader] = useState("");
  const [message, setMessage] = useState("");
  const [color, setColor] = useState("");
  const [body, setBody] = useState("");
  const [uploadInput, setUploadInput] = useState("uploadInput");
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
      }
    }
  };
  const nameAlreadyInputFeild = () => {
    if (name !== nameAlready) {
      setNameInputClassName("form-control is-valid");
      setNameFeedback("Looks good!");
      setNameFeedbackClassName("valid-feedback");
    } else {
      setNameInputClassName("form-control is-invalid");
      setNameFeedback(nameAlready + " is already same!");
      setNameFeedbackClassName("invalid-feedback");
    }
  };
  const emailAlreadyInputFeild = () => {
    if (email !== emailAlready) {
      setEmailInputClassName("form-control is-valid");
      setEmailFeedback("Looks good!");
      setEmailFeedbackClassName("valid-feedback");
    } else {
      setEmailInputClassName("form-control is-invalid");
      setEmailFeedback(emailAlready + " is already same!");
      setEmailFeedbackClassName("invalid-feedback");
    }
  };
  const passwordAlreadyInputFeild = () => {
    if (password !== passwordAlready) {
      setPasswordInputClassName("form-control is-valid");
      setPasswordFeedback("Looks good!");
      setPasswordFeedbackClassName("valid-feedback");
    } else {
      setPasswordInputClassName("form-control is-invalid");
      setPasswordFeedback("Password is already same!");
      setPasswordFeedbackClassName("invalid-feedback");
    }
  };
  var img = null;
  const getImg = (target) => {
    img = target.files[0];
  };
  const submit = async (e) => {
    nameInputFeild();
    emailInputFeild();
    passwordInputFeild();
    e.preventDefault();
    if (
      name !== nameAlready ||
      email !== emailAlready ||
      password !== passwordAlready ||
      uploadInput === ""
    ) {
      if (!email || !password || !img) {
        alert("Please fill all the fields");
      } else {
        if (
          nameFeedback === "Looks good!" ||
          emailFeedback === "Looks good!" ||
          passwordFeedback === "Looks good!" ||
          uploadInput === ""
        ) {
          const data = {
            name: name,
            email: email,
            password: password,
            img: img,
          };
          await axios({
            url: `http://localhost:5000/user/update/${user._id}`,
            method: "PATCH",
            headers: {
              accept: "application/json",
              "Accept-Language": "en-US,en;q=0.8",
              "Content-Type": "multipart/form-data",
            },
            data: data,
          })
            .then((res) => {
              if (res.data._id) {
                localStorage.setItem("user", JSON.stringify(res.data));
                setLoader("show");
                setTimeout(() => {
                  setUploadInput("uploadInput");
                  setMessage("show");
                  setColor("text-success");
                  setBody("Updated Successfully!");
                }, 300);
                setTimeout(() => {
                  setLoader("");
                  setMessage("");
                  window.location.reload();
                }, 1000);
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
    } else {
      nameAlreadyInputFeild();
      emailAlreadyInputFeild();
      passwordAlreadyInputFeild();
    }
  };
  const inputImg = useRef(null);
  const uploadImg = () => {
    inputImg.current.click();
    setUploadInput("");
  };
  useEffect(() => {
    setName(user.name);
    setNameAlready(user.name);
    setEmail(user.email);
    setEmailAlready(user.email);
    setPassword(user.password);
    setPasswordAlready(user.password);
  }, [message, loader]);
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
  useEffect(() => {
    if (!Token) {
      navigate("/login");
    }
  }, [Token]);
  if (Token) {
    return (
      <>
        <NavBar />
        <div className="container rounded bg-color mt-3">
          <div className="row">
            <div className="col-md-4 border-end border-dark">
              <div className="d-flex flex-column align-items-center text-center p-3 py-5">
                <img
                  src={
                    user.img !== ""
                      ? `http://localhost:5000/user/img/${user._id}`
                      : userImg
                  }
                  className="rounded-circle mt-5"
                  width="150px"
                  alt={user.name}
                  onClick={uploadImg}
                />
                <b className="text-capitalize">{user.name}</b>
                <p>{user.email}</p>
                <span> </span>
              </div>
            </div>
            <div className="col-md-6 border-right">
              <form
                onSubmit={submit}
                className="p-3 py-5"
                encType="multipart/form-data"
              >
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h4 className="text-right">Settings</h4>
                </div>
                <div className="row mt-3">
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
                </div>
                <div className={uploadInput}>
                  <label>
                    <b>Upload Image: </b>
                  </label>
                  <span className="px-2"></span>
                  <input
                    type="file"
                    id="img"
                    name="img"
                    onChange={({ target }) => getImg(target)}
                    ref={inputImg}
                    accept=".jpg,.jpeg,.png"
                  />
                </div>
                <div className="mt-4 text-center">
                  <button
                    className="btn btn-primary profile-button"
                    type="submit"
                  >
                    Update Profile
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        {message === "show" ? <Messages body={body} color={color} /> : ""}
        {loader === "show" ? <Loader /> : ""}
      </>
    );
  }
}

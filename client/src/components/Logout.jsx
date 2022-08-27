import React from "react";
import { useNavigate } from "react-router-dom";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";
import NavBar from "./NavBar/NavBar";
import Auth from "../Auth/Auth";

export default function Logout() {
  Auth();
  const navigate = useNavigate();
  const logout = () => {
    if (localStorage.getItem("Theme")) {
      const Theme = JSON.parse(localStorage.getItem("Theme"));
      sessionStorage.setItem("Theme", JSON.stringify(Theme));
    }
    localStorage.clear();
    if (sessionStorage.getItem("Theme")) {
      const Theme = JSON.parse(sessionStorage.getItem("Theme"));
      localStorage.setItem("Theme", JSON.stringify(Theme));
    }
    sessionStorage.clear();
    navigate("/login");
  };
  const goBack = () => {
    navigate(-1);
  };
  return (
    <>
      <NavBar />
      <ToastContainer className="p-3 mt-5 pt-5" position="top-center">
        <div className="mt-5 pt-5">
          <Toast>
            <Toast.Body className="bg-color">
              <h4>
                <b className="text-warning">Do you want to logout?</b>
              </h4>
              <div className="text-end">
                <button
                  onClick={logout}
                  type="button"
                  className="btn text-color"
                >
                  <b>Yes</b>
                </button>
                <button
                  onClick={goBack}
                  type="button"
                  className="btn text-color"
                >
                  <b>No</b>
                </button>
              </div>
            </Toast.Body>
          </Toast>
        </div>
      </ToastContainer>
    </>
  );
}

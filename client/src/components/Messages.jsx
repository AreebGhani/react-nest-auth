import React from "react";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";

export default function Messages({ body, color }) {
  return (
    <>
      <ToastContainer className="p-3" position="bottom-end">
        <Toast>
          <Toast.Body className="bg-color">
            <b className={color}>{body}</b>
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  );
}

import React, { useEffect, useState } from "react";
import Auth from "../Auth/Auth";
import NavBar from "./NavBar/NavBar";
import Loader from "./Loader";
import axios from "axios";
import userImg from "../assest/img/user.png";

export default function Home() {
  Auth();
  const [users, setUsers] = useState([]);
  const [load, setLoad] = useState("loading");
  const fetchUsers = async () => {
    try {
      const { data } = await axios({
        url: "http://localhost:5000/user",
        method: "GET",
      });
      if (!data.users) {
        console.log("No Users Yet");
        console.log(data);
      } else {
        setUsers(data.users);
        setLoad("No User Yet");
      }
    } catch (error) {
      alert("Something went wrong");
      console.log("Error: ", error);
    }
  };
  useEffect(() => {
    fetchUsers();
  }, []);
  return (
    <>
      <NavBar />
      <div className="container mt-4">
        <div className="row justify-content-center">
          <div className="col-12 col-sm-8 col-lg-6">
            <div className="text-center">
              <h3>
                <u>Our Users</u>
              </h3>
            </div>
          </div>
        </div>
        <div className="mt-4 row row-cols-1 row-cols-sm-2 row-cols-md-4 row-cols-lg-5 g-4">
          {users.length === 0 ? (
            <div>{load === "loading" ? <Loader /> : { load }}</div>
          ) : (
            users.map((user, index) => {
              return (
                <div key={index} className="col">
                  <div className="card bg-color text-color">
                    <img
                      src={
                        user.img !== ""
                          ? `http://localhost:5000/user/img/${user._id}`
                          : userImg
                      }
                      className="card-img-top"
                      alt="..."
                    />
                    <div className="card-body">
                      <p className="card-text">
                        <b className="text-capitalize">{user.name}</b> <br />
                        {user.email}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </>
  );
}

import React, { useEffect, useState } from "react";
import NavBarGuest from "./NavBarGuest";
import NavBarAuth from "./NavBarAuth";

export default function NavBar() {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const value = localStorage.getItem("Token");
    const token = !!value ? value : undefined;
    setToken(token);
  }, []);

  return <>{token ? <NavBarAuth /> : <NavBarGuest />}</>;
}

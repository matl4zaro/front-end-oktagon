import React, { useEffect, useState } from "react";
import Services from "../../services/Services";

import "./Header.css";
import logo from "./logo.png";

export default function Header() {
  const [mainTitle, setTitle] = useState("");

  useEffect(() => {
    Services.getCampaigns().then(
      (data) => setTitle(data[0].title),
      (error) => console.log(error)
    );
  }, []);

  return (
    <div className="header">
      <img
        src="https://4m4you.com/wp-content/uploads/2020/06/logo-placeholder.png"
        id="logo"
        alt="Logo"
        className="logo"
      ></img>
      <h1 id="campaign-title"> {mainTitle} </h1>
    </div>
  );
}

import { Skeleton } from "@material-ui/lab";
import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
import Services from "../../services/Services";

import "./Sidebar.css";

export default function Sidebar() {
  const [mainImage, setImage] = useState("");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    Services.getCampaigns().then(
      (data) => {
        setImage(data[0].imgUrl);
        setLoaded(true);
      },
      (error) => console.log(error)
    );
  }, []);

  // function handleClick() {
  //   Services.getCampaigns().then(
  //     (data) => setImage(data[randomInt(data.length)].imgUrl),
  //     (error) => console.log(error)
  //   );
  // }

  return (
    <div className="sidebar" id="sidebar">
      {loaded ? (
        <img
          id="campaign-image"
          alt="campaign"
          src={`${mainImage.toString()}`}
        />
      ) : (
        <Skeleton variant="circle" height="80px" />
      )}
      <ul>
        <li>
          <a href="/campaigns"> Dashboard </a>
        </li>
        <li>
          <a href="/campaigns">Campaign list</a>
        </li>
      </ul>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
var dateFormat = require("dateformat");

import { Campaign } from "../../models/campaign";
import Services from "../../services/Services";
import ActionFormModal from "../ActionFormModal/ActionFormModal";

import "./CampaignDetail.css";

export default function CampaignDetail() {
  const [campaign, setData] = useState(new Campaign());
  const [mainImage, setImage] = useState("");

  const fullPath = useLocation().pathname.toString();
  const campaignId = fullPath.split("/")[2].replace("}", "");

  useEffect(() => {
    Services.getCampaignById(campaignId).then(
      (data) => setImage(data.imgUrl),
      (error) => console.log(error)
    );
  }, []);

  useEffect(() => {
    Services.getCampaignById(campaignId).then((response: Campaign) => {
      setData(response);
    });
  }, []);

  function BuildActionsTable(props: { renderTable: boolean }) {
    if (props.renderTable) {
      return (
        <>
          <Table striped bordered hover id="action-list">
            <thead>
              <tr>
                <td>Title</td>
                <td>Description</td>
                <td>Starting at</td>
                <td>Finishing at</td>
              </tr>
            </thead>
            <tbody>
              {campaign.actions.map((action, index) => {
                return (
                  <tr key={String(index) + action.title}>
                    <td>{action.title}</td>
                    <td>{action.description}</td>
                    <td>{dateFormat(action.dateBegin, "dd-MM-yyyy")}</td>
                    <td>{dateFormat(action.dateEnd, "dd-MM-yyyy")}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
          <br />
        </>
      );
    } else {
      return (
        <>
          <i>No actions added yet.</i>
        </>
      );
    }
  }

  return (
    <div id="campaign-detail">
      <h2>{campaign.title}</h2>
      <hr />
      <div id="image-detail">
        <img alt="campaign" src={`${mainImage.toString()}`} />
      </div>
      <Link
        to={{
          pathname: `/campaign/form/${campaign._id}`,
          state: campaign,
        }}
        style={{ textDecoration: "none" }}
      >
        Edit
      </Link>
      <hr />
      <h3>Description</h3>
      <p>{campaign.description}</p>
      <hr />
      <h3>Schedule</h3>
      <p>
        {dateFormat(campaign.dateBegin, "mmm dS, yyyy") +
          " → " +
          dateFormat(campaign.dateEnd, "mmm dS, yyyy")}
      </p>
      <hr />
      <h3>Actions</h3>
      <BuildActionsTable renderTable={campaign.actions.length > 0} />
      <ActionFormModal
        campaignId={campaignId}
        type={"action"}
        oldActionList={campaign.actions}
        setData={setData}
      />
      <hr />
      <h3>Open Tasks</h3>
      {/* <TasksControl /> */}
      <hr />
    </div>
  );
}

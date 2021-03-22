import Grid from "@material-ui/core/Grid";
import Skeleton from "@material-ui/lab/Skeleton";
import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
var dateFormat = require("dateformat");

import { Campaign } from "../../models/campaign";
import Services from "../../services/Services";
import EditActionModal from "../ActionFormModal/EditActionModal/EditActionModal";
import NewActionModal from "../ActionFormModal/NewActionModal/NewActionModal";

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
    Services.getCampaignById(campaignId).then((response: Campaign) => {
      setData(response);
    });
  }, []);

  function CampaignCardInfo(props: { renderTable: boolean }) {
    if (props.renderTable) {
      return (
        <>
          <Table striped bordered hover id="action-list">
            <thead>
              <tr>
                <td>
                  <strong>Title</strong>
                </td>
                <td>
                  <strong>Description</strong>
                </td>
                <td>
                  <strong>Starting at</strong>
                </td>
                <td>
                  <strong>Finishing at</strong>
                </td>
                <td></td>
              </tr>
            </thead>
            <tbody>
              {campaign.actions.map((action, index) => {
                return (
                  <tr key={String(index) + action.title}>
                    <td>{action.title}</td>
                    <td>{action.description}</td>
                    <td>{dateFormat(action.dateBegin, "dd-mm-yyyy")}</td>
                    <td>{dateFormat(action.dateEnd, "dd-mm-yyyy")}</td>
                    <td>
                      <EditActionModal
                        campaignId={campaignId}
                        actualActionList={campaign.actions}
                        index={index}
                        setData={setData}
                      />
                    </td>
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
      <Grid container spacing={3}>
        <Grid item xs={5}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <h2 id="title-detail">{campaign.title}</h2>
            </Grid>
            <Grid item xs={12}>
              <hr />
              <h3>Description</h3>
              <p>{campaign.description}</p>
            </Grid>
            <Grid item xs={12}>
              <hr />
              <h3>Schedule</h3>
              <p>
                {dateFormat(campaign.dateBegin, "mmm dS, yyyy") +
                  " → " +
                  dateFormat(campaign.dateEnd, "mmm dS, yyyy")}
              </p>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={7} id="image-detail">
          {mainImage ? (
            <img alt="campaign" src={`${mainImage.toString()}`} />
          ) : (
            <Skeleton variant="rect" width="120px" />
          )}
        </Grid>
      </Grid>
      {/* <Link
        to={{
          pathname: `/campaign/form/${campaign._id}`,
          state: campaign,
        }}
        style={{ textDecoration: "none" }}
      >
        Edit
      </Link> */}
      <hr />
      <h3>Actions</h3>
      <CampaignCardInfo renderTable={campaign.actions.length > 0} />
      <NewActionModal
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

import React, { useEffect, useState } from "react";

import { Alert, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import { PencilAlt, Trash } from "heroicons-react";
var dateFormat = require("dateformat");
import { Skeleton } from "@material-ui/lab";

import { Campaign } from "../../models/campaign";

import Services from "../../services/Services";
import "./CampaignList.css";

const CampaignList = () => {
  const listOfElements: Campaign[] = [];

  const [loaded, setLoaded] = useState(false);

  const [campaigns, fillCampaigns] = useState(listOfElements);

  useEffect(() => {
    Services.getCampaigns().then((response: Campaign[]) => {
      fillCampaigns(response);
      setLoaded(true);
    });
  }, []);

  function handleDelete(id: string) {
    if (window.confirm("Are you sure to delete this item?")) {
      Services.deleteCampaignById(id).then(
        (response) => {
          alert("Campaign removed with success!");
        },
        (error) => {
          alert("There is some error");
        }
      );
    } else {
      alert("Remove canceled!");
    }
  }

  function tableContent() {
    return campaigns.map((campaign) => {
      return (
        <tr key={campaign._id}>
          <td>
            <Link
              to={{
                pathname: `/campaign/${campaign._id}}`,
                state: campaign,
              }}
              style={{ textDecoration: "none", color: "black" }}
            >
              {campaign.title}
            </Link>
          </td>
          <td>{dateFormat(campaign.dateBegin, "mmmm dS, yyyy")}</td>
          <td>{dateFormat(campaign.dateEnd, "mmmm dS, yyyy")}</td>
          <td>
            {/* <Link
              // to={{ pathname: `/campaign/form/${campaign._id}` }}
              style={{ textDecoration: "none", color: "black" }}
            > */}
            <PencilAlt size={12} />
            {/* </Link> */}
          </td>
          <td>
            {/* <Link
              to="/campaign"
              style={{ textDecoration: "none", color: "black" }}
            > */}
            <Trash size={12} onClick={() => handleDelete(campaign._id)} />
            {/* </Link> */}
          </td>
        </tr>
      );
    });
  }

  const FullTable = () => {
    return (
      <div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Title</th>
              <th>Begin</th>
              <th>End</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {loaded ? (
              tableContent()
            ) : (
              <tr>
                <td>
                  <Skeleton variant="rect" width="120px" />
                </td>
                <td>
                  <Skeleton variant="rect" width="120px" />
                </td>
                <td>
                  <Skeleton variant="rect" width="120px" />
                </td>
                <td>
                  <Skeleton variant="rect" />
                </td>
                <td>
                  <Skeleton variant="rect" />
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    );
  };

  return (
    <div id="campaign-list">
      <div className="component-header">
        <h2>Campaigns</h2>
        <Link to="/new/campaign">
          <Button variant="contained" color="primary">
            Create new Campaign
          </Button>
        </Link>
      </div>

      {<FullTable />}
    </div>
  );
};

export default CampaignList;

import React, { useEffect, useState } from "react";

import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Button, Snackbar } from "@material-ui/core";
import { PencilAlt, Trash } from "heroicons-react";
var dateFormat = require("dateformat");
import { Skeleton } from "@material-ui/lab";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

// import {
//   DataGrid,
//   GridColDef,
//   ValueGetterParams,
// } from "@material-ui/data-grid";

import { Campaign } from "../../models/campaign";

import Services from "../../services/Services";
import "./CampaignList.css";
import ConfirmDialog from "./ConfirmDialog";

const useStylesAlert = makeStyles((theme: Theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

function CustomAlert(props: AlertProps) {
  return <MuiAlert elevation={5} {...props} />;
}

export default function CampaignList() {
  const listOfElements: Campaign[] = [];

  const [loaded, setLoaded] = useState(false);
  const [openAlertSuccess, setAlertSuccess] = useState(false);
  const [openAlertError, setAlertError] = useState(false);
  const [openAlertCancel, setAlertCancel] = useState(false);
  // const [deleteControl, confirmDelete] = useState(false);
  // const [openConfirmDialog, setConfirmDialog] = useState(false);

  const [campaigns, fillCampaigns] = useState(listOfElements);

  const alertStyles = useStylesAlert();

  const handleSuccess = () => {
    setAlertSuccess(true);
  };
  const handleError = () => {
    setAlertError(true);
  };
  const handleCancel = () => {
    setAlertCancel(true);
  };

  const handleCloseAlert = () => {
    setAlertError(false);
    setAlertSuccess(false);
    setAlertCancel(false);
  };

  useEffect(() => {
    Services.getCampaigns().then((response: Campaign[]) => {
      fillCampaigns(response);
      setLoaded(true);
    });
  }, []);

  const AlertConfig = () => {
    return (
      <div className={alertStyles.root}>
        <Snackbar
          open={openAlertSuccess}
          autoHideDuration={3000}
          onClose={handleCloseAlert}
        >
          <CustomAlert onClose={handleCloseAlert} severity="success">
            Campaign removed with success!
          </CustomAlert>
        </Snackbar>
        <Snackbar
          open={openAlertError}
          autoHideDuration={3000}
          onClose={handleCloseAlert}
        >
          <CustomAlert onClose={handleCloseAlert} severity="warning">
            Campaign removal went wrong, please try again!
          </CustomAlert>
        </Snackbar>
        <Snackbar
          open={openAlertCancel}
          autoHideDuration={3000}
          onClose={handleCloseAlert}
        >
          <CustomAlert onClose={handleCloseAlert} severity="info">
            Removal canceled!
          </CustomAlert>
        </Snackbar>
      </div>
    );
  };

  function handleDelete(id: string) {
    // function handleDelete(id: string, confirmation: boolean) {
    // setConfirmDialog(true); FIXME: Correction needed, to use custom confirm dialog
    // if (confirmation) {
    if (window.confirm("Are you sure to delete this item?")) {
      Services.deleteCampaignById(id).then(
        (response) => {
          handleSuccess();
          Services.getCampaigns().then((response: Campaign[]) => {
            fillCampaigns(response);
            setLoaded(true);
          });
        },
        (error) => {
          handleError();
        }
      );
    } else {
      handleCancel();
    }
  }

  function deleteDialog(id: string) {
    // handleDelete(id, deleteControl);
    handleDelete(id);
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
            <Trash size={12} onClick={() => deleteDialog(campaign._id)} />
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
      <FullTable />
      <AlertConfig />
      {/* <ConfirmDialog
        confirmDelete={confirmDelete}
        setConfirmDialog={setConfirmDialog}
        openConfirmDialog={openConfirmDialog}
      /> */}
      ;
    </div>
  );
}

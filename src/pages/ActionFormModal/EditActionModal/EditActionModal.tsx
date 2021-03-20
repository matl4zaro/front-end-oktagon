import React from "react";
import { useForm } from "react-hook-form";
import { Form } from "react-bootstrap";
import { Button, ButtonGroup, Snackbar } from "@material-ui/core";
import Modal from "@material-ui/core/Modal";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

import "./EditActionModal.css";
import { Action } from "../../../models/action";
import { Campaign } from "../../../models/campaign";
import Services from "../../../services/Services";
import { PencilAlt } from "heroicons-react";

const useStylesModal = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      display: "block",
      margin: "auto",
      marginTop: "3rem",
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: "2px solid #000",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  })
);

const useStylesAlert = makeStyles((theme: Theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

function Alert(props: AlertProps) {
  return <MuiAlert elevation={5} {...props} />;
}

interface IEditAction {
  campaignId: string;
  actualActionList: Action[];
  index: number;
  setData(refresh: Campaign): void;
}

export default function EditActionModal(props: IEditAction) {
  const modalStyles = useStylesModal();
  const alertStyles = useStylesAlert();

  const { register, handleSubmit, errors } = useForm();
  const [openModal, setOpenModal] = React.useState(false);
  const [openAlertSuccess, setOpenAlertSuccess] = React.useState(false);
  const [openAlertError, setOpenAlertError] = React.useState(false);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleSuccess = () => {
    setOpenAlertSuccess(true);
  };

  const handleError = () => {
    setOpenAlertError(true);
  };

  const handleCloseAlert = () => {
    setOpenAlertError(false);
    setOpenAlertSuccess(false);
  };

  const onSubmit = async (data: any) => {
    props.actualActionList[props.index] = {
      title: String(data.title),
      description: String(data.description),
      dateBegin: props.actualActionList[props.index].dateBegin,
      dateEnd: props.actualActionList[props.index].dateEnd,
    };

    let editedList = props.actualActionList;

    Services.createActions(editedList, props.campaignId).then(
      () => {
        handleSuccess();
        handleCloseModal();
        Services.getCampaignById(props.campaignId).then(
          (response: Campaign) => {
            props.setData(response);
          }
        );
      },
      () => handleError()
    );
  };

  const actionForm = (
    <div className={modalStyles.paper}>
      <h3 className="form-title"> ADD AN ACTION </h3>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group controlId="title">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Action's title"
            ref={register({ required: true })}
            name="title"
            defaultValue={props.actualActionList[props.index].title}
          />
        </Form.Group>
        <Form.Group controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            placeholder="Write the description of the Campaign"
            ref={register({ required: true })}
            name="description"
            defaultValue={props.actualActionList[props.index].description}
          />
        </Form.Group>
        <ButtonGroup>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => handleCloseModal()}
          >
            Cancel
          </Button>
          <Button variant="contained" color="primary" type="submit">
            Save Edited Action
          </Button>
        </ButtonGroup>
      </Form>
    </div>
  );

  const AlertConfig = () => {
    return (
      <div className={alertStyles.root}>
        <Snackbar
          open={openAlertSuccess}
          autoHideDuration={3000}
          onClose={handleCloseAlert}
        >
          <Alert onClose={handleCloseAlert} severity="success">
            Action added successfully!
          </Alert>
        </Snackbar>
        <Snackbar
          open={openAlertError}
          autoHideDuration={3000}
          onClose={handleCloseAlert}
        >
          <Alert onClose={handleCloseAlert} severity="error">
            Sorry, some error just happened. Please, try again.
          </Alert>
        </Snackbar>
      </div>
    );
  };

  return (
    <div>
      <PencilAlt size={12} onClick={handleOpenModal} />
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {actionForm}
      </Modal>
      <AlertConfig />
    </div>
  );
}

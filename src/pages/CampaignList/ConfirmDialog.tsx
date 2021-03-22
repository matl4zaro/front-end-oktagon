import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Trash } from "heroicons-react";

interface IConfirmDialog {
  confirmDelete(confirmation: boolean): void;
  setConfirmDialog(open: boolean): void;
  openConfirmDialog: boolean;
}

export default function ConfirmDialog(props: IConfirmDialog) {
  const [maintainOpen, setCloseConfirmDialog] = useState(true);

  function handleClose(option: string) {
    if (option === "confirm") {
      props.confirmDelete(true);
      setCloseConfirmDialog(false);
    } else {
      props.confirmDelete(false);
      setCloseConfirmDialog(false);
    }
  }

  return (
    <div>
      <Dialog
        open={props.openConfirmDialog && maintainOpen}
        onClose={() => handleClose("cancel")}
        aria-labelledby="title"
        aria-describedby="description"
      >
        <DialogTitle id="title">Confirm delete action?</DialogTitle>
        <DialogContent>
          <DialogContentText id="description">
            This action is irreversible.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose("cancel")} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => handleClose("confirm")}
            color="primary"
            autoFocus
          >
            <Trash /> Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

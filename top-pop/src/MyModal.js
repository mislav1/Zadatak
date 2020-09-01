import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

function MyModal(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [modalStyle] = useState(getModalStyle);

  const handleClose = () => {
    setOpen(false);
  }

  const handleOpen = () => {
    setOpen(true);
  }

  return (
    <div className="modal" id="modal">
      <Button
        fullWidth={true}
        variant="outlined"
        color="primary"
        onClick={handleOpen}
      >
        {props.song.position}
        {".  "}
        {props.song.title}
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div style={modalStyle} className={classes.paper}>
          <h2 id="simple-modal-title">Song details</h2>
          <p id="simple-modal-description">
            Rang on list : {props.song.position}
          </p>
          <p id="simple-modal-description">Title : {props.song.title}</p>
          <p id="simple-modal-description">Artist : {props.song.artist.name}</p>
          <p id="simple-modal-description">
            Duration : {Math.floor(props.song.duration / 60)}:
            {props.song.duration % 60 < 10
              ? "0" + (props.song.duration % 60)
              : props.song.duration % 60}
          </p>
          <Button variant="outlined" color="primary" onClick={handleClose}>
            close
          </Button>
        </div>
      </Modal>
    </div>
  );
}

export default MyModal;

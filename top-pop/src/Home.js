import React, { useCallback, useState, useEffect } from "react";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import MyModal from "./MyModal";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import MusicNoteSharpIcon from "@material-ui/icons/MusicNoteSharp";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  button: {
    alignItems: "center",
  },
}));

function Home() {
  const classes = useStyles();
  const [songs, setSongs] = useState([]);
  const [, forceUpdate] = useState(true);

  useEffect(() => {
    getSongs();
  }, []);

  function getSongs() {
    doCORSRequest(
      {
        method: "GET",
        url: "https://api.deezer.com/chart",
      },
      function saveResult(result) {
        setSongs(result.tracks.data);
      }
    );
  }

  const cors_api_url = "https://cors-anywhere.herokuapp.com/";
  function doCORSRequest(options, saveResult) {
    let x = new XMLHttpRequest();
    x.open(options.method, cors_api_url + options.url);
    x.onload = x.onerror = function () {
      saveResult(JSON.parse(x.responseText));
    };
    x.send();
  }

  const handleAscending = useCallback(() => {
    setSongs(songs.sort((a, b) => (a.duration > b.duration ? 1 : -1)));
    forceUpdate((n) => !n)
  }, [songs]);

  const handleDescending = useCallback(() => {
    setSongs(songs.sort((a, b) => (a.duration < b.duration ? 1 : -1)));
    forceUpdate((n) => !n)
  }, [songs]);

  return (
    <div>
      {songs.length ? (
        <div>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
              <Avatar className={classes.avatar}>
                <MusicNoteSharpIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                TOP POP
              </Typography>
              <ButtonGroup
                className={classes.button}
                color="primary"
                aria-label="outlined primary button group"
              >
                <Button onClick={handleAscending}>Sort ascending</Button>
                <Button onClick={handleDescending}>Sort descending</Button>
              </ButtonGroup>
            </div>
          </Container>
          <Grid container spacing={1} style={{ padding: 24 }}>
            {songs.map((currentSong) => (
              <Grid item xs={12} sm={6} lg={4} xl={3} key={currentSong.id}>
                <MyModal song={currentSong} forceUpdate={forceUpdate} />
              </Grid>
            ))}
          </Grid>
        </div>
      ) : (
          "Loading..."
        )}
    </div>
  );
}

export default Home;

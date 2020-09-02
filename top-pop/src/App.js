import React, { useReducer, useEffect } from "react";
import "react-perfect-scrollbar/dist/css/styles.css";
import Home from "./Home";
import { createContext } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

function reducer(state, action) {
  switch (action.type) {
    case "sort_asc":
      return { ...state, songs: state.songs.sort((a, b) => (a.duration > b.duration ? 1 : -1)) }

    case "sort_des":
      return { ...state, songs: state.songs.sort((a, b) => (a.duration < b.duration ? 1 : -1)) }

    case "init":
      return { ...state, songs: action.songs }

    default:
      return state
  }
}

export const Context = createContext();
const initialState = { songs: [], isApiLoading: true };

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const getInitialData = () => {
    fetch("https://cors-anywhere.herokuapp.com/https://api.deezer.com/chart")
      .then(state.isApiLoading = false)
      .then(response => response.json())
      .then(data => {
        dispatch({ type: "init", songs: data.tracks.data })
      })
  }

  const sortAsc = () => {
    dispatch({ type: "sort_asc" })
  }
  const sortDes = () => {
    dispatch({ type: "sort_des" })
  }

  useEffect(() => {
    getInitialData();
  }, []);

  return (<Router>
    <Context.Provider value={{ state, sortAsc, sortDes }}>
      <Route exact path="/" component={Home} />
    </Context.Provider >
  </Router>)
}

export default App;


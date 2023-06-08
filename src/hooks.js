import React, {useState} from "react";
import axios from "axios";
import {v4 as uuid} from "uuid";

function useFlip(initialState=true) {
  const [state, setState] = useState(initialState);
  const toggleState = () => {
    setState(state => ! state)
  }
  return [state, toggleState];
};

function useAxios(url) {
  const [responses, setResponses] = useState([]);

  const addResponse = async(restOfUrl = "") => {
    const res = await axios.get(`${url}${restOfUrl}`);
    console.log(res.data)
    setResponses(responses => [...responses, {...res.data, id:uuid()}]); 
  };
  

  return [responses, addResponse]
};


export {useFlip, useAxios};
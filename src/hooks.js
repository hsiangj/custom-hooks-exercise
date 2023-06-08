import React, {useState, useEffect} from "react";
import axios from "axios";
import {v4 as uuid} from "uuid";

function useFlip(initialState=true) {
  const [state, setState] = useState(initialState);
  const toggleState = () => {
    setState(state => ! state)
  }
  return [state, toggleState];
};

function useAxios(lsKey,url) {
  const [responses, setResponses] = useLocalStorage(lsKey);
  
  const addResponse = async(restOfUrl = "") => {
    const res = await axios.get(`${url}${restOfUrl}`);
    setResponses(responses => [...responses, {...res.data, id:uuid()}]); 
  };

  const cleanResponse = () => setResponses([]);

  return [responses, addResponse, cleanResponse]
};

function useLocalStorage(key, initialValue = []) {
  const [state, setState] = useState(() => {
    let value;
    try {
      value = JSON.parse(
        window.localStorage.getItem(key) || JSON.stringify(initialValue)
      )
    } catch (e) {
      console.log(e)
      value = initialValue;
    }
    return value;
  })
  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(state))
  }, [key, state])

  return [state, setState];
}


export {useFlip, useAxios, useLocalStorage};
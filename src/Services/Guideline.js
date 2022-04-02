import axios from "axios";
import { URL } from "..";

const getGuidelines = async () => {
  const response = await axios.post(URL + "getguidelines", {
    token: localStorage.getItem("token"),
  });

  return response;
};

const addGuideline = async (guideline, description) => {
  const response = await axios.post(URL + "addguideline", {
    guideline,
    description,
    token: localStorage.getItem("token"),
  });

  return response;
};

const editGuideline = async (_id, guideline, description) => {
  const response = await axios.post(URL + "editguideline", {
    _id,
    guideline,
    description,
    token: localStorage.getItem("token"),
  });

  return response;
};

const deleteGuideline = async (_id) => {
  const response = await axios.post(URL + "deleteguideline", {
    _id,
    token: localStorage.getItem("token"),
  });

  return response;
};

export { getGuidelines, addGuideline, editGuideline, deleteGuideline };

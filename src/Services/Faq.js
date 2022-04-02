import axios from "axios";
import { URL } from "..";

const getQuestions = async () => {
  const response = await axios.post(URL + "getquestions", {
    token: localStorage.getItem("token"),
  });

  return response;
};

const addQuestion = async (question, answer) => {
  const response = await axios.post(URL + "addquestion", {
    question,
    answer,
    token: localStorage.getItem("token"),
  });

  return response;
};

const editQuestion = async (_id, question, answer) => {
  const response = await axios.post(URL + "editquestion", {
    _id,
    question,
    answer,
    token: localStorage.getItem("token"),
  });

  return response;
};

const deleteQuestion = async (_id) => {
  const response = await axios.post(URL + "deletequestion", {
    _id,
    token: localStorage.getItem("token"),
  });

  return response;
};

export { getQuestions, addQuestion, editQuestion, deleteQuestion };

import axios from "axios";

import { URL } from "..";

const SigninService = async (emailAddress, password) => {
  const response = await axios.post(URL + "signin", {
    emailAddress,
    password,
    loginType: "admin",
  });

  if (response.data["status"] === "ok") {
    localStorage.setItem("token", response.data["value"]);

    return "Login successfully";
  } else {
    return response.data["value"];
  }
};

export default SigninService;

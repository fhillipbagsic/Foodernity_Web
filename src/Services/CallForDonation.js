import axios from "axios";
import { URL } from "..";

const createCallForDonation = async ({
  title,
  beneficiaries,
  remarks,
  image,
}) => {
  console.log(image);
  const formData = new FormData();
  formData.append("file", image);
  formData.append("upload_preset", "oqozctfv");

  const cloudinaryresponse = await axios.post(
    "https://api.cloudinary.com/v1_1/desimscj8/image/upload",
    formData
  );

  const response = await axios.post(URL + "createcallfordonation", {
    title,
    beneficiaries,
    remarks,
    image: await cloudinaryresponse.data.secure_url,
    status: "Active",
    token: localStorage.getItem("token"),
  });
  return response;
};

const getCallForDonations = async (status) => {
  const response = await axios.post(URL + "getcallfordonations", {
    status,
    token: localStorage.getItem("token"),
  });

  return response;
};

const updateCallForDonation = async (_id, newStatus) => {
  const response = await axios.post(URL + "updatecallfordonation", {
    _id,
    newStatus,
    token: localStorage.getItem("token"),
  });

  return response;
};

export { createCallForDonation, getCallForDonations, updateCallForDonation };

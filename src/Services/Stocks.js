import axios from "axios";
import { URL } from "..";

const getStocks = async () => {
  const response = await axios.post(URL + "getcounts", {
    token: localStorage.getItem("token"),
  });

  return response;
};

const getStocksPerStatus = async (status) => {
  const response = await axios.post(URL + "getstocksperstatus", {
    status,
    token: localStorage.getItem("token"),
  });

  return response;
};

const releaseDonation = async ({
  title,
  beneficiaries,
  remarks,
  image,
  date,
  selected,
}) => {
  const formData = new FormData();
  formData.append("file", image);
  formData.append("upload_preset", "oqozctfv");

  const cloudinaryresponse = await axios.post(
    "https://api.cloudinary.com/v1_1/desimscj8/image/upload",
    formData
  );

  const response = await axios.post(URL + "releasedonations", {
    title,
    beneficiaries,
    remarks,
    donated: true,
    documentation: await cloudinaryresponse.data.secure_url,
    date,
    selected,
    token: localStorage.getItem("token"),
  });

  return response;
};

const releaseCallForDonation = async ({ _id, image, date, selected }) => {
  const formData = new FormData();
  formData.append("file", image);
  formData.append("upload_preset", "oqozctfv");

  const cloudinaryresponse = await axios.post(
    "https://api.cloudinary.com/v1_1/desimscj8/image/upload",
    formData
  );

  const response = await axios.post(URL + "releasecallfordonation", {
    _id,
    documentation: await cloudinaryresponse.data.secure_url,
    date,
    selected,
    token: localStorage.getItem("token"),
  });

  return response;
};

export {
  getStocks,
  getStocksPerStatus,
  releaseDonation,
  releaseCallForDonation,
};

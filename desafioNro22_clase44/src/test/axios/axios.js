import axios from "axios";

const data = {
  name: "RemeraAdidasTest",
  price: "400",
  stock: "8",
};

const urlPost = "http://localhost:8080/api/add"; //"http://127.0.0.1:8080/api/add";

export const axiosPost = async () => {
  try {
    const resp = await axios.post(urlPost, data);
    console.log(resp.data);
  } catch (err) {
    console.log(err);
  }
};

const urlGet = "http://localhost:8080/api/list"; //"http://127.0.0.1:8080/api/list";

export const axiosGet = async () => {
  try {
    const response = await axios.get(urlGet);
    console.log(response.data);
  } catch (error) {
    console.log(error.message);
  }
};

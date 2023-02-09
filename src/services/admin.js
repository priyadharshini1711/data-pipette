import axios from 'axios';

let baseURL = `http://localhost:5000`;

const uploadFile = (body) => {
    axios.post(`${baseURL}/extract-file/`, body)
    .then((res) => {
        console.log(res.data)
    })
}

async function getFile() {
    try {
        const {data:response} = await axios.get(`${baseURL}/get-file/`)
        return response
      }
      catch (error) {
        console.log(error);
      }
}

async function getDashboardAdmin() {
  try {
      const {data:response} = await axios.get(`${baseURL}/get-dashboard-data/`)
      return response
    }
    catch (error) {
      console.log(error);
    }
}

async function mapData() {
  try {
      const {data:response} = await axios.put(`${baseURL}/map-processed-files/`)
      return response
    }
    catch (error) {
      console.log(error);
    }
}

export { uploadFile, getFile, getDashboardAdmin, mapData}


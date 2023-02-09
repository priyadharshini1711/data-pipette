import axios from 'axios';

let baseURL = `http://localhost:5000`;

async function getUsername() {
  try {
    const response = await axios.get(`${baseURL}/get-username/`)
    return response.data
  }
  catch (error) {
    console.log(error);
  }
}

const createUsername = (body) => {
  axios.post(`${baseURL}/create-username/`, body)
    .then((res) => {
      console.log(res.data)
    })
}

async function getUserDetail(id) {
  try {
    const response = await axios.get(`${baseURL}/get-user-detail/?id=${id}`)
    return response.data
  }
  catch (error) {
    console.log(error);
  }
}

async function getUserPhone(id) {
  try {
    const response = await axios.get(`${baseURL}/get-user-phone/?id=${id}`)
    return response.data
  }
  catch (error) {
    console.log(error);
  }
}

const updateUserPhone = (code, phone, id) => {
  axios.put(`${baseURL}/update-user-phone/?country_code=${code}&phone=${phone}&id=${id}`,)
    .then((res) => {
      console.log(res.data)
    })
}

async function getUserFile(id) {
  try {
      const {data:response} = await axios.get(`${baseURL}/get-user-file/?id=${id}`)
      return response
    }
    catch (error) {
      console.log(error);
    }
}

async function getDashboardUser(userId) {
  try {
      const {data:response} = await axios.get(`${baseURL}/get-user-dashboard-data/?id=${userId}`)
      return response
    }
    catch (error) {
      console.log(error);
    }
}

const updateUserData = (key, value, id) => {
  axios.put(`${baseURL}/update_user-data/?key=${key}&value=${value}&id=${id}`,)
    .then((res) => {
      console.log(res.data)
    })
}

export { getUsername, createUsername, getUserDetail, getUserPhone, updateUserPhone, getUserFile, getDashboardUser, updateUserData }
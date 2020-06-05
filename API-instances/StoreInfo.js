import axios from 'axios'

const GetStoreInfo = axios.create({
  baseURL: `https://7ce22de62ce1.ngrok.io/api/getStoreInfo`
})

export default GetStoreInfo
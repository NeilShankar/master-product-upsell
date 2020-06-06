import axios from 'axios'

const GetStoreInfo = axios.create({
  baseURL: `https://8479d5748b7b.ngrok.io/api/getStoreInfo`
})

export default GetStoreInfo
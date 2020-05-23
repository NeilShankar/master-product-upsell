import axios from 'axios'

const GetStoreInfo = axios.create({
  baseURL: `https://30002f58.ngrok.io/api/getStoreInfo`
})

export default GetStoreInfo
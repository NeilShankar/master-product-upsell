import axios from 'axios'

const GetStoreInfo = axios.create({
  baseURL: `https://77576360c859.ngrok.io/api/getStoreInfo`
})

export default GetStoreInfo
import axios from 'axios'

const GetStoreInfo = axios.create({
  baseURL: `https://4b2bd71169fc.ngrok.io/api/getStoreInfo`
})

export default GetStoreInfo
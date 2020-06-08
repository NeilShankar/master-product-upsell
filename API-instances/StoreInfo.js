import axios from 'axios'

const GetStoreInfo = axios.create({
  baseURL: `https://912288751566.ngrok.io/api/getStoreInfo`
})

export default GetStoreInfo
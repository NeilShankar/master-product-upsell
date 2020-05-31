import axios from 'axios'

const GetStoreInfo = axios.create({
  baseURL: `https://4129250fce81.ngrok.io/api/getStoreInfo`
})

export default GetStoreInfo
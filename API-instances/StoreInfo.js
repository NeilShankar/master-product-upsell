import axios from 'axios'

const GetStoreInfo = axios.create({
  baseURL: `https://e6868b6799cd.ngrok.io/api/getStoreInfo`
})

export default GetStoreInfo
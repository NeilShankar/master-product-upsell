import axios from 'axios'

const GetStoreInfo = axios.create({
  baseURL: `${process.env.HOST}/api/getStoreInfo`
})

export default GetStoreInfo
import axios from 'axios'

const GetStoreInfo = axios.create({
  baseURL: `https://shoplee-bundles.herokuapp.com/api/getStoreInfo`
})

export default GetStoreInfo
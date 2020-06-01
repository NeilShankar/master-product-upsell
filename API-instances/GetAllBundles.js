import axios from 'axios'

const GetAllBundles = axios.create({
  baseURL: `https://4b2bd71169fc.ngrok.io/api/getAllBundles`
})

export default GetAllBundles
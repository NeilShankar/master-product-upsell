import axios from 'axios'

const GetAllBundles = axios.create({
  baseURL: `https://30002f58.ngrok.io/api/getAllBundles`
})

export default GetAllBundles
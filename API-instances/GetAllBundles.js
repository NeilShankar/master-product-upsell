import axios from 'axios'

const GetAllBundles = axios.create({
  baseURL: `https://77576360c859.ngrok.io/api/getAllBundles`
})

export default GetAllBundles
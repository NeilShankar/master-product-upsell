import axios from 'axios'

const GetAllBundles = axios.create({
  baseURL: `https://912288751566.ngrok.io/api/getAllBundles`
})

export default GetAllBundles
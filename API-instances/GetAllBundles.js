import axios from 'axios'

const GetAllBundles = axios.create({
  baseURL: `https://8479d5748b7b.ngrok.io/api/getAllBundles`
})

export default GetAllBundles
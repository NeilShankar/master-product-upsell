import axios from 'axios'

const GetAllBundles = axios.create({
  baseURL: `https://7ce22de62ce1.ngrok.io/api/getAllBundles`
})

export default GetAllBundles
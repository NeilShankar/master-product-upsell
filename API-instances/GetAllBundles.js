import axios from 'axios'

const GetAllBundles = axios.create({
  baseURL: `https://e6868b6799cd.ngrok.io/api/getAllBundles`
})

export default GetAllBundles
import axios from 'axios'

const GetAllBundles = axios.create({
  baseURL: `https://4129250fce81.ngrok.io/api/getAllBundles`
})

export default GetAllBundles
import axios from 'axios'

const GetAllProducts = axios.create({
  baseURL: `https://e6868b6799cd.ngrok.io/api/allProducts`
})

export default GetAllProducts
import axios from 'axios'

const GetAllProducts = axios.create({
  baseURL: `https://4b2bd71169fc.ngrok.io/api/allProducts`
})

export default GetAllProducts
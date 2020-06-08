import axios from 'axios'

const GetAllProducts = axios.create({
  baseURL: `https://912288751566.ngrok.io/api/allProducts`
})

export default GetAllProducts
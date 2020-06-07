import axios from 'axios'

const GetAllProducts = axios.create({
  baseURL: `https://77576360c859.ngrok.io/api/allProducts`
})

export default GetAllProducts
import axios from 'axios'

const GetAllProducts = axios.create({
  baseURL: `https://8479d5748b7b.ngrok.io/api/allProducts`
})

export default GetAllProducts
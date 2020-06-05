import axios from 'axios'

const GetAllProducts = axios.create({
  baseURL: `https://7ce22de62ce1.ngrok.io/api/allProducts`
})

export default GetAllProducts
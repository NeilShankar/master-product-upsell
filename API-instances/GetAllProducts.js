import axios from 'axios'

const GetAllProducts = axios.create({
  baseURL: `https://4129250fce81.ngrok.io/api/allProducts`
})

export default GetAllProducts
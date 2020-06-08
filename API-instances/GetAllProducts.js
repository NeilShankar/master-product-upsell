import axios from 'axios'

const GetAllProducts = axios.create({
  baseURL: `${process.env.HOST}/api/allProducts`
})

export default GetAllProducts
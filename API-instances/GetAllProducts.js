import axios from 'axios'

const GetAllProducts = axios.create({
  baseURL: `https://shoplee-bundles.herokuapp.com/api/allProducts`
})

export default GetAllProducts
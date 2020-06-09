import axios from 'axios'

const GetAllBundles = axios.create({
  baseURL: `https://shoplee-bundles.herokuapp.com/api/getAllBundles`
})

export default GetAllBundles
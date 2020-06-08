import axios from 'axios'

const GetAllBundles = axios.create({
  baseURL: `${process.env.HOST}/api/getAllBundles`
})

export default GetAllBundles
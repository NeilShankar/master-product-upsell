import axios from 'axios'

const GetBundleInstance = axios.create({
  baseURL: `https://shoplee-bundles.herokuapp.com/api/getBundleInfo`
})

export default GetBundleInstance
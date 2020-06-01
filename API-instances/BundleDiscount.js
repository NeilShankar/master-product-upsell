import axios from 'axios'

const BundleDiscount = axios.create({
  baseURL: `https://4b2bd71169fc.ngrok.io/api/discountBundle`
})

export default BundleDiscount
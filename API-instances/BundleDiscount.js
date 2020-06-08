import axios from 'axios'

const BundleDiscount = axios.create({
  baseURL: `https://912288751566.ngrok.io/api/discountBundle`
})

export default BundleDiscount
import axios from 'axios'

const BundleDiscount = axios.create({
  baseURL: `https://30002f58.ngrok.io/api/discountBundle`
})

export default BundleDiscount
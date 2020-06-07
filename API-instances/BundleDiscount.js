import axios from 'axios'

const BundleDiscount = axios.create({
  baseURL: `https://77576360c859.ngrok.io/api/discountBundle`
})

export default BundleDiscount
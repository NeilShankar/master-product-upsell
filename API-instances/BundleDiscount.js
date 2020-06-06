import axios from 'axios'

const BundleDiscount = axios.create({
  baseURL: `https://8479d5748b7b.ngrok.io/api/discountBundle`
})

export default BundleDiscount
import axios from 'axios'

const BundleDiscount = axios.create({
  baseURL: `https://7ce22de62ce1.ngrok.io/api/discountBundle`
})

export default BundleDiscount
import axios from 'axios'

const BundleAllDiscount = axios.create({
  baseURL: `https://7ce22de62ce1.ngrok.io/api/discountBundleAll`
})

export default BundleAllDiscount
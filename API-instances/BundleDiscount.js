import axios from 'axios'

const BundleDiscount = axios.create({
  baseURL: `https://e6868b6799cd.ngrok.io/api/discountBundle`
})

export default BundleDiscount
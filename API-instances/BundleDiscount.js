import axios from 'axios'

const BundleDiscount = axios.create({
  baseURL: `https://4129250fce81.ngrok.io/api/discountBundle`
})

export default BundleDiscount
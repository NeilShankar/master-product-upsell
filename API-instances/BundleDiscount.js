import axios from 'axios'

const BundleDiscount = axios.create({
  baseURL: `${process.env.HOST}/api/discountBundle`
})

export default BundleDiscount
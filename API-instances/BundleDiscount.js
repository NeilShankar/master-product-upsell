import axios from 'axios'

const BundleDiscount = axios.create({
  baseURL: `https://shoplee-bundles.herokuapp.com/api/discountBundle`
})

export default BundleDiscount
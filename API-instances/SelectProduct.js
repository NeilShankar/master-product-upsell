import axios from 'axios'

const SelectProduct = axios.create({
  baseURL: `https://shoplee-bundles.herokuapp.com/api/selectProduct`
})

export default SelectProduct
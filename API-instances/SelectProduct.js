import axios from 'axios'

const SelectProduct = axios.create({
  baseURL: `${process.env.HOST}/api/selectProduct`
})

export default SelectProduct
import axios from 'axios'
import { POSIST_API_URL, POSIST_TOKEN } from '../config.js'

export const getPosistBrandMenu = async customerKey => {
  const sub_url = 'online_order_cloud/menu'
  await axios
    .get(POSIST_API_URL + sub_url + '?customer_key=' + customerKey, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        Authorization: 'Basic ' + POSIST_TOKEN
      }
    })
    .then(response => {
      return response
    })
}

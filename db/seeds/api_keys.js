import { v4 } from 'uuid'

const { APP_KEY } = require('../../app/config')

export const seed = async knex => {
  // Deletes ALL existing entries
  await knex('api_keys').del()

  // // Fetch fin-flux token
  // const { success, data } = await finFlux.authenticate({ save: false })

  // let access_token = v4()
  // let refresh_token = v4()

  // if (success) {
  //   access_token = data.access_token
  //   refresh_token = data.refresh_token
  // }

  await knex('api_keys').insert([
    {
      id: v4(),
      key: 'APP_KEY',
      value: APP_KEY,
      active: true
    },
    // {
    //   id: v4(),
    //   key: 'FIN_FLUX_ACCESS_TOKEN',
    //   value: access_token,
    //   active: true
    // },
    // {
    //   id: v4(),
    //   key: 'FIN_FLUX_REFRESH_TOKEN',
    //   value: refresh_token,
    //   active: true
    // }
  ])
}

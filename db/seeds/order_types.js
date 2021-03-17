import { v4 } from 'uuid'

const { APP_KEY } = require('../../app/config')

export const seed = async knex => {
  // Deletes ALL existing entries
  await knex('order_types').del()

  await knex('order_types').insert([
    {
      id: v4(),
      name: 'WALLET',
    },
    {
        id: v4(),
        name: 'CARD',
      },
      {
        id: v4(),
        name: 'CASH',
      },
  ])
}

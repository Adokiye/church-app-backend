import { v4 } from 'uuid'

const { APP_KEY } = require('../../app/config')

export const seed = async knex => {
  // Deletes ALL existing entries
  await knex('roles').del()

  await knex('roles').insert([
    {
      id: v4(),
      name: 'USER'
    },
    {
      id: v4(),
      name: 'ADMIN'
    },
    {
      id: v4(),
      name: 'SUPER_ADMIN'
    },
  ])
}

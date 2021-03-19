import { v4 } from 'uuid'

const { APP_KEY } = require('../../app/config')

export const seed = async knex => {
  // Deletes ALL existing entries
  await knex('roles').del()

  await knex('roles').insert([
    {
      id: v4(),
      name: 'CUSTOMER'
    },
    {
      id: v4(),
      name: 'RIDER'
    },
    {
      id: v4(),
      name: 'MARKETING'
    },
    {
      id: v4(),
      name: 'MARKETING_ADMIN'
    },
    {
      id: v4(),
      name: 'LOGISTICS_ADMIN'
    },
    {
      id: v4(),
      name: 'LOGISTICS_SUPER_ADMIN'
    },
    {
      id: v4(),
      name: 'ADMIN'
    }
  ])
}

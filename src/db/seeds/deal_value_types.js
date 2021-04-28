import { v4 } from 'uuid'

export const seed = async knex => {
  // Deletes ALL existing entries
  await knex('deal_value_types').del()

  await knex('deal_value_types').insert([
    {
      id: v4(),
      name: 'PERCENTAGE'
    },
    {
      id: v4(),
      name: 'FIXED_AMOUNT'
    },
    {
      id: v4(),
      name: 'FREE_SHIPPING'
    }
  ])
}

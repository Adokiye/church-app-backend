import { v4 } from 'uuid'

export const seed = async knex => {
  // Deletes ALL existing entries
  await knex('deal_requirement_types').del()

  await knex('deal_requirement_types').insert([
    {
      id: v4(),
      name: 'NONE'
    },
    {
      id: v4(),
      name: 'MINIMUM_PURCHASE_AMOUNT'
    },
    {
      id: v4(),
      name: 'MINIMUM_QUANTITY_OF_ITEMS'
    }
  ])
}

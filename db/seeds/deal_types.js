import { v4 } from 'uuid'

export const seed = async knex => {
  // Deletes ALL existing entries
  await knex('deal_types').del()

  await knex('deal_types').insert([
    {
      id: v4(),
      name: 'BRAND',
    },
    {
        id: v4(),
        name: 'ALL',
      },
  ])
}

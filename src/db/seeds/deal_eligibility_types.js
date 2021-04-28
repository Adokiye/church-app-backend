import { v4 } from 'uuid'

export const seed = async knex => {
  // Deletes ALL existing entries
  await knex('deal_eligibility_types').del()

  await knex('deal_eligibility_types').insert([
    {
      id: v4(),
      name: 'EVERYONE'
    },
    {
      id: v4(),
      name: 'SPECIFIC_CUSTOMERS'
    }
  ])
}

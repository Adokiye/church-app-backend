import { v4 } from 'uuid'

export const seed = async knex => {
  // Deletes ALL existing entries
  await knex('meal_category_selection_types').del()

  await knex('meal_category_selection_types').insert([
    {
      id: v4(),
      name: 'SINGLE_SELECTION'
    },
    {
      id: v4(),
      name: 'SINGLE_SELECTION_WITH_QUANTITY'
    },
    {
      id: v4(),
      name: 'MULTI_SELECTION'
    },
    {
      id: v4(),
      name: 'MULTI_SELECTION_WITH_QUANTITY'
    }
  ])
}

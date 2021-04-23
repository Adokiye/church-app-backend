import { v4 } from 'uuid'

export const seed = async knex => {
  // Deletes ALL existing entries
  await knex('cokitchens').del()

  await knex('cokitchens').insert([
    {
      id: v4(),
      name: 'CoKitchen Lekki',
      lat: '6.466100',
      lng: '3.539190',
      address: 'Close 57 Victoria Garden City Lagos'
    }
  ])
}

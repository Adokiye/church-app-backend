import { v4 } from 'uuid'

export const seed = async knex => {
  // Deletes ALL existing entries
  await knex('cokitchens').del()

  //   await knex('cokitchens').insert([
  //     {
  //       id: v4(),
  //       name: 'CoKitchen Lekki',
  //       lat:'6.466100',
  //       lng:'3.539190'
  //     },
  //   ])

  await knex
    .transaction(function (t) {
      return knex('cokitchens')
        .transacting(t)
        .insert({
          id: v4(),
          name: 'CoKitchen Lekki',
          lat: '6.466100',
          lng: '3.539190',
          address: 'Close 57 Victoria Garden City Lagos'
        })
        .then(function (response) {
          return knex('brands')
            .transacting(t)
            .insert({
              name: 'Jollof & Co.',
              cokitchen_id: response.id,
              posist_data: JSON.stringify({
                customer_key:
                  '5fa679a9e547c1cffdcc2e0c0759997ad9f29b1b19cf6bf615450bac6add39e723fda97f618c5cd6d727224267afe7e8'
              })
            })
        })
        .then(t.commit)
        .catch(t.rollback)
    })
    .then(function () {
      // transaction suceeded, data written
    })
    .catch(function () {
      // transaction failed, data rolled back
    })
}

const now = new Date()
const twoMonthsFrom = date =>
  new Date(date.getTime() + 5259600000)

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('games').del()
    .then(function () {
      // Inserts seed entries
      return knex('games').insert([
        {
          title: 'Green Game',
          latitude: 40.71,
          longitude: -74.00
        },
        {
          title: 'Blue Game',
          latitude: 35.59,
          longitude: -82.55,
          expiration: twoMonthsFrom(now)
        }
      ]);
    });
};

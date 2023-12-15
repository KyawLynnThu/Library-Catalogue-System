const { DataBaseTableNames } = require('../constants');
module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert(DataBaseTableNames.AUTHOR, [
      {
        author_name: 'John Doe',
        birth_date: '1985-07-12',
        biography:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed id eros id quam tristique euismod eget sed dui.',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        author_name: 'Alice Smith',
        birth_date: '1979-04-25',
        biography:
          'Fusce in bibendum dolor. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nunc vitae libero vitae nunc viverra vestibulum vitae vitae est.',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        author_name: 'Emily Johnson',
        birth_date: '1992-11-08',
        biography:
          'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nulla facilisi. Integer euismod suscipit mi, in bibendum nulla tempus sit amet.',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        author_name: 'Michael Williams',
        birth_date: '1980-02-19',
        biography:
          'Vivamus scelerisque orci id elit rutrum, eget rhoncus purus vulputate. Phasellus blandit sapien id augue scelerisque, eget ullamcorper arcu malesuada.',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        author_name: 'Sophia Brown',
        birth_date: '1988-09-03',
        biography:
          'Quisque lacinia auctor metus, id aliquet dui eleifend nec. Ut efficitur, nulla non dignissim vestibulum, justo odio cursus felis, non vehicula nunc neque eget purus.',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        author_name: 'Daniel Wilson',
        birth_date: '1975-06-27',
        biography:
          'Integer ac fringilla purus. Sed facilisis lorem nec tellus blandit, quis suscipit risus ultricies.',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        author_name: 'Olivia Miller',
        birth_date: '1996-12-30',
        biography:
          'Donec facilisis risus sit amet nibh vehicula, nec efficitur ipsum tincidunt. Curabitur quis justo auctor, varius odio eu, suscipit odio.',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },
  down: (queryInterface) => {
    return queryInterface.bulkDelete(DataBaseTableNames.AUTHOR, null, {});
  },
};

import * as migration_20260811_125959_initial from './20260811_125959_initial';

export const migrations = [
  {
    up: migration_20260811_125959_initial.up,
    down: migration_20260811_125959_initial.down,
    name: '20260811_125959_initial'
  },
];

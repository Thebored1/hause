import * as migration_20260811_142757_initial from './20260811_142757_initial';

export const migrations = [
  {
    up: migration_20260811_142757_initial.up,
    down: migration_20260811_142757_initial.down,
    name: '20260811_142757_initial'
  },
];

import * as migration_20260811_142757_initial from './20260811_142757_initial';
import * as migration_20260812_190051_seo from './20260812_190051_seo';

export const migrations = [
  {
    up: migration_20260811_142757_initial.up,
    down: migration_20260811_142757_initial.down,
    name: '20260811_142757_initial',
  },
  {
    up: migration_20260812_190051_seo.up,
    down: migration_20260812_190051_seo.down,
    name: '20260812_190051_seo'
  },
];

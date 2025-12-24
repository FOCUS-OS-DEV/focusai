import * as migration_20251220_235930 from './20251220_235930';
import * as migration_20251224_223716_add_hero_title_highlight from './20251224_223716_add_hero_title_highlight';

export const migrations = [
  {
    up: migration_20251220_235930.up,
    down: migration_20251220_235930.down,
    name: '20251220_235930',
  },
  {
    up: migration_20251224_223716_add_hero_title_highlight.up,
    down: migration_20251224_223716_add_hero_title_highlight.down,
    name: '20251224_223716_add_hero_title_highlight'
  },
];

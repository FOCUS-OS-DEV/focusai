import * as migration_20251220_235930 from './20251220_235930';

export const migrations = [
  {
    up: migration_20251220_235930.up,
    down: migration_20251220_235930.down,
    name: '20251220_235930',
  },
];

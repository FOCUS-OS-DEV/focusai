import * as migration_20251220_235930 from './20251220_235930';
import * as migration_20251226_195750 from './20251226_195750';

export const migrations = [
  {
    up: migration_20251220_235930.up,
    down: migration_20251220_235930.down,
    name: '20251220_235930',
  },
  {
    up: migration_20251226_195750.up,
    down: migration_20251226_195750.down,
    name: '20251226_195750'
  },
];

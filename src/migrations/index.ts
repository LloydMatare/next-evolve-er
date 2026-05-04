import * as migration_20260430_082841 from './20260430_082841';
import * as migration_20260430_095734 from './20260430_095734';

export const migrations = [
  {
    up: migration_20260430_082841.up,
    down: migration_20260430_082841.down,
    name: '20260430_082841',
  },
  {
    up: migration_20260430_095734.up,
    down: migration_20260430_095734.down,
    name: '20260430_095734'
  },
];

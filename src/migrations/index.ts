import * as migration_20260430_082841 from './20260430_082841';
import * as migration_20260430_095734 from './20260430_095734';
import * as migration_20260507_add_paynow_payment_method from './20260507_add_paynow_payment_method';

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
  {
    up: migration_20260507_add_paynow_payment_method.up,
    down: migration_20260507_add_paynow_payment_method.down,
    name: '20260507_add_paynow_payment_method',
  },
];

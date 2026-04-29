import * as migration_20260429_073608_add_name_role_to_users from './20260429_073608_add_name_role_to_users';
import * as migration_20260429_080533_fix_user_nulls from './20260429_080533_fix_user_nulls';

export const migrations = [
  {
    up: migration_20260429_073608_add_name_role_to_users.up,
    down: migration_20260429_073608_add_name_role_to_users.down,
    name: '20260429_073608_add_name_role_to_users',
  },
  {
    up: migration_20260429_080533_fix_user_nulls.up,
    down: migration_20260429_080533_fix_user_nulls.down,
    name: '20260429_080533_fix_user_nulls'
  },
];

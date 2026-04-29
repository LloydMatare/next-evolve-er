import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    DO $$ BEGIN
      CREATE TYPE "public"."enum_users_role" AS ENUM('Summit Director', 'Program Coordinator', 'Logistics Manager', 'Marketing Lead', 'Technical Director', 'Partnerships Manager');
    EXCEPTION
      WHEN duplicate_object THEN null;
    END $$;
    ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "name" varchar DEFAULT 'Team Member';
    ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "role" "enum_users_role" DEFAULT 'Team Member';
    UPDATE "users" SET "name" = 'Team Member' WHERE "name" IS NULL;
    UPDATE "users" SET "role" = 'Team Member' WHERE "role" IS NULL;
    ALTER TABLE "users" ALTER COLUMN "name" SET NOT NULL;
    ALTER TABLE "users" ALTER COLUMN "role" SET NOT NULL;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "users" ALTER COLUMN "name" DROP NOT NULL;
    ALTER TABLE "users" ALTER COLUMN "role" DROP NOT NULL;
    ALTER TABLE "users" DROP COLUMN IF EXISTS "name";
    ALTER TABLE "users" DROP COLUMN IF EXISTS "role";
    DROP TYPE IF EXISTS "public"."enum_users_role";`)
}

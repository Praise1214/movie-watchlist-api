/*
  Warnings:

  - The values [PlANNED] on the enum `WatchListStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "WatchListStatus_new" AS ENUM ('PLANNED', 'WATCHING', 'COMPLETED', 'DROPPED');
ALTER TABLE "public"."WatchListItem" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "WatchListItem" ALTER COLUMN "status" TYPE "WatchListStatus_new" USING ("status"::text::"WatchListStatus_new");
ALTER TYPE "WatchListStatus" RENAME TO "WatchListStatus_old";
ALTER TYPE "WatchListStatus_new" RENAME TO "WatchListStatus";
DROP TYPE "public"."WatchListStatus_old";
ALTER TABLE "WatchListItem" ALTER COLUMN "status" SET DEFAULT 'PLANNED';
COMMIT;

-- AlterTable
ALTER TABLE "WatchListItem" ALTER COLUMN "status" SET DEFAULT 'PLANNED';

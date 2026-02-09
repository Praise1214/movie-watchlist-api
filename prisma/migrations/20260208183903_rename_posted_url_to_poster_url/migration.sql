/*
  Warnings:

  - You are about to drop the column `postedUrl` on the `Movie` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Movie" DROP COLUMN "postedUrl",
ADD COLUMN     "posterUrl" TEXT;

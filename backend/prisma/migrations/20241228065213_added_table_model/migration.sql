/*
  Warnings:

  - You are about to drop the `Table` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Table";

-- CreateTable
CREATE TABLE "Tbl_info" (
    "id" TEXT NOT NULL,
    "number" INTEGER NOT NULL,

    CONSTRAINT "Tbl_info_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Tbl_info_number_key" ON "Tbl_info"("number");

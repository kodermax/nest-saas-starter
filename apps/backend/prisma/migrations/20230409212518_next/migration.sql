-- AlterTable
ALTER TABLE "User" ALTER COLUMN "firstName" DROP NOT NULL;

-- CreateTable
CREATE TABLE "Note" (
    "_id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT,

    CONSTRAINT "Note_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "Notes" (
    "_id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT,

    CONSTRAINT "Notes_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "Tenant" (
    "_id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT,
    "domain" TEXT NOT NULL,
    "createdBy" TEXT,

    CONSTRAINT "Tenant_pkey" PRIMARY KEY ("_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Tenant_domain_key" ON "Tenant"("domain");

-- AddForeignKey
ALTER TABLE "Tenant" ADD CONSTRAINT "Tenant_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- CreateTable
CREATE TABLE "Board" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "Owner" TEXT NOT NULL,

    CONSTRAINT "Board_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Board_title_key" ON "Board"("title");

-- AddForeignKey
ALTER TABLE "Board" ADD CONSTRAINT "Board_Owner_fkey" FOREIGN KEY ("Owner") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

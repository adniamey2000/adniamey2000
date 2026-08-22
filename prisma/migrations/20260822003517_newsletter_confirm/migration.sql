-- AlterTable
ALTER TABLE "NewsletterSubscriber" ADD COLUMN     "confirmToken" TEXT,
ADD COLUMN     "confirmed" BOOLEAN NOT NULL DEFAULT false;

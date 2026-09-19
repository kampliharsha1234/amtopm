-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PasswordResetToken` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `tokenHash` VARCHAR(191) NOT NULL,
    `expiresAt` DATETIME(3) NOT NULL,
    `used` BOOLEAN NOT NULL DEFAULT false,

    UNIQUE INDEX `PasswordResetToken_tokenHash_key`(`tokenHash`),
    INDEX `PasswordResetToken_userId_idx`(`userId`),
    INDEX `PasswordResetToken_expiresAt_used_idx`(`expiresAt`, `used`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Order` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `subtotal` DECIMAL(65, 30) NULL,
    `shippingCharge` DECIMAL(65, 30) NULL,
    `shipmentWeight` DECIMAL(65, 30) NULL,
    `packageLength` DECIMAL(65, 30) NULL,
    `packageBreadth` DECIMAL(65, 30) NULL,
    `packageHeight` DECIMAL(65, 30) NULL,
    `total` DECIMAL(65, 30) NOT NULL,
    `shippingName` VARCHAR(191) NOT NULL,
    `shippingEmail` VARCHAR(191) NOT NULL,
    `shippingPhone` VARCHAR(191) NOT NULL,
    `shippingAddress` TEXT NOT NULL,
    `shippingCity` VARCHAR(191) NOT NULL,
    `shippingState` VARCHAR(191) NOT NULL,
    `shippingPincode` VARCHAR(191) NOT NULL,
    `paymentStatus` ENUM('pending', 'paid', 'failed') NOT NULL,
    `razorpayOrderId` VARCHAR(191) NOT NULL,
    `razorpayPaymentId` VARCHAR(191) NULL,
    `invoiceNumber` VARCHAR(191) NULL,
    `invoiceGeneratedAt` DATETIME(3) NULL,
    `invoiceStatus` ENUM('generated', 'draft') NULL,
    `invoiceFileName` VARCHAR(191) NULL,
    `shiprocketStatus` ENUM('pending', 'created', 'awb_assigned', 'pickup_generated', 'failed') NULL,
    `shiprocketOrderId` INTEGER NULL,
    `shipmentId` INTEGER NULL,
    `awbCode` VARCHAR(191) NULL,
    `courierCompanyId` INTEGER NULL,
    `courierName` VARCHAR(191) NULL,
    `pickupScheduledDate` DATETIME(3) NULL,
    `pickupToken` VARCHAR(191) NULL,
    `pickupStatus` INTEGER NULL,
    `manifestGenerated` BOOLEAN NULL,
    `manifestUrl` VARCHAR(191) NULL,
    `shiprocketError` TEXT NULL,
    `shiprocketUpdatedAt` DATETIME(3) NULL,
    `status` ENUM('pending', 'confirmed', 'processing', 'shipped', 'delivered') NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Order_razorpayOrderId_key`(`razorpayOrderId`),
    UNIQUE INDEX `Order_razorpayPaymentId_key`(`razorpayPaymentId`),
    UNIQUE INDEX `Order_invoiceNumber_key`(`invoiceNumber`),
    INDEX `Order_userId_createdAt_idx`(`userId`, `createdAt`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `OrderItem` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `orderId` VARCHAR(191) NOT NULL,
    `productId` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `price` DECIMAL(65, 30) NOT NULL,
    `quantity` INTEGER NOT NULL,
    `image` VARCHAR(191) NOT NULL,
    `sku` VARCHAR(191) NULL,
    `priceExcludingGst` DECIMAL(65, 30) NULL,

    INDEX `OrderItem_orderId_idx`(`orderId`),
    INDEX `OrderItem_productId_idx`(`productId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Review` (
    `id` VARCHAR(191) NOT NULL,
    `productId` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `rating` INTEGER NOT NULL,
    `review` TEXT NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `Review_productId_createdAt_idx`(`productId`, `createdAt`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `PasswordResetToken` ADD CONSTRAINT `PasswordResetToken_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OrderItem` ADD CONSTRAINT `OrderItem_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `Order`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;


-- CreateTable
CREATE TABLE "Bookings" (
    "BookingID" TEXT NOT NULL,
    "BookingDate" TIMESTAMP(3) NOT NULL,
    "TravelerCount" INTEGER NOT NULL,
    "BookingNo" TEXT NOT NULL,
    "CustomerID" TEXT NOT NULL,
    "TripTypeID" TEXT NOT NULL,

    CONSTRAINT "Bookings_pkey" PRIMARY KEY ("BookingID")
);

-- CreateTable
CREATE TABLE "BookingDetails" (
    "BookingDetailID" TEXT NOT NULL,
    "Itenerary" TEXT NOT NULL,
    "Description" TEXT NOT NULL,
    "Destination" TEXT NOT NULL,
    "TripStartDate" TIMESTAMP(3) NOT NULL,
    "TripEndDate" TIMESTAMP(3) NOT NULL,
    "BasePrice" DOUBLE PRECISION NOT NULL,
    "AgencyCommission" DOUBLE PRECISION NOT NULL,
    "BookingID" TEXT NOT NULL,
    "RegionID" TEXT NOT NULL,
    "ClassID" TEXT NOT NULL,
    "FeeID" TEXT NOT NULL,
    "ProductSupplierID" TEXT NOT NULL,

    CONSTRAINT "BookingDetails_pkey" PRIMARY KEY ("BookingDetailID")
);

-- CreateTable
CREATE TABLE "TripType" (
    "TripTypeID" TEXT NOT NULL,
    "TripType" TEXT NOT NULL,

    CONSTRAINT "TripType_pkey" PRIMARY KEY ("TripTypeID")
);

-- CreateTable
CREATE TABLE "Classes" (
    "ClassID" TEXT NOT NULL,
    "Name" TEXT NOT NULL,
    "Description" TEXT NOT NULL,

    CONSTRAINT "Classes_pkey" PRIMARY KEY ("ClassID")
);

-- CreateTable
CREATE TABLE "Fees" (
    "FeeID" TEXT NOT NULL,
    "Name" TEXT NOT NULL,
    "Amount" DOUBLE PRECISION NOT NULL,
    "Description" TEXT NOT NULL,

    CONSTRAINT "Fees_pkey" PRIMARY KEY ("FeeID")
);

-- CreateTable
CREATE TABLE "Regions" (
    "RegionID" TEXT NOT NULL,
    "Name" TEXT NOT NULL,

    CONSTRAINT "Regions_pkey" PRIMARY KEY ("RegionID")
);

-- CreateTable
CREATE TABLE "Packages" (
    "ID" TEXT NOT NULL,
    "Name" TEXT NOT NULL,
    "Description" TEXT NOT NULL,
    "Price" DOUBLE PRECISION NOT NULL,
    "AgencyCommission" DOUBLE PRECISION NOT NULL,
    "StartDate" TIMESTAMP(3) NOT NULL,
    "EndDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Packages_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "Products" (
    "ID" TEXT NOT NULL,
    "Name" TEXT NOT NULL,

    CONSTRAINT "Products_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "Suppliers" (
    "ID" TEXT NOT NULL,
    "Name" TEXT NOT NULL,

    CONSTRAINT "Suppliers_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "ProductSuppliers" (
    "ID" TEXT NOT NULL,
    "ProductID" TEXT NOT NULL,
    "SupplierID" TEXT NOT NULL,

    CONSTRAINT "ProductSuppliers_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "PackageProductSuppliers" (
    "ID" TEXT NOT NULL,
    "PackageID" TEXT NOT NULL,
    "ProductSupplierID" TEXT NOT NULL,

    CONSTRAINT "PackageProductSuppliers_pkey" PRIMARY KEY ("ID")
);

-- AddForeignKey
ALTER TABLE "Bookings" ADD CONSTRAINT "Bookings_TripTypeID_fkey" FOREIGN KEY ("TripTypeID") REFERENCES "TripType"("TripTypeID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bookings" ADD CONSTRAINT "Bookings_CustomerID_fkey" FOREIGN KEY ("CustomerID") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookingDetails" ADD CONSTRAINT "BookingDetails_ProductSupplierID_fkey" FOREIGN KEY ("ProductSupplierID") REFERENCES "ProductSuppliers"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookingDetails" ADD CONSTRAINT "BookingDetails_FeeID_fkey" FOREIGN KEY ("FeeID") REFERENCES "Fees"("FeeID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookingDetails" ADD CONSTRAINT "BookingDetails_ClassID_fkey" FOREIGN KEY ("ClassID") REFERENCES "Classes"("ClassID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookingDetails" ADD CONSTRAINT "BookingDetails_RegionID_fkey" FOREIGN KEY ("RegionID") REFERENCES "Regions"("RegionID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookingDetails" ADD CONSTRAINT "BookingDetails_BookingID_fkey" FOREIGN KEY ("BookingID") REFERENCES "Bookings"("BookingID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductSuppliers" ADD CONSTRAINT "ProductSuppliers_ProductID_fkey" FOREIGN KEY ("ProductID") REFERENCES "Products"("ID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductSuppliers" ADD CONSTRAINT "ProductSuppliers_SupplierID_fkey" FOREIGN KEY ("SupplierID") REFERENCES "Suppliers"("ID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PackageProductSuppliers" ADD CONSTRAINT "PackageProductSuppliers_PackageID_fkey" FOREIGN KEY ("PackageID") REFERENCES "Packages"("ID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PackageProductSuppliers" ADD CONSTRAINT "PackageProductSuppliers_ProductSupplierID_fkey" FOREIGN KEY ("ProductSupplierID") REFERENCES "ProductSuppliers"("ID") ON DELETE CASCADE ON UPDATE CASCADE;

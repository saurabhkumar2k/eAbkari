
import {
  Document,
  Page,
  View,
  Text,
  Image,
  StyleSheet
} from "@react-pdf/renderer";

//import styles from "./ReportStyles";

//import styles from "../../components/Reports/ReportStyles";

import { styles } from "../../components/Reports/ReportStyles";

import ReportHeader from "../../components/Reports/ReportHeader";


import ApplicantDetails  from "../../components/Reports/AdditionalDetails";

import DocumentsUploaded  from "../../components/Reports/DocumentsUploaded";




const ReportPrintL1 = ({ applicant , category }) => {

    const warehouse = applicant?.warehouseDetails;

    const CompanyDetails = applicant?.licenseCompanyDetails;

const categories = applicant?.categoryDescription?.split(/\s*(?:and|&)\s*/i);

    return (

<Document>

<Page size="A4" style={styles.page}>

{/* HEADER */}

{/* <View style={styles.header} fixed>

<Image
src="/DelhiGovLogo.png"
style={styles.logo}
/>

<View style={styles.titleBox}>

<Text style={styles.govt}>
GOVERNMENT OF NCT OF DELHI 
</Text>

<Text style={styles.dept}>
EXCISE DEPARTMENT
</Text>




<Text style={styles.reportTitle}>
APPLICATION FOR GRANT OF L-1 WHOLESALE LICENCE
</Text>

<Text style={styles.appNo}>
Application No : {applicant?.applicationIdNo}
</Text>

</View>

</View> */}


{/* <ReportHeader applicant={applicant} /> */}

{/* Applicant */}

{/* <Text style={styles.section}>
  Applicant Details
</Text> */}

<ReportHeader
  applicant={applicant}
  category={categories?.[0]}
/>


<ApplicantDetails applicant={applicant}/>






{/* 
<View style={styles.table}>

  <View style={styles.row}>
    <Text style={styles.label}>Applicant Name</Text>
    <Text style={styles.value}>{applicant?.applicantName}</Text>
  </View>

  <View style={styles.row}>
    <Text style={styles.label}>Address 1</Text>
    <Text style={styles.value}>{applicant?.addressLine1}</Text>

    <Text style={styles.label}>Address 2</Text>
    <Text style={styles.value}>{applicant?.addressLine2}</Text>
  </View>

  <View style={styles.row}>
    <Text style={styles.label}>District</Text>
    <Text style={styles.value}>{applicant?.district}</Text>

    <Text style={styles.label}>State</Text>
    <Text style={styles.value}>{applicant?.state}</Text>
  </View>

  <View style={styles.row}>
    <Text style={styles.label}>Sub Division</Text>
    <Text style={styles.value}>{applicant?.subDivision}</Text>

    <Text style={styles.label}>PIN</Text>
    <Text style={styles.value}>{applicant?.pin}</Text>
  </View>

  <View style={styles.row}>
    <Text style={styles.label}>Email</Text>
    <Text style={styles.value}>{applicant?.email}</Text>

    <Text style={styles.label}>Mobile</Text>
    <Text style={styles.value}>{applicant?.mobile}</Text>
  </View>

  <View style={styles.row}>
    <Text style={styles.label}>PAN No.</Text>
    <Text style={styles.value}>{applicant?.panNo}</Text>

    <Text style={styles.label}>Landline</Text>
    <Text style={styles.value}>{applicant?.landline}</Text>
  </View>

</View> */}



<Text style={styles.section}>
    Additional Details
</Text>

<View style={styles.table}>

    <View style={styles.row}>
        <Text style={styles.fullLabel}>Whether License Premise is</Text>
        <Text style={styles.fullValue}>{warehouse?.leasePremise}</Text>
    </View>

    <View style={styles.row}>
        <Text style={styles.fullLabel}>
            Registration No. of Lease Deed / Sale Deed / Rent Agreement
        </Text>
        <Text style={styles.fullValue}>{warehouse?.leaseRegistration}</Text>
    </View>

    <View style={styles.row}>
        <Text style={styles.fullLabel}>
            Date of Registration of Lease Deed / Sale Deed / Rent Agreement
        </Text>
        <Text style={styles.fullValue}>{warehouse?.leaseRegistrationDate}</Text>
    </View>

    <View style={styles.row}>
        <Text style={styles.fullLabel}>
            Date of Expiration of Lease Deed / Sale Deed / Rent Agreement
        </Text>
        <Text style={styles.fullValue}>{warehouse?.leaseRegistrationExpiryDate}</Text>
    </View>

    <View style={styles.row}>
        <Text style={styles.fullLabel}>
            Certified Architect Registration Number
        </Text>
        <Text style={styles.fullValue}>{warehouse?.architectRegistrationNo}</Text>
    </View>

    <View style={styles.row}>
        <Text style={styles.fullLabel}>CA Registration Valid Upto</Text>
        <Text style={styles.fullValue}>{warehouse?.architectRegistrationNoValidUpto}</Text>
    </View>

    <View style={styles.row}>
        <Text style={styles.fullLabel}>
            Total Super Area of License Premise (Sq. Ft.)
        </Text>
        <Text style={styles.fullValue}>{warehouse?.superAreaofLicensePremise}</Text>
    </View>

    <View style={styles.row}>
        <Text style={styles.fullLabel}>
            Total Carpet Area of License Premise (Sq. Ft.)
        </Text>
        <Text style={styles.fullValue}>{warehouse?.carpetAreaofLicensePremise}</Text>
    </View>

    <View style={styles.row}>
        <Text style={styles.fullLabel}>
            Distance of Distillery from C.P., Delhi (Km)
        </Text>
        <Text style={styles.fullValue}>{warehouse?.distanceofDistilleryCP}</Text>
    </View>

    <View style={styles.row}>
        <Text style={styles.fullLabel}>Hours of Sale</Text>
        <Text style={styles.fullValue}>{warehouse?.hoursofSale}</Text>
    </View>

    <View style={styles.row}>
        <Text style={styles.fullLabel}>Constitution Type</Text>
        <Text style={styles.fullValue}>{CompanyDetails?.constitutionType}</Text>
    </View>

    <View style={styles.row}>
        <Text style={styles.fullLabel}>CIN No. (Company)</Text>
        <Text style={styles.fullValue}>{CompanyDetails?.cinno}</Text>
    </View>

    <View style={styles.row}>
        <Text style={styles.fullLabel}>
            Registration No. of LLP / Firm / Society
        </Text>
        <Text style={styles.fullValue}>
            {CompanyDetails?.registrationNo}
        </Text>
    </View>

    <View style={styles.row}>
        <Text style={styles.fullLabel}>
            Date of Registration (of deed in SR)
        </Text>
        <Text style={styles.fullValue}>
            {CompanyDetails?.regDate}
        </Text>
    </View>

    <View style={styles.row}>
        <Text style={styles.fullLabel}>
            Company / Firm / Society / LLP PAN No.
        </Text>
        <Text style={styles.fullValue}>
            {CompanyDetails?.companyPAN}
        </Text>
    </View>

    <View style={styles.row}>
        <Text style={styles.fullLabel}>VAT / TIN No.</Text>
        <Text style={styles.fullValue}>{CompanyDetails?.vatno}</Text>
    </View>

    <View style={styles.row}>
        <Text style={styles.fullLabel}>
            Is Excise Nominee any other than the Director of the Company?
        </Text>
        <Text style={styles.fullValue}>
            {CompanyDetails?.isExciseNominee}
        </Text>
    </View>

</View>



<Text style={styles.section}>
    Other Mandatory Details
</Text>

{/* ================= FSSAI ================= */}

<Text style={styles.subHeading}>
    1. FSSAI Licence
</Text>

<View style={styles.table}>

    <View style={styles.row}>
        <Text style={styles.label}>Licence No./Registration No.</Text>
        <Text style={styles.value}>{CompanyDetails?.fssaiLicenceNo}</Text>

        <Text style={styles.label}>Licence Start Date</Text>
        <Text style={styles.value}>{CompanyDetails?.fssaiLicenceStartDate}</Text>
    </View>

    <View style={styles.row}>
        <Text style={styles.label}>Licence End Date</Text>
        <Text style={styles.value}>{CompanyDetails?.fssaiLicenceEndDate}</Text>

        <Text style={styles.label}></Text>
        <Text style={styles.value}></Text>
    </View>

</View>

{/* ================= GST ================= */}

<Text style={styles.subHeading}>
    2. VAT / GST Certificate
</Text>

<View style={styles.table}>

    <View style={styles.row}>
        <Text style={styles.label}>Certificate No.</Text>
        <Text style={styles.value}>{CompanyDetails?.vatgstCertNo}</Text>

        <Text style={styles.label}>End Date</Text>
        <Text style={styles.value}>{CompanyDetails?.vatgstCertEnddate}</Text>
    </View>

</View>

{/* ================= Distillery ================= */}

<Text style={styles.subHeading}>
    3. Distillery Licence
</Text>

<View style={styles.table}>

    <View style={styles.row}>
        <Text style={styles.label}>Licence No.</Text>
        <Text style={styles.value}>{CompanyDetails?.distilleryLicNo}</Text>

        <Text style={styles.label}>End Date</Text>
        <Text style={styles.value}>{CompanyDetails?.distilleryLicEnddate}</Text>
    </View>

</View>

{/* ================= Insurance ================= */}

<Text style={styles.subHeading}>
    4. BWH Insurance
</Text>

<View style={styles.table}>

    <View style={styles.row}>
        <Text style={styles.label}>Insurance No.</Text>
        <Text style={styles.value}>{CompanyDetails?.bwhInsuranceNo}</Text>

        <Text style={styles.label}>End Date</Text>
        <Text style={styles.value}>{CompanyDetails?.bwhInsuranceEndDate}</Text>
    </View>

</View>

{/* ================= Lease ================= */}

<Text style={styles.subHeading}>
    5. BWH Lease / Rent Agreement
</Text>

<View style={styles.table}>

    <View style={styles.row}>
        <Text style={styles.label}>Agreement No.</Text>
        <Text style={styles.value}>{CompanyDetails?.bwhLeaseRentAgreementNo}</Text>

        <Text style={styles.label}>End Date</Text>
        <Text style={styles.value}>{CompanyDetails?.bwhRentAgreementEndDate}</Text>
    </View>

</View>

<Text style={styles.section}>
    List of Directors / Partners
</Text>

<View style={styles.table}>



<View style={styles.headerRow}>
    <Text style={styles.headerCell}>S.No.</Text>
    <Text style={styles.headerCell}>Name</Text>
    <Text style={styles.headerCell}>Share %</Text>
    <Text style={styles.headerCell}>PAN No.</Text>
    <Text style={styles.headerCell}>Excise Nominee</Text>
    <Text style={styles.headerCell}>PAN Uploaded</Text>
    <Text style={styles.headerCell}>Address Uploaded</Text>
    <Text style={styles.headerCell}>DIN No.</Text>
</View>

{applicant.directors.map((d, index) => (
    <View style={styles.row} key={index}>
        <Text style={styles.cell}>{index + 1}</Text>
        <Text style={styles.cell}>{d.pName}</Text>
        <Text style={styles.cell}>{d.pPerShare}</Text>
        <Text style={styles.cell}>{d.pPanNo}</Text>
        <Text style={styles.cell}>{d.pExciseNominee}</Text>
        <Text style={styles.cell}>{d.panFileUploaded}</Text>
        <Text style={styles.cell}>{d.addressFileUploaded}</Text>
        <Text style={styles.cell}>{d.dinNo}</Text>
    </View>
))}






</View>

<DocumentsUploaded applicant={applicant} />


</Page>

<Page size="A4" style={styles.page}>
{/* 
 <View style={styles.header} fixed>

<Image
src="/DelhiGovLogo.png"
style={styles.logo}
/>

<View style={styles.titleBox}>

<Text style={styles.govt}>
GOVERNMENT OF NCT OF DELHI 
</Text>

<Text style={styles.dept}>
EXCISE DEPARTMENT
</Text>




<Text style={styles.reportTitle}>
L31 (License for Warehouse for storage of Indian Liquor)
</Text>

<Text style={styles.appNo}>
Application No : {applicant?.applicationIdNo}
</Text>

</View>

</View> */}

<ReportHeader
  applicant={applicant}
  category={categories?.[1]}
/>


<ApplicantDetails applicant={applicant}/>

<Text style={styles.section}>
    Wholesale & Warehouse (IL) Details
</Text>

<View style={styles.table}>

    <View style={styles.row}>
        <Text style={styles.label}>Licence Year</Text>
        <Text style={styles.value}>{warehouse?.licenseYear}</Text>

        <Text style={styles.label}>Category Applied For</Text>
        <Text style={styles.value}>{applicant?.categoryDescription}</Text>
    </View>

    <View style={styles.row}>
        <Text style={styles.label}>Warehouse Name</Text>
        <Text style={styles.value}>{warehouse?.warehouseName}</Text>

        <Text style={styles.label}>Warehouse Address 1</Text>
        <Text style={styles.value}>{warehouse?.warehouseAddress1}</Text>
    </View>

    <View style={styles.row}>
        <Text style={styles.label}>Warehouse Address 2</Text>
        <Text style={styles.value}>{warehouse?.warehouseAddress2}</Text>

        <Text style={styles.label}>State</Text>
        <Text style={styles.value}>{warehouse?.warehouseState}</Text>
    </View>

    <View style={styles.row}>
        <Text style={styles.label}>District</Text>
        <Text style={styles.value}>{warehouse?.warehouseDistrict}</Text>

        <Text style={styles.label}>Subdivision</Text>
        <Text style={styles.value}>{warehouse?.warehouseSubDivision}</Text>
    </View>

    <View style={styles.row}>
        <Text style={styles.label}>Police Station</Text>
        <Text style={styles.value}>{warehouse?.warehousePoliceStation}</Text>

        <Text style={styles.label}>PIN</Text>
        <Text style={styles.value}>{warehouse?.warehousePin}</Text>
    </View>

    <View style={styles.row}>
        <Text style={styles.label}>Warehouse Email</Text>
        <Text style={styles.value}>{warehouse?.warehouseEmail}</Text>

        <Text style={styles.label}>Warehouse Mobile</Text>
        <Text style={styles.value}>{warehouse?.warehouseMobile}</Text>
    </View>

</View>





<Text style={styles.section}>
    Additional Details
</Text>

<View style={styles.table}>

    <View style={styles.row}>
        <Text style={styles.fullLabel}>Whether License Premise is</Text>
        <Text style={styles.fullValue}>{warehouse?.leasePremise}</Text>
    </View>

    <View style={styles.row}>
        <Text style={styles.fullLabel}>
            Registration No. of Lease Deed / Sale Deed / Rent Agreement
        </Text>
        <Text style={styles.fullValue}>{warehouse?.leaseRegistration}</Text>
    </View>

    <View style={styles.row}>
        <Text style={styles.fullLabel}>
            Date of Registration of Lease Deed / Sale Deed / Rent Agreement
        </Text>
        <Text style={styles.fullValue}>{warehouse?.leaseRegistrationDate}</Text>
    </View>

    <View style={styles.row}>
        <Text style={styles.fullLabel}>
            Date of Expiration of Lease Deed / Sale Deed / Rent Agreement
        </Text>
        <Text style={styles.fullValue}>{warehouse?.leaseRegistrationExpiryDate}</Text>
    </View>

    <View style={styles.row}>
        <Text style={styles.fullLabel}>
            Certified Architect Registration Number
        </Text>
        <Text style={styles.fullValue}>{warehouse?.architectRegistrationNo}</Text>
    </View>

    <View style={styles.row}>
        <Text style={styles.fullLabel}>CA Registration Valid Upto</Text>
        <Text style={styles.fullValue}>{warehouse?.architectRegistrationNoValidUpto}</Text>
    </View>

    <View style={styles.row}>
        <Text style={styles.fullLabel}>
            Total Super Area of License Premise (Sq. Ft.)
        </Text>
        <Text style={styles.fullValue}>{warehouse?.superAreaofLicensePremise}</Text>
    </View>

    <View style={styles.row}>
        <Text style={styles.fullLabel}>
            Total Carpet Area of License Premise (Sq. Ft.)
        </Text>
        <Text style={styles.fullValue}>{warehouse?.carpetAreaofLicensePremise}</Text>
    </View>

    <View style={styles.row}>
        <Text style={styles.fullLabel}>
            Distance of Distillery from C.P., Delhi (Km)
        </Text>
        <Text style={styles.fullValue}>{warehouse?.distanceofDistilleryCP}</Text>
    </View>

    <View style={styles.row}>
        <Text style={styles.fullLabel}>Hours of Sale</Text>
        <Text style={styles.fullValue}>{warehouse?.hoursofSale}</Text>
    </View>

    <View style={styles.row}>
        <Text style={styles.fullLabel}>Constitution Type</Text>
        <Text style={styles.fullValue}>{CompanyDetails?.constitutionType}</Text>
    </View>

    <View style={styles.row}>
        <Text style={styles.fullLabel}>CIN No. (Company)</Text>
        <Text style={styles.fullValue}>{CompanyDetails?.cinno}</Text>
    </View>

    <View style={styles.row}>
        <Text style={styles.fullLabel}>
            Registration No. of LLP / Firm / Society
        </Text>
        <Text style={styles.fullValue}>
            {CompanyDetails?.registrationNo}
        </Text>
    </View>

    <View style={styles.row}>
        <Text style={styles.fullLabel}>
            Date of Registration (of deed in SR)
        </Text>
        <Text style={styles.fullValue}>
            {CompanyDetails?.regDate}
        </Text>
    </View>

    <View style={styles.row}>
        <Text style={styles.fullLabel}>
            Company / Firm / Society / LLP PAN No.
        </Text>
        <Text style={styles.fullValue}>
            {CompanyDetails?.companyPAN}
        </Text>
    </View>

    <View style={styles.row}>
        <Text style={styles.fullLabel}>VAT / TIN No.</Text>
        <Text style={styles.fullValue}>{CompanyDetails?.vatno}</Text>
    </View>

    <View style={styles.row}>
        <Text style={styles.fullLabel}>
            Is Excise Nominee any other than the Director of the Company?
        </Text>
        <Text style={styles.fullValue}>
            {CompanyDetails?.isExciseNominee}
        </Text>
    </View>

</View>







<Text style={styles.section}>
    Other Mandatory Details
</Text>

{/* ================= FSSAI ================= */}

<Text style={styles.subHeading}>
    1. FSSAI Licence
</Text>

<View style={styles.table}>

    <View style={styles.row}>
        <Text style={styles.label}>Licence No./Registration No.</Text>
        <Text style={styles.value}>{CompanyDetails?.fssaiLicenceNo}</Text>

        <Text style={styles.label}>Licence Start Date</Text>
        <Text style={styles.value}>{CompanyDetails?.fssaiLicenceStartDate}</Text>
    </View>

    <View style={styles.row}>
        <Text style={styles.label}>Licence End Date</Text>
        <Text style={styles.value}>{CompanyDetails?.fssaiLicenceEndDate}</Text>

        <Text style={styles.label}></Text>
        <Text style={styles.value}></Text>
    </View>

</View>

{/* ================= GST ================= */}

<Text style={styles.subHeading}>
    2. VAT / GST Certificate
</Text>

<View style={styles.table}>

    <View style={styles.row}>
        <Text style={styles.label}>Certificate No.</Text>
        <Text style={styles.value}>{CompanyDetails?.vatgstCertNo}</Text>

        <Text style={styles.label}>End Date</Text>
        <Text style={styles.value}>{CompanyDetails?.vatgstCertEnddate}</Text>
    </View>

</View>

{/* ================= Distillery ================= */}

<Text style={styles.subHeading}>
    3. Distillery Licence
</Text>

<View style={styles.table}>

    <View style={styles.row}>
        <Text style={styles.label}>Licence No.</Text>
        <Text style={styles.value}>{CompanyDetails?.distilleryLicNo}</Text>

        <Text style={styles.label}>End Date</Text>
        <Text style={styles.value}>{CompanyDetails?.distilleryLicEnddate}</Text>
    </View>

</View>

{/* ================= Insurance ================= */}

<Text style={styles.subHeading}>
    4. BWH Insurance
</Text>

<View style={styles.table}>

    <View style={styles.row}>
        <Text style={styles.label}>Insurance No.</Text>
        <Text style={styles.value}>{CompanyDetails?.bwhInsuranceNo}</Text>

        <Text style={styles.label}>End Date</Text>
        <Text style={styles.value}>{CompanyDetails?.bwhInsuranceEndDate}</Text>
    </View>

</View>

{/* ================= Lease ================= */}

<Text style={styles.subHeading}>
    5. BWH Lease / Rent Agreement
</Text>

<View style={styles.table}>

    <View style={styles.row}>
        <Text style={styles.label}>Agreement No.</Text>
        <Text style={styles.value}>{CompanyDetails?.bwhLeaseRentAgreementNo}</Text>

        <Text style={styles.label}>End Date</Text>
        <Text style={styles.value}>{CompanyDetails?.bwhRentAgreementEndDate}</Text>
    </View>

</View>

<Text style={styles.section}>
    List of Directors / Partners
</Text>

<View style={styles.table}>



<View style={styles.headerRow}>
    <Text style={styles.headerCell}>S.No.</Text>
    <Text style={styles.headerCell}>Name</Text>
    <Text style={styles.headerCell}>Share %</Text>
    <Text style={styles.headerCell}>PAN No.</Text>
    <Text style={styles.headerCell}>Excise Nominee</Text>
    <Text style={styles.headerCell}>PAN Uploaded</Text>
    <Text style={styles.headerCell}>Address Uploaded</Text>
    <Text style={styles.headerCell}>DIN No.</Text>
</View>

{applicant.directors.map((d, index) => (
    <View style={styles.row} key={index}>
        <Text style={styles.cell}>{index + 1}</Text>
        <Text style={styles.cell}>{d.pName}</Text>
        <Text style={styles.cell}>{d.pPerShare}</Text>
        <Text style={styles.cell}>{d.pPanNo}</Text>
        <Text style={styles.cell}>{d.pExciseNominee}</Text>
        <Text style={styles.cell}>{d.panFileUploaded}</Text>
        <Text style={styles.cell}>{d.addressFileUploaded}</Text>
        <Text style={styles.cell}>{d.dinNo}</Text>
    </View>
))}






</View>



<DocumentsUploaded applicant={applicant} />







    {/* Applicant Details Again
    <ApplicantDetails applicant={applicant} />

  
    <WarehouseDetails warehouse={applicant.warehouseDetails} />

  
    <ReportFooter /> */}




{/* Applicant */}



</Page>





</Document>


 );
};
export default ReportPrintL1;
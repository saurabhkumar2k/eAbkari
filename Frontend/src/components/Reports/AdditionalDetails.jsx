
import { styles } from "../../components/Reports/ReportStyles";

import {
  Document,
  Page,
  View,
  Text,
  Image,
  StyleSheet
} from "@react-pdf/renderer";

const ApplicantDetails = ({ applicant }) => {
    return (
        <>
            <Text style={styles.section}>
              Applicant Details
            </Text>
            
            <View style={styles.table}>
            
              <View style={styles.row}>
                <Text style={styles.label}>Applicant Name</Text>
                <Text style={styles.fullValue}>{applicant?.applicantName}</Text>
            
                {/* <Text style={styles.label}>Company Name</Text>
                <Text style={styles.value}>{applicant?.companyName}</Text> */}
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
            
            </View>
            
            
        </>
    );
};

export default ApplicantDetails;
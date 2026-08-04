import { styles } from "../../components/Reports/ReportStyles";

import {
  Document,
  Page,
  View,
  Text,
  Image,
  StyleSheet
} from "@react-pdf/renderer";


const ReportHeader = ({ applicant ,category }) => (
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
{/* 
            <Text style={styles.title}>
                L1 (Grant of License for Wholesale Vend of Indian Liquor)
            </Text>

`{applicant?.categoryDescription
  ?.split(" and ")
  .map((item, index) => (
    <Text key={index} style={styles.title}>
      {item.trim()}
    </Text>
  ))}` */}

<Text style={styles.reportTitle}>
{category}
</Text>



  {/* <Text style={styles.title}>
               {category}
            </Text> */}

            <Text style={styles.appId}>
                Application Id No. {applicant?.applicationIdNo}
            </Text>

        </View>
    </View>
);

export default ReportHeader;




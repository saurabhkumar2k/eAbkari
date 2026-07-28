
import { styles } from "../../components/Reports/ReportStyles";

import {
  Document,
  Page,
  View,
  Text,
  Image,
  StyleSheet
} from "@react-pdf/renderer";

const DocumentsUploaded = ({ applicant }) => {
    return (
        <>
<Text style={styles.section}>
    Documents Uploaded
</Text>

<View style={styles.table}>

    <View style={styles.headerRow}>

        <Text style={styles.headerCell}>
            S.No.
        </Text>

        <Text style={[styles.headerCell, { flex: 4 }]}>
            Document Name
        </Text>

        <Text style={[styles.headerCell, { flex: 2 }]}>
            Uploaded
        </Text>

    </View>

    {applicant.documents ?.map((doc, index) => (

        <View style={styles.row} key={index}>

            <Text style={styles.cell}>
                {index + 1}
            </Text>

            <Text style={[styles.cell, { flex: 4 }]}>
                {doc.docDesc}
            </Text>

            <Text style={[styles.cell, { flex: 2 }]}>
                {doc.docAppl}
            </Text>

        </View>

    ))}

</View>

            
            
        </>
    );
};

export default DocumentsUploaded;
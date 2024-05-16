import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
// import { fetchData } from './api'; // Import function to fetch data from your database

const styles = StyleSheet.create({
  page: {
    padding: 20,
  },
  section: {
    marginBottom: 10,
  },
});

export const PDFReport = () => {
//   const data = fetchData(); // Fetch data from your database

  return (
    <Document>
      <Page style={styles.page}>
        <View style={styles.section}>
          <Text>Report Title</Text>
        </View>
        {/* Render data from your database here */}
        <View style={styles.section}>
          <Text>Data Section 1:</Text>
          {data.section1.map((item, index) => (
            <Text key={index}>{item}</Text>
          ))}
        </View>
        <View style={styles.section}>
          <Text>Data Section 2:</Text>
          {data.section2.map((item, index) => (
            <Text key={index}>{item}</Text>
          ))}
        </View>
      </Page>
    </Document>
  );
};
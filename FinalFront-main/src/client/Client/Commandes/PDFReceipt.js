import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

// Define styles for the PDF document
const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 12,
    padding: 20,
  },
  title: {
    fontSize: 18,
    marginBottom: 10,
  },
  section: {
    marginBottom: 10,
  },
});

// Define the PDFReceipt component
const PDFReceipt = ({ data }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View>
          <Text style={styles.title}>Receipt</Text>
          <View style={styles.section}>
            <Text>Date: {data.date}</Text>
            <Text>N° de commande: {data.orderNumber}</Text>
          </View>
          <View style={styles.section}>
            {data.products.map((item, index) => (
              <View key={index}>
                <Text>{item.name}</Text>
                <Text>
                  {Number(item.price_unit).toFixed(2)} *{" "}
                  {Number(item.order_uom_qty) / Number(item.qty_conditionnee)} *{" "}
                  {Number(item.qty_conditionnee)}
                </Text>
                <Text>
                  Total:{" "}
                  {Number(item.price_unit) * Number(item.product_uos_qty)}
                </Text>
              </View>
            ))}
          </View>
          <View style={styles.section}>
            <Text>Montant hors taxes: {data.subTotal} DZ</Text>
            <Text>Taxes: {data.tax} DZ</Text>
          </View>
          <View style={styles.section}>
            <Text>Total: {data.total} DZ</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default PDFReceipt;

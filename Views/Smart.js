import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, FlatList, Image } from "react-native";
// import { useNavigation } from "@react-navigation/native";
import axios from "axios";

const InforDevice = () => {
  const navigation = useNavigation();

  const [data, setData] = useState([]);

  useEffect(() => {
    // Gọi đường API
    axios.get("http://localhost:4444/getall")
      .then(response => {
        // In ra dữ liệu trả về
        console.log(response.data);
        setData(response.data);
      })
      .catch(error => console.log(error));
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      {/* <Image source={{ uri: item.image }} style={styles.image} /> */}
      <Text style={styles.customer_name}>{item.customer_name}</Text>
      <Text style={styles.address}>{item.address}</Text>
      <Text style={styles.phone_number}>{item.phone_number}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  itemContainer: {
    marginBottom: 20,
    backgroundColor: "#f0f0f0",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    marginBottom: 5,
  },
  type: {
    fontSize: 16,
    color: "#007BFF",
  },
});

export default InforDevice;

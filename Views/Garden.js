import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import init from "react_native_mqtt";
import axios from "axios";

init({
  size: 10000,
  storageBackend: AsyncStorage,
  defaultExpires: 1000 * 3600 * 24,
  enableCache: true,
  sync: {},
});

const options = {
  host: "broker.emqx.io",
  port: 8083,
  path: "/sonlong_test1",
  id: "id_" + parseInt(Math.random() * 100000),
};

const client = new Paho.MQTT.Client(options.host, options.port, options.path);

const Garden = ({ navigation }) => {
  const [msg, setMsg] = useState("No message");
  const [statusLed, setStatusLed] = useState("off");
  const [soilMoisture, setSoilMoisture] = useState("N/A");
  // const [temperature, setTemperature] = useState("N/A");
  // const [humidity, setHumidity] = useState("N/A");

  useEffect(() => {
    connect();
    client.onMessageArrived = onMessageArrived;
  }, []);

  const connect = async () => {
    console.log("connect MQTT broker ok!");
    client.connect({
      onSuccess: () => {
        console.log("connect ok!");
        subscribeTopic();
      },
      useSSL: false,
      timeout: 3,
      onFailure: () => {
        console.log("fail");
      },
    });
  };

  const subscribeTopic = () => {
    client.subscribe("sonlong\leadstatus", { qos: 0 });
    client.subscribe("sonlong/Soil Moisture", { qos: 0 });
  };

  const onMessageArrived = async (message) => {
    console.log("onMessageArrived:" + message.payloadString);
    setMsg(message.payloadString);
    const jsondata = JSON.parse(message.payloadString);
    console.log(jsondata.message);
    setStatusLed(jsondata.status);

    try {
      const jsondata = JSON.parse(message.payloadString);
      console.log(jsondata.message);

      if (jsondata.name === "led") {
        setStatusLed(jsondata.status);
      } else if (jsondata.name === "Relay") {
        // Check if "Do Am Dat" key exists in the payload before updating soilMoisture
        if ("Do Am Dat" in jsondata) {
          setSoilMoisture(jsondata["Do Am Dat"]);
        }
        // if ("Humidity" in jsondata) {
        //   setHumid(jsondata["Humidity"]);
        // }
        // if ("Temperature" in jsondata) {
        //   setTemp(jsondata["Temperature"]);
        // }
      }
    } catch (error) {
      console.error("Error parsing MQTT message:", error);
    }
  };

  const publishTopic = (deviceStatus) => {
    const s =
      '{"message":"turn on/offled","name":"led","status":"' + deviceStatus + '"}';
    var message = new Paho.MQTT.Message(s);
    message.destinationName = "sonlong\\leadstatus";
    client.send(message);
  };

  const handleButtonOn = async () => {
    console.log("turn on led...");
    publishTopic("on");
    await axios.put("http://localhost:3333/put/1", 
    { 
      soil_moisture: soilMoisture,
      relay_status: "on",
     
    
    }
    );
  };

  const handleButtonOff = async () => {
    console.log("turn off led...");
    publishTopic("off");
    await axios.put("http://localhost:3333/put/1", 
    { 
      soil_moisture: 50,
      relay_status: "off",
      
    }
    );
  };

  return (
    <View style={styles.containerLedView}>
      <View style={styles.header}>
        <Ionicons name="logo-windows" size={64} color="dark" />
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Ionicons name="thunderstorm-outline" size={40} color="dark"></Ionicons>
        <Text style={styles.title}>PROJECT CUỐI KÌ</Text>
    </View>
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Ionicons name="person-outline" size={40} color="black"></Ionicons>
        <Text style={styles.subTitle}>THCNTT3</Text>
    </View>
      </View>
      <View style={styles.main}>
        {statusLed == "on" ? (
          <View style={styles.boxLightOn}>
            <Ionicons name="sunny-outline" size={64} color="orange" />
          </View>
        ) : (
          <View style={styles.boxLightOff}>
            <Ionicons name="sunny-outline" size={64} color="grey" />
          </View>
        )}
        <View style={styles.controlGroup}>
          <TouchableOpacity
            style={[styles.btnOff, styles.btn]}
            onPress={() => handleButtonOff()}
          >
            <Text style={styles.btnText}>OFF</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.btnOn, styles.btn]}
            onPress={() => handleButtonOn()}
          >
            <Text style={styles.btnText}>ON</Text>
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Ionicons name="leaf-outline" size={40} color="black"></Ionicons>
        <Text style={styles.subTitle}>Soil Moisture: {soilMoisture}</Text>
    </View>
        
      </View>
      <View >
        <Text style={styles.footer}>CHÀO MỪNG BẠN ĐẾN VỚI THỰC HÀNH CÔNG NGHỆ THÔNG TIN 3</Text>
    </View>
    
    </View>
  );
};

const styles = StyleSheet.create({
  containerLedView: {
    flex: 1,
    backgroundColor: "#99f0a3",
    padding: 15,
  },
  header: {
    alignItems: "center",
  },
  title: {
    fontSize: 40,
    fontStyle: "bold",
    color: "orange",
  },
  subTitle: {
    fontSize: 20,
    fontStyle: "bold",
    color: "black",
  },
  footer: {
    position: 'absolute',
    bottom: 0,
  },
  title: {
    fontSize: 20,
    marginLeft: 5, // Adjust the margin as needed
  },
  main: {
    flex: 5,
    marginTop: 30,
    alignItems: "center",
  },
  controlGroup: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  btn: {
    alignItems: "center",
    width: 100,
    marginBottom: 5,
    marginTop: 5,
    justifyContent: "center",
    marginRight: 15,
    padding: 15,
    borderRadius: 5,
  },
  btnOn: {
    backgroundColor: "navy",
  },
  btnOff: { backgroundColor: "maroon" },
  btnText: {
    color: "#FFFFFF",
  },
  boxLightOff: {
    width: 100,
    height: 100,
    borderWidth: 2,
    borderRadius: 5,
    borderColor: "grey",
    padding: 15,
  },
  boxLightOn: {
    width: 100,
    height: 100,
    borderWidth: 2,
    borderRadius: 5,
    borderColor: "orange",
    padding: 15,
  },
});

export default Garden;
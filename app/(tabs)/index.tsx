import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import {
  Alert,
  Image,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import ViewShot, { captureRef } from "react-native-view-shot";

import { useRef } from "react";

export default function HomeScreen() {
  const viewShotRef = useRef(null);

  const handleShare = async () => {
    if (!viewShotRef.current) return;

    try {
      // Capture screenshot

      const uri = await captureRef(viewShotRef.current, {
        format: "jpg",
        quality: 0.8,
      });

      console.log(uri, "jwknf");

      if (!uri) return;

      const filePath = `${FileSystem.cacheDirectory}qrcode.jpg`;
      // Save to cache
      await FileSystem.copyAsync({ from: uri, to: filePath });

      // Ensure the file exists
      const fileInfo = await FileSystem.getInfoAsync(filePath);
      if (!fileInfo.exists) {
        console.error("File does not exist:", filePath);
        return;
      }

      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(filePath, {
          mimeType: "image/jpeg",
          dialogTitle: "Share QR Code",
        });
      } else {
        await Share.share({
          message: "Here is the QR code.",
          url: filePath,
        });
      }
    } catch (error) {
      console.error("Error sharing QR code:", error);
      Alert.alert("Error", "Failed to share QR code.");
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ViewShot
        ref={viewShotRef}
        options={{ fileName: "qr_code", format: "png", quality: 1.0 }}
      >
        <View style={styles.container}>
          <Image
            source={{
              uri: "https://via.placeholder.com/100",
            }}
            style={styles.avatar}
          />
          <Text style={styles.name}>{"User"}</Text>
          <Text style={styles.amount}>{"0.00"}</Text>
          <TouchableOpacity onPress={handleShare} style={styles.shareButton}>
            <Text style={styles.shareText}>Share QR Code</Text>
          </TouchableOpacity>
        </View>
      </ViewShot>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "#000",
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
  },
  amount: {
    fontSize: 24,
    fontWeight: "bold",
  },
  shareButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#007BFF",
    borderRadius: 5,
  },
  shareText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

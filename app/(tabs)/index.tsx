import { Alert, Button, Share, StyleSheet, View } from "react-native";
import { captureRef } from "react-native-view-shot";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";

import { useRef } from "react";

export default function HomeScreen() {
  const viewShotRef = useRef(null);

  const handleShare = async () => {
    if (!viewShotRef.current) return;

    try {
      // Capture screenshot
      const uri = await captureRef(viewShotRef, {
        format: "jpg",
        quality: 0.8,
      });
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
    <View
      ref={viewShotRef}
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <Button title="Share QR Code" onPress={handleShare} />
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});

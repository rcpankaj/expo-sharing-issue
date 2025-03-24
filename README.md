# 📌 Expo Sharing Issue on iOS Gmail

This repository demonstrates an issue where **Gmail on iOS does not attach images** when using `Sharing.shareAsync()` in an **Expo React Native (Managed Workflow)** app. The issue is specific to **Gmail on iOS**—it works fine on **Slack, Mail, WhatsApp, and Android Gmail**.

---

## 📂 Project Setup

### 1️⃣ Clone the repository

```sh
git clone https://github.com/rcpankaj/expo-sharing-issue.git
cd expo-sharing-issue
```

2️⃣ Install dependencies
sh
Copy
Edit
npm install # or yarn install
3️⃣ Run the development build
sh
Copy
Edit
expo start --dev-client
4️⃣ Test the share functionality:
Click the "Share QR Code" button.

Select Gmail on iOS as the sharing option.

🛠 Issue Description
When using Sharing.shareAsync() to share an image, the Gmail compose window opens with the text message but does not attach the image.

The same code works with Slack, Mail, and other apps.

The issue only happens on iOS Gmail.

Expected Behavior
✅ The Gmail compose window should open with the image attached.

Actual Behavior
❌ The Gmail compose window opens, but only the text appears—image is missing.

📌 Code Example
tsx
Copy
Edit
const handleShare = async () => {
if (!viewShotRef.current) return;

try {
const uri = await captureRef(viewShotRef, {
format: 'jpg',
quality: 0.8,
});
if (!uri) return;

    const filePath = `${FileSystem.cacheDirectory}qrcode.jpg`;
    await FileSystem.copyAsync({ from: uri, to: filePath });

    if (await Sharing.isAvailableAsync()) {
      await Sharing.shareAsync(filePath, {
        mimeType: 'image/jpeg',
        dialogTitle: 'Share QR Code',
      });
    } else {
      await Share.share({
        message: 'Here is the QR code.',
        url: filePath,
      });
    }

} catch (error) {
console.error('Error sharing QR code:', error);
}
};
🔍 Debugging Attempts
✔️ Verified that the file exists using FileSystem.getInfoAsync().
✔️ Tried setting mimeType: 'image/jpeg'.
✔️ Tested MailComposer, but Gmail still ignores the attachment.
✔️ Confirmed the issue does not exist on Android Gmail.

📌 Environment Details
Expo SDK Version: Run expo --version to confirm.

React Native Version: Managed workflow (expo-dev-client)

Platform: iOS (Issue only in Gmail, works fine on Android)

Latest Expo Version: ✅ Tested & issue still exists

🚀 Possible Workarounds & Help Needed
Is this a known limitation with expo-sharing or expo-file-system?

Any suggestions to force Gmail to recognize the image attachment?

Would setting UTI: 'public.jpeg' or another workaround be needed?

📄 License
This project is open-source and available under the MIT License.

yaml
Copy
Edit

---

### 📌 **How to Use This File**

1. **Save it as `README.md`** in your project root.
2. **Push it to GitHub:**
   ```sh
   git add README.md
   git commit -m "Add README"
   git push origin main
   This README will provide a clear and structured report of your issue for GitHub. 🚀 Let me know if you need any changes!
   ```

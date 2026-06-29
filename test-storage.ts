import { initializeApp } from 'firebase/app';
import { getStorage, ref, uploadString, getDownloadURL } from 'firebase/storage';
import fs from 'fs';

const config = JSON.parse(fs.readFileSync('./firebase-applet-config.json', 'utf-8'));
const app = initializeApp({
  apiKey: config.apiKey,
  authDomain: config.authDomain,
  projectId: config.projectId,
  storageBucket: config.storageBucket,
  messagingSenderId: config.messagingSenderId,
  appId: config.appId
});

const storage = getStorage(app);

async function run() {
  try {
    console.log("Writing to Storage...");
    const storageRef = ref(storage, "gallery/test_" + Date.now() + ".jpg");
    await uploadString(storageRef, 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAP', 'data_url');
    console.log("Write success!");
    const url = await getDownloadURL(storageRef);
    console.log("Download URL:", url);
    process.exit(0);
  } catch (err) {
    console.error("Write failed:", err);
    process.exit(1);
  }
}
run();

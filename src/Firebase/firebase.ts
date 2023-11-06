import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object


/*const firebaseConfig = {
    apiKey: process.env.API_KEY_FIREBASE,
    authDomain: process.env.AUTH_DOMAIN_FIREBASE,
    projectId: process.env.PROJECT_ID_FIREBASE,
    storageBucket: process.env.STORAGE_BUCKET_FIREBASE,
    messagingSenderId: process.env.MESSAGING_SENDERID_FIREBASE,
    appId: process.env.APP_ID_FIREBASE,
    measurementId: process.env.MEASUREMENT_ID_FIREBASE,
};*/

const firebaseConfig = {
    apiKey: "AIzaSyBOnOk-Ajt6oN2FPOnPS1ZpRjFkkG_fBTI",
    authDomain: "technolife-c974d.firebaseapp.com",
    projectId: "technolife-c974d",
    storageBucket: "technolife-c974d.appspot.com",
    messagingSenderId: "636387574562",
    appId: "1:636387574562:web:a807bf09f51b625d581b7b",
    measurementId: "G-PXLC7GM21F"
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Cloud Storage and get a reference to the service
export const storage = getStorage(app);


/**
 * 
 * @param {File} file File to Upload
 * @returns {Promise<string>} URL of the uploaded file
 */
export async function UploadFile(file: Blob | Uint8Array | ArrayBuffer): Promise<string> {
    const storageRef = ref(storage, `productImage/image${crypto.randomUUID()}`)
    await uploadBytes(storageRef, file)
    const url = await getDownloadURL(storageRef)
    return url
}


export async function UploadProfilePhoto(file: Blob | Uint8Array | ArrayBuffer): Promise<string> {
    const storageRef = ref(storage, `profilephoto/image${crypto.randomUUID()}`)
    await uploadBytes(storageRef, file)
    const url = await getDownloadURL(storageRef)
    return url
}
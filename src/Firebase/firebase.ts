import { initializeApp } from "firebase/app"
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage"

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY_FIREBASE,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN_FIREBASE,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID_FIREBASE,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET_FIREBASE,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDERID_FIREBASE,
  appId: process.env.NEXT_PUBLIC_APP_ID_FIREBASE,
  measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID_FIREBASE,
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize Cloud Storage and get a reference to the service
export const storage = getStorage(app)

/**
 *
 * @param {File} file File to Upload
 * @returns {Promise<string>} URL of the uploaded file
 */
export async function UploadFile(
  file: Blob | Uint8Array | ArrayBuffer,
  typeImage: string,
  nameImage: string
): Promise<string> {
  try {
    const storageRef = ref(storage, `${typeImage}/${nameImage}`)
    await uploadBytes(storageRef, file)
    const url = await getDownloadURL(storageRef)
    return url
  } catch (error) {
    console.log(error)
    return ""
  }
}

export async function GetURLFile(typeImage: string, nameImage: string) {
  const storageRef = ref(storage, `${typeImage}/${nameImage}`)
  const url = await getDownloadURL(storageRef)
  return url
}

export async function DeleteFile(folder: string, name: string) {
  const desertRef = ref(storage, `${folder}/${name}`)
  try {
    await deleteObject(desertRef)
  } catch (error) {
    console.log(error)
  }
}

export async function UploadProfilePhoto(file: Blob | Uint8Array | ArrayBuffer): Promise<string> {
  const storageRef = ref(storage, `profilephoto/image${crypto.randomUUID()}`)
  await uploadBytes(storageRef, file)
  const url = await getDownloadURL(storageRef)
  return url
}

export async function GetLinkDownload(folder: string, name: string) {
  const storageRef = ref(storage, `${folder}/${name}`)
  const url = await getDownloadURL(storageRef)
  return url
}

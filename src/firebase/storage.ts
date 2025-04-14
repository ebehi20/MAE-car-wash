import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
  listAll
} from 'firebase/storage';
import { storage } from './config';

export const storageService = {
  // Upload a file
  async uploadFile(path: string, file: File) {
    const storageRef = ref(storage, path);
    const snapshot = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL;
  },

  // Delete a file
  async deleteFile(path: string) {
    const storageRef = ref(storage, path);
    await deleteObject(storageRef);
  },

  // List files in a directory
  async listFiles(path: string) {
    const storageRef = ref(storage, path);
    const result = await listAll(storageRef);
    const urls = await Promise.all(
      result.items.map(async (itemRef) => {
        const url = await getDownloadURL(itemRef);
        return {
          name: itemRef.name,
          url,
          fullPath: itemRef.fullPath
        };
      })
    );
    return urls;
  }
}; 
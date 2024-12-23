import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { DB_COLLECTIONS } from "./auth";
import { db } from "../firebase";

export const getAllUsers = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, DB_COLLECTIONS.USERS));
    return querySnapshot.docs?.map((doc) => ({ id: doc?.id, ...doc?.data() }));
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const deleteUserWithId = async (userId) => {
  await deleteDoc(doc(db, DB_COLLECTIONS.USERS, userId));
};

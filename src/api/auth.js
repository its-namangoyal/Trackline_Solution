import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { adminAuth, db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";

export const DB_COLLECTIONS = {
  USERS: "users",
  VEHICLES: "vehicles",
  TRIPS: "trips",
};

export const registerUser = async (data) => {
  try {
    const {
      email,
      password,
      firstName,
      lastName,
      phoneNumber,
      role,
      photoURL,
    } = data;

    const { user } = await createUserWithEmailAndPassword(
      adminAuth,
      email,
      password
    );

    await updateProfile(user, {
      fullName: `${firstName} ${lastName}`,
      displayName: firstName,
    });

    await setDoc(doc(db, DB_COLLECTIONS.USERS, user?.uid), {
      email,
      firstName,
      lastName,
      role,
      phoneNumber,
      photoURL: photoURL | "",
      totalTrips: 0,
      totalVehicles: 0,
    });

    return user;
  } catch (error) {
    console.error(error);
    const errorCode = error.code;
    const errorMessage = error.message;
    return { errorCode, errorMessage };
  }
};

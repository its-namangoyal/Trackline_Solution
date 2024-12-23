import {
  addDoc,
  collection,
  collectionGroup,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  increment,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../firebase";
import { DB_COLLECTIONS } from "./auth";

export const registerVehicle = async (data) => {
  const vehicleRef = collection(
    db,
    DB_COLLECTIONS.USERS,
    data?.owner,
    DB_COLLECTIONS.VEHICLES
  );

  await addDoc(vehicleRef, {
    ...data,
    vehicleTotalTrips: 0,
    co2Km: 0,
    co2M: 0,
  });

  const userDocRef = doc(db, DB_COLLECTIONS.USERS, data?.owner);
  await updateDoc(userDocRef, { totalVehicles: increment(1) });
};

export const getAllVehicles = async () => {
  const allVehicles = [];

  // Query all vehicles subcollections
  const vehiclesCollectionGroup = collectionGroup(db, DB_COLLECTIONS.VEHICLES);
  const vehiclesSnapshot = await getDocs(vehiclesCollectionGroup);

  // Add each vehicle to the allVehicles array
  for (const vehicleDoc of vehiclesSnapshot.docs) {
    const ownerId = vehicleDoc.ref.parent.parent.id; // Assuming the parent of the vehicles subcollection is the user document
    const ownerDocRef = doc(db, DB_COLLECTIONS.USERS, ownerId);
    const ownerDoc = await getDoc(ownerDocRef);

    if (ownerDoc.exists()) {
      const { firstName, lastName } = ownerDoc.data();
      const ownerName = `${firstName} ${lastName}`;
      allVehicles.push({
        id: vehicleDoc.id,
        ownerId,
        ownerName,
        ...vehicleDoc.data(),
      });
    }
  }

  return allVehicles;
};

export const deleteVehicle = async (ownerId, vehicleId) => {
  await deleteDoc(
    doc(db, DB_COLLECTIONS.USERS, ownerId, DB_COLLECTIONS.VEHICLES, vehicleId)
  );

  await updateDoc(doc(db, DB_COLLECTIONS.USERS, ownerId), {
    totalVehicles: increment(-1),
  });
};

export const editVehicle = async (ownerId, vehicleId, newData) => {
  try {
    console.log(
      "Editing vehicle with ownerId:",
      ownerId,
      "and vehicleId:",
      vehicleId
    );

    const vehicleDocRef = doc(
      db,
      DB_COLLECTIONS.USERS,
      ownerId,
      DB_COLLECTIONS.VEHICLES,
      vehicleId
    );

    await updateDoc(vehicleDocRef, newData);

    console.log("Vehicle updated successfully:", vehicleId);
  } catch (error) {
    console.error("Failed to update vehicle:", error);
    throw new Error("Failed to update vehicle.");
  }
};

// export const fetchVehicleById = async (vehicleId) => {
//   try {
//     const vehicleDocRef = doc(db, DB_COLLECTIONS.VEHICLES, vehicleId);
//     const vehicleDoc = await getDoc(vehicleDocRef);

//     if (vehicleDoc.exists()) {
//       return vehicleDoc.data();
//     } else {
//       console.log(`Vehicle with id ${vehicleId} not found.`);
//       return null; // Or throw an error if necessary
//     }
//   } catch (error) {
//     console.error("Error fetching vehicle:", error);
//     throw new Error("Failed to fetch vehicle.");
//   }
// };

export const fetchVehicleById = async (ownerId, vehicleId) => {
  // Reference to the specific vehicle document
  const vehicleDocRef = doc(
    db,
    DB_COLLECTIONS.USERS,
    ownerId,
    DB_COLLECTIONS.VEHICLES,
    vehicleId
  );

  // Fetch the vehicle document
  const vehicleDoc = await getDoc(vehicleDocRef);

  if (vehicleDoc.exists()) {
    // Fetch the owner document
    const ownerDocRef = doc(db, DB_COLLECTIONS.USERS, ownerId);
    const ownerDoc = await getDoc(ownerDocRef);

    if (ownerDoc.exists()) {
      const { firstName, lastName } = ownerDoc.data();
      const ownerName = `${firstName} ${lastName}`;
      return {
        id: vehicleDoc.id,
        ownerId,
        ownerName,
        ...vehicleDoc.data(),
      };
    }
  }

  // If no vehicle or owner is found
  return null;
};

export const getAllUsers = async () => {
  const users = [];

  try {
    const usersCollection = collection(db, DB_COLLECTIONS.USERS);
    const usersSnapshot = await getDocs(usersCollection);

    usersSnapshot.forEach((doc) => {
      users.push({ id: doc.id, ...doc.data() });
    });

    return users;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw new Error("Failed to fetch users.");
  }
};

import {
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { ICarProps } from "../redux/carsSlice";

export const getUserDb = async (id: string) => {
  const favoritesRef = doc(db, "users", id);
  const documents = await getDoc(favoritesRef);
  return documents.data();
};

export const getCarsDb = async () => {
  let arrayCars: any = [];
  const querySnapshot = await getDocs(collection(db, "cars"));
  querySnapshot.forEach((doc) => {
    arrayCars.push({ ...doc.data(), id: doc.id });
  });
  return arrayCars;
};

export const getFavoritesCarUserBd = async (id: string) => {
  const user = await getUserDb(id);
  return user?.carFavorites;
};

export const addFavoriteCarBd = async (id: string, car: ICarProps) => {
  const userRef = doc(db, "users", id);
  try {
    await updateDoc(userRef, {
      carFavorites: arrayUnion({
        model: car.model,
        autoMaker: car.autoMaker,
        amount: car.amount,
        typeFuel: car.typeFuel,
        category: car.category,
        img: car.img,
        seats: car.seats,
        gear: car.gear,
      }),
    });

    return true;
  } catch (e) {
    return false;
  }
};

export const removeFavoriteCarBd = async (id: string, car: ICarProps) => {
  const userRef = doc(db, "users", id);
  try {
    await updateDoc(userRef, {
      carFavorites: arrayRemove({
        model: car.model,
        autoMaker: car.autoMaker,
        amount: car.amount,
        typeFuel: car.typeFuel,
        category: car.category,
        img: car.img,
        seats: car.seats,
        gear: car.gear,
      }),
    });

    return true;
  } catch (e) {
    return false;
  }
};

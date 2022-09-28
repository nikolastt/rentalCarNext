import {
  addDoc,
  arrayRemove,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { IUserProps } from "../pages/Booking";
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

  await setDoc(doc(db, "carFavorites", car.id as string), {
    model: car.model,
    autoMaker: car.autoMaker,
    amount: car.amount,
    typeFuel: car.typeFuel,
    category: car.category,
    img: car.img,
    seats: car.seats,
    gear: car.gear,
  });

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
};

export const removeFavoriteCarBd = async (id: string, car: ICarProps) => {
  const userRef = doc(db, "users", id);

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

  await deleteDoc(doc(db, "carFavorites", car.id as string));
};

export const addVeicleLocated = async (
  car: ICarProps,
  extra1: number,
  extra2: number,
  valueDateLocation: Date | null,
  valueDateDevolution: Date | null,
  id: String,
  userId: string
) => {
  const ref = collection(db, "rentedCars");

  await addDoc(ref, {
    model: car.model,
    autoMaker: car.autoMaker,
    amount: car.amount,
    typeFuel: car.typeFuel,
    category: car.category,
    img: car.img,
    seats: car.seats,
    gear: car.gear,
    userId,
    extra1,
    extra2,
    valueDateLocation: valueDateLocation?.toDateString(),
    valueDateDevolution: valueDateDevolution?.toDateString(),
    id,
  });

  const userRef = doc(db, "users", userId);

  await updateDoc(userRef, {
    rentedCars: arrayUnion({
      model: car.model,
      autoMaker: car.autoMaker,
      amount: car.amount,
      typeFuel: car.typeFuel,
      category: car.category,
      img: car.img,
      seats: car.seats,
      gear: car.gear,
      extra1,
      extra2,
      valueDateLocation: valueDateLocation?.toDateString(),
      valueDateDevolution: valueDateDevolution?.toDateString(),
      id,
    }),
  });
};

export const getAllRentedCars = async () => {
  let arrayRentedCars: any = [];
  const querySnapshot = await getDocs(collection(db, "rentedCars"));
  querySnapshot.forEach((doc) => {
    arrayRentedCars.push({ ...doc.data(), id: doc.id });
  });
  return arrayRentedCars;
};

export const getCar = async (carId: string) => {
  const docRef = doc(db, "cars", carId);
  const document = await getDoc(docRef);
  return document.data();
};

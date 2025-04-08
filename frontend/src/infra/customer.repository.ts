import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  UserCredential,
} from "firebase/auth";
import firebase from "firebase/app";
import "firebase/database";
import { Database } from "firebase/database";
import {
  doc,
  setDoc,
  collection,
  Firestore,
  query,
  where,
  documentId,
  getDoc,
} from "firebase/firestore";
import { Customer } from "../domain/customer/customer.entity";
import { db } from "./firebase";

export const customerRepository = {
  async register(uid: string, customer: Customer): Promise<void> {
    const customDocRef = doc(collection(db, "customers"), uid);
    await setDoc(customDocRef, customer.toJSON());
  },

  async getByID(id: string): Promise<Customer> {
    const docRef = doc(db, "customers", id);
    const docSnap = await getDoc(docRef);
    const customerDomainModel = Customer.toDomainModel(
      docSnap.id,
      docSnap.data()?.firstName,
      docSnap.data()?.lastName,
      docSnap.data()?.username,
      docSnap.data()?.email,
      docSnap.data()?.gender,
      docSnap.data()?.birthDate,
      docSnap.data()?.fullName,
      docSnap.data()?.introduction
    );
    return customerDomainModel;
  },
};

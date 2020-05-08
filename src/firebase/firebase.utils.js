import firebase from "firebase/app";
import "firebase/firestore"; //for database
import "firebase/auth"; //for authorization

const config = {
  apiKey: "AIzaSyD5XhzpJcAAuGvcDg3FoecZZt_aVPze86Q",
  authDomain: "crown-db-9f6ed.firebaseapp.com",
  databaseURL: "https://crown-db-9f6ed.firebaseio.com",
  projectId: "crown-db-9f6ed",
  storageBucket: "crown-db-9f6ed.appspot.com",
  messagingSenderId: "954507699917",
  appId: "1:954507699917:web:d2753dc2f2dc1f4a9dab84",
  measurementId: "G-R1NGFD3QXN",
};
firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};

export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const collectionRef = firestore.collection(collectionKey);

  const batch = firestore.batch();
  objectsToAdd.forEach((obj) => {
    const newDocRef = collectionRef.doc();
    batch.set(newDocRef, obj);
  });

  return await batch.commit();
};

export const convertCollectionsSnapshotToMap = (collections) => {
  const transformedCollection = collections.docs.map((doc) => {
    const { title, items } = doc.data();

    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items,
    };
  });

  return transformedCollection.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection;
    return accumulator;
  }, {});
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

//FOR GOOGLE AUTHENTICATION

const provider = new firebase.auth.GoogleAuthProvider();

provider.setCustomParameters({ prompt: "select_account" });
//WE USED THIS BECAUSE WE ALWAYS WANT TO TRIGGER GOOGLE POP UP WHENEVER WE USE GoogleAuthProvider()
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;

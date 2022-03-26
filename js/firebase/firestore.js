import { getFirestore, collection, doc, addDoc, setDoc, getDocs, updateDoc, query, orderBy, deleteDoc, limit } from "https://www.gstatic.com/firebasejs/9.6.6/firebase-firestore.js";

const bd = getFirestore();

export async function insert(coleccion, item) {
    try {
        const response =  await addDoc(collection(bd, coleccion), item);
        return response;
    } catch(error) {
        throw new Error(error);
    }
};

export async function list(coleccion) {
    try {
        const colec = collection(bd, coleccion);
        const q = query(colec, orderBy("Valoracion", "desc"), limit());
        const response = await getDocs(q);
        return response;
    } catch(error) {
        throw new Error(error);
    }
}

export async function borrarDoc(coleccion,idDoc) {
    try {
        await deleteDoc(doc(bd,coleccion,idDoc))
    } catch(error) {
        throw new Error(error);
    }
}
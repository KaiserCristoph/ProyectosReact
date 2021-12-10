import { db } from "../firebase/firebase-config";
import { collection, addDoc } from "firebase/firestore";
import { types } from "../types/types";

const UploadNewManufacturer = ({
    image,
    name,
    lifeSpan,
    description,
}, navigate) => {

    return async (dispatch, getState) => {

        const newManufacturer = {
            image,
            name,
            lifeSpan,
            description,
        };

        try {
            const docRef = await addDoc(collection(db, `manufacturers`), newManufacturer);
            await dispatch(addManufacturer(docRef.id, newManufacturer));
            navigate(`/manufacturers/${docRef.id}`)
        } catch (e) {
            console.log(e)
        }
    }
};

const activeManufacturer = (id, manufacturer) => ({
    type: types.manufacturerActive,
    payload: {
        id,
        ...manufacturer
    } 
});

const addManufacturer = (id, manufacturer) => ({
    type: types.manufacturerAdd,
    payload: {
        id,
        ...manufacturer
    } 
});

export {
    UploadNewManufacturer,
    activeManufacturer,
    addManufacturer
};
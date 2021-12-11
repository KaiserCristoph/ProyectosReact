import { db } from "../firebase/firebase-config";
import { collection, addDoc, updateDoc, doc, deleteDoc } from "firebase/firestore";
import { types } from "../types/types";

const uploadNewManufacturer = ({
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
            await dispatch(manufacturerAdded(docRef.id, newManufacturer));
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

const manufacturerAdded = (id, manufacturer) => ({
    type: types.manufacturerAdd,
    payload: {
        id,
        ...manufacturer
    } 
});

const updateManufacturer = (manufacturer, navigate) => {
    return async (dispatch, getState) => {
        const manufacturerToUpdate = { ...manufacturer };
        delete manufacturerToUpdate.id

        try {
            await updateDoc(doc(db, `/manufacturers/${manufacturer.id}`), manufacturerToUpdate);
            await dispatch(manufacturerUpdated(manufacturer.id, manufacturer))
            navigate(`/manufacturers/${manufacturer.id}`)
        } catch (e) {
            console.log(e)
        }
    }
};

const manufacturerUpdated = (id, manufacturer) => ({
    type: types.manufacturerUpdate,
    payload: {
        id,
        ...manufacturer
    }
});

const deleteManufacturer = (id, navigate) => {
    return async (dispatch, getState) => {
        await deleteDoc(doc(db, `/manufacturers/${id}`));

        dispatch(manufacturerDeleted(id));
        navigate(`/manufacturers/`);
    }
}

const manufacturerDeleted = (id) => ({
    type: types.manufacturerDelete,
    payload: id
});

export {
    uploadNewManufacturer,
    activeManufacturer,
    manufacturerAdded,
    updateManufacturer,
    deleteManufacturer,
    manufacturerDeleted
};
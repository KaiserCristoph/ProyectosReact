import { db } from "../firebase/firebase-config";
import { collection, addDoc, deleteDoc, doc } from "firebase/firestore";
import { types } from "../types/types";

const UploadNewModel = ({
    image,
    name,
    lifeSpan,
    description,
    amountProduced,
    manufacturer
}, navigate) => {
    return async (dispatch, getState) => {

        const newModel = {
            image,
            name,
            lifeSpan,
            description,
            amountProduced,
            manufacturer
        }

        try {
            const docRef = await addDoc(collection(db, `models`), newModel)
            await dispatch(addNewModel(docRef.id, newModel))
            navigate(`/models/${docRef.id}`)
        } catch (e) {
            console.log(e)
        }
    }
};

const activeModel = (id, model) => ({
    type: types.modelActive,
    payload: {
        id,
        ...model
    } 
});

const addNewModel = ( id, model ) => ({
    type: types.modelAdd,
    payload: {
        id, ...model
    }
})

const startDeleting = ( id , navigate) => {
    return async( dispatch, getState ) => {
        await deleteDoc(doc(db, `/models/${id}`));
 
        dispatch(deleteModel(id));
        navigate(`/models/`);
    }
}

const deleteModel = (id) => ({
    type: types.modelDelete,
    payload: id
});

export {
    UploadNewModel,
    activeModel,
    addNewModel,
    startDeleting,
    deleteModel
};
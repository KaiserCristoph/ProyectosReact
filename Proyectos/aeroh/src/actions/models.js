import { db } from "../firebase/firebase-config";
import { collection, addDoc, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { types } from "../types/types";

const uploadNewModel = ({
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
            await dispatch(modelAdded(docRef.id, newModel))
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

const modelAdded = (id, model) => ({
    type: types.modelAdd,
    payload: {
        id, ...model
    }
})

const updateModel = (model, navigate) => {
    return async (dispatch, getState) => {
        const modelToUpdate = { ...model };
        delete modelToUpdate.id

        try {
            await updateDoc(doc(db, `/models/${model.id}`), modelToUpdate);
            await dispatch(modelUpdated(model.id, model))
            navigate(`/models/${model.id}`)
        } catch (e) {
            console.log(e)
        }
    }
};

const modelUpdated = (id, model) => ({
    type: types.modelUpdate,
    payload: {
        id,
        ...model
    }
});

const deleteModel = (id, navigate) => {
    return async (dispatch, getState) => {
        await deleteDoc(doc(db, `/models/${id}`));

        dispatch(deleteModel(id));
        navigate(`/models/`);
    }
}

const modelDeleted = (id) => ({
    type: types.modelDelete,
    payload: id
});

export {
    uploadNewModel,
    activeModel,
    modelAdded,
    deleteModel,
    modelDeleted,
    updateModel
};
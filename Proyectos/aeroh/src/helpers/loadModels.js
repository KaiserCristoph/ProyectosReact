import { collection, getDocs } from "@firebase/firestore"
import { db } from "../firebase/firebase-config"


const loadModelById = async (mId) => {
    const models = await processModel();
    let modelRaw = { id: null, name: 'Not Found' };
    models.forEach(model => {
        if (model.id === mId) {
            modelRaw = model;
        }
    });

    return modelRaw;
}

const loadAllModels = () => {
    return processModel();
}

const loadModelsByManufacturer = async (mId) => {
    const models = await processModel();
    let modelsRaw = [];
    models.forEach(model => {
        if (model.manufacturer === mId) {
           modelsRaw.push(model);
        }
    });

    return modelsRaw;
}

const processModel = async (route) => {
    const modulesRaw = await getDocs(collection(db, `/models/`));
    const modules = [];

    modulesRaw.forEach(snapHijo => {
        modules.push({
            id: snapHijo.id,
            ...snapHijo.data()
        })
    });
    return modules;
}

export {
    loadAllModels,
    loadModelById,
    loadModelsByManufacturer
}
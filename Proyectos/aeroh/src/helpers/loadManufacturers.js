import { collection, getDocs } from "@firebase/firestore"
import { db } from "../firebase/firebase-config"


const loadManufacturerById = async (mId) => {
    const manufacturers = await processManufacturer()
    let manufacturersRaw = {id:null, name:'Not Found'};
    manufacturers.forEach(model => {
        if (model.id === mId) {
            manufacturersRaw = model;
        }
    });

    return manufacturersRaw;
}

const loadAllManufacturers = async () => {
    return processManufacturer()
}

const processManufacturer = async () => {
    const manufacturersRaw = await getDocs(collection(db, "/manufacturers/"));
    const manufacturers = [];

    manufacturersRaw.forEach(snapHijo => {
        manufacturers.push({
            id: snapHijo.id,
            ...snapHijo.data()
        })
    });
    return manufacturers;
}

export {
    loadManufacturerById,
    loadAllManufacturers
}
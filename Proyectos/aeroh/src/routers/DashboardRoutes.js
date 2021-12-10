import {Routes, Route, Navigate} from 'react-router-dom';

import AeroHMain from '../components/aeroh/AeroHMain';
import ManufacturersPage from '../components/aeroh/ManufacturerPage';
import Manufacturers from '../components/aeroh/Manufacturers';
import ModelsPage from '../components/aeroh/ModelPage';
import Models from '../components/aeroh/Models';
import NavBar from '../components/aeroh/NavBar';
import UpdateModels from '../components/userActions/UpdateModels';
import UploadManufacturer from '../components/userActions/UploadManufacturer';
import UploadMenu from '../components/userActions/UploadMenu';
import UploadModels from '../components/userActions/UploadModels';

const DashboardRoutes = () => {
    return (
        <>
            <NavBar />
            <div id="main">
                <Routes>
                    <Route 
                        path="/manufacturers" 
                        element={<Manufacturers />} 
                    />
                    <Route 
                        path="/manufacturers/:manufacturerId" 
                        element={<ManufacturersPage />} 
                    />
                    <Route 
                        path="/models" 
                        element={<Models />} 
                    />
                    <Route 
                        path="/models/update/:modelId" 
                        element={<UpdateModels />} 
                    />
                    <Route 
                        path="/models/:modelId" 
                        element={<ModelsPage />} 
                    />
                    
                    <Route 
                        path="/users/upload/" 
                        element={<UploadMenu />} 
                    />
                    <Route 
                        path="/users/upload/manufacturer" 
                        element={<UploadManufacturer />} 
                    />
                    <Route 
                        path="/users/upload/model"
                        element={<UploadModels />} 
                    />

                    <Route 
                        path="/" 
                        element={<AeroHMain />} 
                    />
                    <Route 
                        path="/*"
                        element={<Navigate to="/"/>}
                    />
                </Routes>
            </div>
        </>
    )
}

export { 
    DashboardRoutes as default
}
import {Routes, Route, Navigate} from 'react-router-dom';

import AeroHMain from '../components/aeroh/AeroHMain';
import ManufacturersPage from '../components/aeroh/ManufacturerPage';
import Manufacturers from '../components/aeroh/Manufacturers';
import ModelsPage from '../components/aeroh/ModelPage';
import Models from '../components/aeroh/Models';
import NavBar from '../components/aeroh/NavBar';
import UpdateManufacturer from '../components/userActions/UpdateManufacturer';
import UpdateModel from '../components/userActions/UpdateModel';
import UploadManufacturer from '../components/userActions/UploadManufacturer';
import UploadMenu from '../components/userActions/UploadMenu';
import UploadModel from '../components/userActions/UploadModel';

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
                        path="/manufacturers/update/:manufacturerId" 
                        element={<UpdateManufacturer />} 
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
                        element={<UpdateModel />} 
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
                        element={<UploadModel />} 
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
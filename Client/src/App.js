import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import AllCards from "./componentes/AllCards/AllCards";
import Nav from "./componentes/Nav/Nav";
import Detail from "./componentes/Detail/detail";
import FilteredProperties from "./componentes/FilteredProperty/FilteredProperty";
import NavSuperior from "./componentes/NavSuperior/NavSuperior";
import Footer from "./componentes/Footer/Footer";
import QuickFilter from './componentes/QuickFilter/QuickFilter'
import UnknownRoute from './componentes/Various/UnknownRoute'
import Login from "./componentes/dashboard/Login";
import HomeDash from "./componentes/dashboard/HomeDash";
import EditPropertyForm from "./componentes/dashboard/EditPropertyForm"
import CreateForm from "./componentes/dashboard/CreateForm";
import CreateEditor from './componentes/Various/CreateEditor'
import DeleteEditor from "./componentes/Various/DeleteEditor";
import PersonalData from './componentes/Various/PersonalData'
import ProtectedRoutes from "./componentes/Firebase/ProtectedRoutes";
import React from "react";


function App() {

  const location = useLocation();


return (
  <div>
    {/* <Router history={history}> */}
    {!location.pathname.includes('/admin') && (
      <div className='superiorContainer'>
        <NavSuperior />
        <Nav />
      </div>
    )}
    
    <div className='generalContainer' style={location.pathname.includes('/admin') ? {top:'0%'} : {top:'20%'}}>
      <Routes>
        
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<AllCards />} />
        <Route path="/properties/:id" element={<Detail />} />
        <Route path="/properties/" element={<FilteredProperties />} />
        <Route path="/rent" element={<QuickFilter operation={'Alquiler'}/>} />
        <Route path="/buy" element={<QuickFilter operation={'Venta'}/>} />
        <Route path="/temporyRent" element={<QuickFilter operation={'Alquiler Temporario'} />} />
        
        <Route path="*" element={<UnknownRoute />} /> 


        <Route element={<ProtectedRoutes allowedRoles={["admin", 'editor']} />}>
          <Route path="/admin/adminProps" element={<HomeDash />} />
          <Route path="/admin/editarPropiedad/:id" element={<EditPropertyForm />} />
          <Route path="/admin/crearPropiedad" element={<CreateForm/>} />
          <Route path="/admin/datosPersonales" element={<PersonalData/>} />
        </Route>

        <Route element={<ProtectedRoutes allowedRoles={["admin"]} />}>
          <Route path="/admin/crearEditor" element={<CreateEditor />} />
          <Route path="/admin/eliminarEditor" element={<DeleteEditor />} />
        </Route>

      </Routes>
    </div>
    {!location.pathname.includes('/admin') && <Footer />}
  </div>
)}
export default App;
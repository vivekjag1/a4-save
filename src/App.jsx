
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {PurchaseContextProvider} from "/src/contexts/purchaseContext.jsx";

import {Login} from "./pages/Login.jsx";
import {Home} from "./pages/Home.jsx";
import "./App.css";
function App() {

  return (
    <PurchaseContextProvider>
      <Router>
        <div className="h-screen bg-blue-400 overflow-hidden">
          <Routes>
            <Route path='/' element={<Login/>}/>
            <Route path = '/home' element={<Home/>}/>
          </Routes>
        </div>
      </Router>
    </PurchaseContextProvider>



  )
}

export default App;

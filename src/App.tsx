import { About } from "./pages/About";
import { Contact } from "./pages/Contact";
import { Home } from "./pages/Home";
import { Navbar } from "./components/Navbar";
import { NotFound } from "./pages/NotFound";

import { ApiContextProvider } from "./contexts/ApiContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { BookingForm } from "./components/BookingForm";
import { SuperAdminPage } from "./pages/SuperAdminPage";
import { RouteContextProvider } from "./contexts/RouteContext";

function App() {
  return (
    <BrowserRouter>
      <RouteContextProvider>
        <ApiContextProvider>
          <div>
            <Navbar />
          </div>
        </ApiContextProvider>

        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/about' element={<About />} />
          <Route path='/superadmin' element={<SuperAdminPage />} />
          <Route path='/bookingform' element={<BookingForm />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </RouteContextProvider>
    </BrowserRouter>
  );
}

export default App;

import { About } from "./pages/About/About";
import { Contact } from "./pages/Contact/Contact";
import { Home } from "./pages/Home/Home";
import { Navbar } from "./components/Navbar/Navbar";
import { NotFound } from "./pages/NotFound/NotFound";

import { ApiContextProvider } from "./contexts/ApiContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { BookingWizard } from "./pages/BookingWizard/BookingWizard";
import { SuperAdminPage } from "./pages/SuperAdminPage";
import { RouteContextProvider } from "./contexts/RouteContext";
import { Footer } from "./components/Footer/Footer";
import "./styles/App.scss";
import { UserAccount } from "./pages/User/UserAccount";

import { Credentials } from "./pages/User/Credentials";
import { SignUpForm } from "./pages/User/SignUpForm";

function App() {
  return (
    <div className='app'>
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
            <Route path='/superAdmin' element={<SuperAdminPage />} />
            <Route path='/bookingWizard' element={<BookingWizard />} />
            <Route path='/userAccount' element={<UserAccount />} />
            <Route path='/signUp' element={<SignUpForm />} />
            <Route path='/credentials' element={<Credentials />} />

            <Route path='*' element={<NotFound />} />
          </Routes>
          <div>
            <Footer />
          </div>
        </RouteContextProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;

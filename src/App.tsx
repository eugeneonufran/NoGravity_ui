import { About } from "./pages/About/About";
import { Contact } from "./pages/Contact/Contact";
import { Home } from "./pages/Home/Home";
import { Navbar } from "./components/Navbar/Navbar";
import { NotFound } from "./pages/NotFound/NotFound";

import { ApiContextProvider } from "./contexts/ApiContext";
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  Navigate,
} from "react-router-dom";
import { BookingWizard } from "./pages/BookingWizard/BookingWizard";
import { SuperAdminPage } from "./pages/SuperAdminPage";
import { DataContext, DataContextProvider } from "./contexts/DataContext";
import { Footer } from "./components/Footer/Footer";
import "./styles/App.scss";
import { UserAccount } from "./pages/User/UserAccount";

import { SignUpForm } from "./pages/User/SignUpForm";
import { AuthContext } from "./contexts/AuthContext";
import { LoginForm } from "./pages/User/LoginForm";
import { useContext } from "react";

function App() {
  const { chosenRoute } = useContext(DataContext);

  const { user } = useContext(AuthContext);

  const isAuthenticated = user !== undefined && user !== null;

  return (
    <div className='app'>
      <BrowserRouter>
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
          {chosenRoute ? (
            <Route path='/bookingWizard/:step' element={<BookingWizard />} />
          ) : null}
          {isAuthenticated ? (
            <>
              <Route path='/userAccount' element={<UserAccount />} />
              <Route path='/signUp' element={<Navigate to='/userAccount' />} />
              <Route path='/login' element={<Navigate to='/userAccount' />} />
            </>
          ) : (
            <>
              <Route path='/signUp' element={<SignUpForm />} />
              <Route path='/login' element={<LoginForm />} />
              <Route path='/userAccount' element={<LoginForm />} />
            </>
          )}
          <Route path='*' element={<NotFound />} />
        </Routes>
        <div>
          <Footer />
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;

import { About } from "./pages/About";
import { Contact } from "./pages/Contact";
import { Home } from "./pages/Home";
import { Navbar } from "./components/Navbar";
import { NotFound } from "./pages/NotFound";

import { ApiContextProvider } from "./contexts/ApiContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
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
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

import BookingPage from "./components/BookingPage";

import { ApiContextProvider } from "./contexts/ApiContext";

function App() {
  return (
    <ApiContextProvider>
      <div>
        <BookingPage />
      </div>
    </ApiContextProvider>
  );
}

export default App;

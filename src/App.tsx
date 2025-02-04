import Header from "./components/common/header";
import Footer from "./components/common/footer";
import { Outlet } from "react-router";
import { ThemeProvider } from "./contexts/themeProvider";


function App() {
  return (
    <ThemeProvider>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </ThemeProvider>
  );
}

export default App;
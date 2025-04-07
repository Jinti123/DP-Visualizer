import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider, useTheme } from "./context/ThemeContext";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import About from "./pages/About";
import Fibonacci from "./algorithms/Fibonacci/Fibonacci";
import CoinChange from "./algorithms/CoinChange/CoinChange";
import Knapsack from "./algorithms/Knapsack/Knapsack";
import LCS from "./algorithms/LCS/LCS";
import LIS from "./algorithms/LIS/LIS";
import { useEffect } from "react";

// Theme-aware App content
const AppContent = () => {
  const { themeMode } = useTheme();

  useEffect(() => {
    document.body.className = themeMode; // Set 'light' or 'dark'
  }, [themeMode]);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/fibonacci" element={<Fibonacci />} />
        <Route path="/coin-change" element={<CoinChange />} />
        <Route path="/knapsack" element={<Knapsack />} />
        <Route path="/lcs" element={<LCS />} />
        <Route path="/lis" element={<LIS />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </>
  );
};

function App() {
  return (
    <ThemeProvider>
      <Router>
        <AppContent />
      </Router>
    </ThemeProvider>
  );
}

export default App;

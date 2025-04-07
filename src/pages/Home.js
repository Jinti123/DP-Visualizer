import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import AlgorithmCard from "../components/AlgorithmCard";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import "./Home.css";

const algorithms = [
  {
    id: "fibonacci",
    name: "Fibonacci Sequence",
    description: "Calculate the nth Fibonacci number using DP",
    icon: "🔢",
  },
  {
    id: "coin-change",
    name: "Coin Change",
    description: "Minimum coins needed for amount",
    icon: "💰",
  },
  {
    id: "knapsack",
    name: "0/1 Knapsack",
    description: "Maximize value without exceeding weight limit",
    icon: "🎒",
  },
  {
    id: "lcs",
    name: "Longest Common Subsequence",
    description: "Find longest sequence present in both strings",
    icon: "🔤",
  },
  {
    id: "lis",
    name: "Longest Increasing Subsequence",
    description: "Find longest subsequence with increasing order",
    icon: "📈",
  },
];

export default function Home() {
  const { themeMode, toggleTheme } = useTheme();

  return (
    <div className="home-container">
      <div className="header">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Dynamic Programming Visualizer
        </motion.h1>
        <p className="subtitle">
          Interactive visualizations of classic DP problems
        </p>
        {/* <button
          onClick={toggleTheme}
          className="theme-toggle"
          aria-label={`Switch to ${
            themeMode === "light" ? "dark" : "light"
          } mode`}
        >
          {themeMode === "light" ? <Brightness4 /> : <Brightness7 />}
        </button> */}
      </div>

      <div className="algorithms-grid">
        {algorithms.map((algo, index) => (
          <AlgorithmCard
            key={algo.id}
            id={algo.id}
            name={algo.name}
            description={algo.description}
            icon={algo.icon}
            delay={index * 0.1}
          />
        ))}
      </div>
    </div>
  );
}

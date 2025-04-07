import React, { useState, useEffect } from "react";
import { Button, Typography, TextField } from "@mui/material";
import { useTheme } from "../../context/ThemeContext";
import ControlPanel from "../../components/Shared/ControlPanel";
import DpTable from "../../components/Shared/DpTable";
import Explanation from "../../components/Shared/Explanation";
import "./styles.css";
export default function CoinChangeVisualizer() {
  const { themeMode } = useTheme();
  const [coins, setCoins] = useState([1, 2, 5]);
  const [amount, setAmount] = useState(11);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [steps, setSteps] = useState([]);

  const generateSteps = () => {
    const dp = Array(amount + 1).fill(Infinity);
    dp[0] = 0;
    const stepData = [
      {
        dpTable: [...dp],
        explanation: "Initial state: 0 coins needed to make amount 0",
        highlightedIndex: 0,
      },
    ];

    for (let i = 1; i <= amount; i++) {
      for (let coin of coins) {
        if (i - coin >= 0 && dp[i - coin] !== Infinity) {
          dp[i] = Math.min(dp[i], dp[i - coin] + 1);
        }
      }
      stepData.push({
        dpTable: [...dp],
        explanation: `Minimum coins to make amount ${i} is ${
          dp[i] === Infinity ? "∞" : dp[i]
        }`,
        highlightedIndex: i,
      });
    }

    setSteps(stepData);
    setCurrentStep(0);
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const resetVisualization = () => {
    setCurrentStep(0);
    setIsPlaying(false);
  };

  useEffect(() => {
    if (isPlaying && currentStep < steps.length - 1) {
      const timeout = setTimeout(() => {
        nextStep();
      }, 1000 / speed);
      return () => clearTimeout(timeout);
    } else {
      setIsPlaying(false);
    }
  }, [isPlaying, currentStep, steps, speed]);

  return (
    <div className={`fibonacci-container ${themeMode}`}>
      <Typography variant="h3" component="h1" className="title">
        Coin Change Problem
      </Typography>

      <div className="problem-section">
        <Typography variant="h5" component="h2">
          Problem Statement :
        </Typography>
        <Typography>
          Imagine you're a robot with a coin dispenser, tasked with giving out
          change. Your mission: Find the minimum number of coins needed to make
          up a specific amount, given a set of coin denominations. If it's
          impossible, you must alert the humans!
        </Typography>
      </div>

      <div className="solution-section">
        <Typography variant="h5" component="h2">
          Solution Approach :
        </Typography>
        <Typography>
          We'll use the power of dynamic programming! We'll create a magic array
          where each position represents the minimum coins needed for that
          amount. We start small and build our way up, considering each coin
          type at every step. It's like solving a puzzle, piece by piece!
        </Typography>
      </div>

      <div className="visualization-section">
        <Typography variant="h5" component="h2">
          Interactive Visualization
        </Typography>

        <div className="input-controls">
          <Typography>Target Amount:</Typography>
          <TextField
            type="number"
            value={amount}
            onChange={(e) => setAmount(parseInt(e.target.value) || 0)}
            variant="outlined"
            size="small"
            style={{
              width: "80px",
              margin: "0 16px",
              backgroundColor: "#e1f1fd",
              input: {
                backgroundColor: "#e1f1fd",
              },
            }}
          />

          <Typography>Coins:</Typography>
          <TextField
            value={coins.join(",")}
            onChange={(e) =>
              setCoins(
                e.target.value
                  .split(",")
                  .map((val) => parseInt(val.trim()))
                  .filter((val) => !isNaN(val))
              )
            }
            variant="outlined"
            size="small"
            style={{
              width: "120px",
              margin: "0 16px",
              backgroundColor: "#e1f1fd",
              input: {
                backgroundColor: "#e1f1fd",
              },
            }}
          />

          <Button variant="contained" color="success" onClick={generateSteps}>
            Generate
          </Button>
        </div>

        <ControlPanel
          isPlaying={isPlaying}
          onPlayPause={() => setIsPlaying(!isPlaying)}
          onNext={nextStep}
          onPrevious={prevStep}
          onReset={resetVisualization}
          speed={speed}
          onSpeedChange={setSpeed}
          currentStep={currentStep}
          totalSteps={steps.length}
        />

        <div className="dp-display">
          <DpTable
            data={steps[currentStep]?.dpTable || []}
            algorithm="coinchange"
            currentStep={currentStep}
            highlightedCells={[steps[currentStep]?.highlightedIndex]}
          />

          <Explanation
            text={
              steps[currentStep]?.explanation ||
              'Click "Generate" to start visualization'
            }
            result={
              currentStep === steps.length - 1 && steps.length > 0
                ? steps[currentStep].dpTable[amount] === Infinity
                  ? "It's not possible to form the amount with the given coins."
                  : `Minimum coins needed: ${steps[currentStep].dpTable[amount]}`
                : null
            }
          />
        </div>

        <div className="step-info">
          <Typography>
            Step: {currentStep + 1} of {steps.length}
          </Typography>
        </div>
      </div>
    </div>
  );
}

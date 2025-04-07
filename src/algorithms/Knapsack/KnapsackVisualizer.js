import React, { useState, useEffect } from "react";
import { Typography, TextField, Button } from "@mui/material";
import {
  PlayArrow,
  Pause,
  SkipPrevious,
  SkipNext,
  Replay,
} from "@mui/icons-material";
import ControlPanel from "../../components/Shared/ControlPanel";
import DpTable from "../../components/Shared/DpTable";
import Explanation from "../../components/Shared/Explanation";
import { useTheme } from "../../context/ThemeContext";
import "./styles.css"; // Use same styles.css as Fibonacci

export default function KnapsackVisualizer() {
  const { themeMode } = useTheme();
  const [weights, setWeights] = useState([10, 20, 30]);
  const [values, setValues] = useState([60, 100, 120]);
  const [capacity, setCapacity] = useState(50);
  const [dp, setDp] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [steps, setSteps] = useState([]);

  const generateSteps = () => {
    const n = values.length;
    const dp = Array(n + 1)
      .fill()
      .map(() => Array(capacity + 1).fill(0));
    const steps = [];

    steps.push({
      dp: JSON.parse(JSON.stringify(dp)),
      explanation: "Initial state: Empty knapsack",
      highlight: [0, 0],
    });

    for (let i = 1; i <= n; i++) {
      for (let w = 1; w <= capacity; w++) {
        if (weights[i - 1] <= w) {
          dp[i][w] = Math.max(
            values[i - 1] + dp[i - 1][w - weights[i - 1]],
            dp[i - 1][w]
          );
        } else {
          dp[i][w] = dp[i - 1][w];
        }

        steps.push({
          dp: JSON.parse(JSON.stringify(dp)),
          explanation: `Processing item ${i} (W=${weights[i - 1]}, V=${
            values[i - 1]
          }) for capacity ${w}`,
          highlight: [i, w],
        });
      }
    }

    setSteps(steps);
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

  const reset = () => {
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
        0/1 Knapsack Problem
      </Typography>

      <div className="problem-section">
        <Typography variant="h5">Problem Statement :</Typography>
        <Typography>
          Imagine you're a clever thief with a knapsack. You've broken into a
          store with various items, each with its own weight and value. Your
          goal is to fill your knapsack with the most valuable combination of
          items without exceeding its weight capacity. Choose wisely!
        </Typography>
      </div>

      <div className="solution-section">
        <Typography variant="h5">Solution Approach :</Typography>
        <Typography>
          We'll use dynamic programming to solve this problem. We'll create a 2D
          array where each cell [i][w] represents the maximum value we can
          achieve with the first i items and a knapsack capacity of w. We'll
          build this table step by step, considering each item and each possible
          capacity.
        </Typography>
      </div>

      <div className="visualization-section">
        <Typography variant="h5">Interactive Visualization</Typography>

        <div className="input-controls">
          <Typography>Capacity:</Typography>
          <TextField
            type="number"
            value={capacity}
            onChange={(e) => setCapacity(parseInt(e.target.value) || 0)}
            variant="outlined"
            size="small"
            style={{
              width: "80px",
              marginRight: "16px",
              backgroundColor: "#e1f1fd",
              input: {
                backgroundColor: "#e1f1fd",
              },
            }}
          />
          <Typography>Weights (JSON Array):</Typography>
          <TextField
            value={JSON.stringify(weights)}
            onChange={(e) => setWeights(JSON.parse(e.target.value))}
            variant="outlined"
            size="small"
            style={{
              width: "150px",
              marginRight: "16px",
              backgroundColor: "#e1f1fd",
              input: {
                backgroundColor: "#e1f1fd",
              },
            }}
          />
          <Typography>Values (JSON Array):</Typography>
          <TextField
            value={JSON.stringify(values)}
            onChange={(e) => setValues(JSON.parse(e.target.value))}
            variant="outlined"
            size="small"
            style={{
              width: "150px",
              marginRight: "16px",
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
          onReset={reset}
          speed={speed}
          onSpeedChange={setSpeed}
          currentStep={currentStep}
          totalSteps={steps.length}
        />

        <div className="dp-display">
          <DpTable
            data={steps[currentStep]?.dp || []}
            algorithm="knapsack"
            currentStep={currentStep}
            highlightedCells={[steps[currentStep]?.highlight]}
          />
          <Explanation
            text={
              steps[currentStep]?.explanation ||
              'Click "Generate" to start visualization'
            }
            result={
              currentStep === steps.length - 1 && steps.length > 0
                ? `Maximum value: ${
                    steps[currentStep].dp[values.length][capacity]
                  }`
                : null
            }
          />
        </div>
      </div>
    </div>
  );
}

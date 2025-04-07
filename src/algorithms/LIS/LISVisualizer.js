import React, { useState, useEffect } from "react";
import { Typography, TextField, Button } from "@mui/material";
import ControlPanel from "../../components/Shared/ControlPanel";
import DpTable from "../../components/Shared/DpTable";
import Explanation from "../../components/Shared/Explanation";
import { useTheme } from "../../context/ThemeContext";
import "./styles.css";

export default function LISVisualizer() {
  const { themeMode } = useTheme();

  const [nums, setNums] = useState([10, 9, 2, 5, 3, 7, 101, 18]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [steps, setSteps] = useState([]);

  const generateSteps = () => {
    const dp = Array(nums.length).fill(1);
    const steps = [];

    steps.push({
      dpTable: [...dp],
      explanation: "Initial state: Each element is a subsequence of length 1",
      highlightedIndex: -1,
    });

    for (let i = 1; i < nums.length; i++) {
      for (let j = 0; j < i; j++) {
        if (nums[i] > nums[j]) {
          dp[i] = Math.max(dp[i], dp[j] + 1);
        }
        steps.push({
          dpTable: [...dp],
          explanation: `Comparing nums[${i}] = ${nums[i]} with nums[${j}] = ${nums[j]}`,
          highlightedIndex: i,
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
    <div className={`lis-container ${themeMode}`}>
      <Typography variant="h3" component="h1" className="title">
        Longest Increasing Subsequence
      </Typography>

      <div className="problem-section">
        <Typography variant="h5" component="h2">
          Problem Statement :
        </Typography>
        <Typography>
          Given an unsorted array of integers, find the length of the longest
          increasing subsequence (LIS). An increasing subsequence is a sequence
          of elements where each element is strictly greater than the previous
          one, but they don't need to be adjacent in the original array.
        </Typography>
      </div>

      <div className="solution-section">
        <Typography variant="h5" component="h2">
          Solution Approach :
        </Typography>
        <Typography>
          We'll use dynamic programming to solve this efficiently. We'll create
          an array where each element represents the length of the LIS ending at
          that index. We'll build this array by comparing each element with all
          previous elements, updating the LIS length when we find a smaller
          element that can be part of the increasing subsequence.
        </Typography>
      </div>

      <div className="visualization-section">
        <Typography variant="h5" component="h2">
          Interactive Visualization
        </Typography>

        <div className="input-controls">
          <Typography>Enter Array:</Typography>
          <TextField
            value={JSON.stringify(nums)}
            onChange={(e) => {
              try {
                setNums(JSON.parse(e.target.value));
              } catch {
                setNums([]);
              }
            }}
            variant="outlined"
            size="small"
            style={{
              width: "240px",
              margin: "0 16px",
              backgroundColor: "#e1f1fd",
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
            algorithm="lis"
            currentStep={currentStep}
            highlightedCells={[steps[currentStep]?.highlightedIndex]}
            labels={nums}
          />

          <Explanation
            text={
              steps[currentStep]?.explanation ||
              'Click "Generate" to start visualization'
            }
            result={
              currentStep === steps.length - 1 && steps.length > 0
                ? `LIS Length: ${Math.max(...steps[currentStep].dpTable)}`
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

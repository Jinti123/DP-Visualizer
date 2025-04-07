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
import "./styles.css";

export default function LCSVisualizer() {
  const { themeMode } = useTheme();
  const [text1, setText1] = useState("abcde");
  const [text2, setText2] = useState("ace");
  const [steps, setSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);

  const generateSteps = () => {
    const m = text1.length;
    const n = text2.length;
    const dp = Array(m + 1)
      .fill()
      .map(() => Array(n + 1).fill(0));
    const newSteps = [];

    newSteps.push({
      dpTable: JSON.parse(JSON.stringify(dp)),
      explanation: "Initial state: Empty strings have LCS length 0",
      highlightedCells: [],
    });

    for (let i = 1; i <= m; i++) {
      for (let j = 1; j <= n; j++) {
        if (text1[i - 1] === text2[j - 1]) {
          dp[i][j] = dp[i - 1][j - 1] + 1;
        } else {
          dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
        }

        newSteps.push({
          dpTable: JSON.parse(JSON.stringify(dp)),
          explanation: `Comparing '${text1[i - 1]}' (pos ${i}) and '${
            text2[j - 1]
          }' (pos ${j})`,
          highlightedCells: [[i, j]],
        });
      }
    }

    setSteps(newSteps);
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
        Longest Common Subsequence
      </Typography>

      <div className="problem-section">
        <Typography variant="h5">Problem Statement :</Typography>
        <Typography>
          Given two sequences, find the length of the longest subsequence
          present in both of them. A subsequence is a sequence that appears in
          the same relative order, but not necessarily contiguous.
        </Typography>
      </div>

      <div className="solution-section">
        <Typography variant="h5">Solution Approach :</Typography>
        <Typography>
          We'll use dynamic programming to solve this efficiently. We'll create
          a 2D table where cell [i][j] represents the length of LCS of the first
          i characters of str1 and first j characters of str2. We'll build this
          table step by step, comparing characters and using previously computed
          results.
        </Typography>
      </div>

      <div className="visualization-section">
        <Typography variant="h5">Interactive Visualization</Typography>

        <div className="input-controls">
          <Typography>Enter Two Strings:</Typography>
          <TextField
            label="String 1"
            variant="outlined"
            value={text1}
            onChange={(e) => setText1(e.target.value)}
            size="small"
            style={{
              margin: "8px",
              backgroundColor: "#e1f1fd",
              input: {
                backgroundColor: "#e1f1fd",
              },
            }}
          />
          <TextField
            label="String 2"
            variant="outlined"
            value={text2}
            onChange={(e) => setText2(e.target.value)}
            size="small"
            style={{
              margin: "8px",
              backgroundColor: "#e1f1fd",
              input: {
                backgroundColor: "#e1f1fd",
              },
            }}
          />
          <Button
            variant="contained"
            color="success"
            onClick={generateSteps}
            style={{ marginLeft: "8px" }}
          >
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
            algorithm="lcs"
            currentStep={currentStep}
            highlightedCells={steps[currentStep]?.highlightedCells || []}
            rowLabels={["∅", ...text1.split("")]}
            colLabels={["∅", ...text2.split("")]}
          />

          <Explanation
            text={
              steps[currentStep]?.explanation ||
              'Click "Generate" to start visualization'
            }
            result={
              currentStep === steps.length - 1 && steps.length > 0
                ? `LCS Length: ${
                    steps[currentStep].dpTable[text1.length][text2.length]
                  }`
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

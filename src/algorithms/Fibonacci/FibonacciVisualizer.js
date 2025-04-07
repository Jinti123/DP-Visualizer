import React, { useState, useEffect } from 'react';
import { Button, Typography, TextField, Slider } from '@mui/material';
import { PlayArrow, Pause, SkipPrevious, SkipNext, Replay } from '@mui/icons-material';
import ControlPanel from '../../components/Shared/ControlPanel';
import DpTable from '../../components/Shared/DpTable';
import Explanation from '../../components/Shared/Explanation';
import { useTheme } from '../../context/ThemeContext';
import './styles.css';
import { green } from '@mui/material/colors';

export default function FibonacciVisualizer() {
  const { themeMode } = useTheme();
  const [n, setN] = useState(10);
  const [sequence, setSequence] = useState([0]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [steps, setSteps] = useState([]);

  const generateSequence = () => {
    const fib = [0, 1];
    const stepData = [];
    
    // Initial state
    stepData.push({
      dpTable: [...fib],
      explanation: 'Initial state: F(0) = 0, F(1) = 1',
      highlightedIndex: 0
    });
    
    for (let i = 2; i <= n; i++) {
      fib[i] = fib[i - 1] + fib[i - 2];
      stepData.push({
        dpTable: [...fib],
        explanation: `Calculating F(${i}) = F(${i-1}) + F(${i-2}) = ${fib[i]}`,
        highlightedIndex: i
      });
    }
    
    setSteps(stepData);
    setCurrentStep(0);
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
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
        Fibonacci Sequence
      </Typography>

      <div className="problem-section">
        <Typography variant="h5" component="h2">
          Problem Statement :
        </Typography>
        <Typography>
          The Fibonacci sequence is a series of numbers where each number is the
          sum of the two preceding ones. Starting from 0 and 1, the sequence
          goes: 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, and so on. Your task is to
          calculate the nth Fibonacci number.
        </Typography>
      </div>

      <div className="solution-section">
        <Typography variant="h5" component="h2">
          Solution Approach :
        </Typography>
        <Typography>
          We'll use dynamic programming to build our sequence step by step.
          We'll start with the base cases and then use the magic formula: F(n) =
          F(n-1) + F(n-2). It's like climbing a staircase, where each step
          depends on the two before it!
        </Typography>
      </div>

      <div className="visualization-section">
        <Typography variant="h5" component="h2">
          Interactive Visualization
        </Typography>

        <div className="input-controls">
          <Typography>N-th Fibonacci Number:</Typography>
          <TextField
            type="number"
            value={n}
            onChange={(e) => setN(parseInt(e.target.value) || 0)}
            variant="outlined"
            size="small"
            style={{
              width: "80px",
              margin: "0 16px",
              backgroundColor: '#e1f1fd',
              input: {
                backgroundColor: '#e1f1fd',
              },
            }}
          />
        <Button
  variant="contained"
  color="success"
  onClick={generateSequence}
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
            algorithm="fibonacci"
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
                ? `Final Result: F(${n}) = ${steps[currentStep].dpTable[n]}`
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
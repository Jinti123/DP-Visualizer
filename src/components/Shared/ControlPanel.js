import React from "react";
import { Button, Slider, Typography } from "@mui/material";
import {
  PlayArrow,
  Pause,
  SkipPrevious,
  SkipNext,
  Replay,
} from "@mui/icons-material";

export default function ControlPanel({
  isPlaying,
  onPlayPause,
  onNext,
  onPrevious,
  onReset,
  speed,
  onSpeedChange,
  currentStep,
  totalSteps,
}) {
  return (
    <div className="control-panel">
      <div className="control-buttons">
        <Button
          variant="outlined"
          onClick={onReset}
          disabled={currentStep === 0}
          startIcon={<Replay />}
        >
          Reset
        </Button>
        <Button
          variant="outlined"
          onClick={onPrevious}
          disabled={currentStep === 0}
          startIcon={<SkipPrevious />}
        >
          Previous
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={onPlayPause}
          disabled={totalSteps === 0}
          startIcon={isPlaying ? <Pause /> : <PlayArrow />}
        >
          {isPlaying ? "Pause" : "Play"}
        </Button>
        <Button
          variant="outlined"
          onClick={onNext}
          disabled={currentStep >= totalSteps - 1}
          startIcon={<SkipNext />}
        >
          Next
        </Button>
      </div>

      <div className="speed-control">
        <Typography>Speed:</Typography>
        <Slider
          value={speed}
          onChange={(e, newValue) => onSpeedChange(newValue)}
          min={0.5}
          max={5}
          step={0.5}
          valueLabelDisplay="auto"
        />
      </div>
    </div>
  );
}

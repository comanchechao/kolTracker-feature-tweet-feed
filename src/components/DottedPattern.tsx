import React from "react";

interface DottedPatternProps {
  className?: string;
  opacity?: number;
}

const DottedPattern: React.FC<DottedPatternProps> = ({
  className = "",
  opacity = 0.1,
}) => {
  return (
    <div
      className={`fixed inset-0 z-30 pointer-events-none overflow-hidden w-screen h-screen ${className}`}
    >
      <div
        className="absolute top-0 left-0 w-full h-full"
        style={{
          backgroundImage: `url('/dottedSVG.svg')`,
          backgroundRepeat: "repeat",
          backgroundSize: "100% 100%",
          opacity: opacity,
        }}
      />
    </div>
  );
};

export default DottedPattern;

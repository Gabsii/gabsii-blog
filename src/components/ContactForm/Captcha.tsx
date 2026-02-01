"use client";

import { useState } from "react";
import Button from "../Atoms/Button";

function Captcha({ solveCaptcha }: { solveCaptcha: (solved: boolean) => void }) {
  const [isSolved, setIsSolved] = useState(false);

  const handleSolve = () => {
    setIsSolved(true);
    solveCaptcha(true);
  };

  return (
    <div className="bg-white p-8 rounded shadow-lg flex flex-col items-center">
      <p className="mb-4">Please verify that you are not a robot.</p>
      <Button
        onClick={handleSolve}
        disabled={isSolved}
      >
        {isSolved ? "Verified" : "I'm not a robot"}
      </Button>
    </div>
  );
}

export default Captcha;

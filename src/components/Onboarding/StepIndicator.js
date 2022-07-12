import React from "react";
import { NavLink } from "react-router-dom";
import "./StepIndicatorStyles.css";

const StepIndicator = () => {
  const steps = [
    {
      path: "/Onboarding",
    },

    {
      path: "/Onboarding/step2",
    },
    {
      path: "/Onboarding/step3",
    },
    {
      path: "/Onboarding/step4",
    },
    {
      path: "/Onboarding/step5",
    },
  ];

  return (
    <div className="stepIndicator">
      {steps.map((step, index) => {
        return (
          <>
            <NavLink key={index} to={step.path}>
              {index + 1}
            </NavLink>
            <hr />
          </>
        );
      })}
    </div>
  );
};

export default StepIndicator;

import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useContext } from "react";
import { DataContext } from "../../contexts/DataContext";
import mapper from "../../models/Mapper";
import "./Breadcrumbs.scss";

const Breadcrumbs = () => {
  const { currentStep } = useContext(DataContext);

  const getCurrentStepIndex = (): number => {
    return mapper[currentStep!];
  };

  return (
    <div className='breadcrumbs'>
      {Object.keys(mapper).map((step, index) => (
        <React.Fragment key={step}>
          {index !== 0 && <span className='breadcrumb-separator'>{" | "}</span>}
          <Link
            to={`/bookingWizard/${step}`}
            className={`breadcrumb-link ${
              index <= getCurrentStepIndex() ? "completed" : ""
            } ${step === currentStep ? "current" : ""}`}
            onClick={(e) => index > getCurrentStepIndex() && e.preventDefault()} // Prevent navigation for disabled steps
          >
            {step}
          </Link>
        </React.Fragment>
      ))}
    </div>
  );
};

export default Breadcrumbs;

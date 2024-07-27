// GlobalPreloader.js
import React, { useContext } from "react";
import { LoadingContext } from "./LoadingContext";
import "ldrs/ring";
import { quantum } from "ldrs";
const GlobalPreloader = () => {
  const { isLoading } = useContext(LoadingContext);
  quantum.register();
  if (!isLoading) return null;

  return (
    <div className="preloader">
      {/* <l-quantum size="150" speed="3" color="#4BF104"></l-quantum> */}
      <div className="spinner"></div>
    </div>
  );
};

export default GlobalPreloader;

import React from "react";

const UserDesc = ({ left, right }) => {
  return (
    <div>
      <span className="desc-left">{left} </span>
      <span className="desc-right">{right} </span>
    </div>
  );
};

export default UserDesc;

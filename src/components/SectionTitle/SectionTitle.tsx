/* eslint-disable no-unused-vars */
import React from "react";

type TSectionTitle = {
  heading: string;
};

const SectionTitle = ({ heading }: TSectionTitle) => {
  return (
    <div className="md:w-4/12 my-12">
      <h3 className="text-4xl uppercase py-4">{heading}</h3>
    </div>
  );
};

export default SectionTitle;

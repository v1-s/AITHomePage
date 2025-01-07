"use client";

import React from "react";
import DynamicMegaMenu from "./Megamenu"; // Adjust the import path based on your folder structure

const ProgCard = () => {
  return (
    <div className="md:w-full lg:w-full xl:w-4/5 h-auto p-4 lg:py-4 mx-auto" id="featured-programs">
      {/* Page Title */}
      <h1 className="text-left text-2xl lg:text-3xl font-bold md:pl-6 xl:pl-0">Featured Programs</h1>
      <p className="pb-5 glitter_text text-xs lg:text-base md:pl-6 xl:pl-0">
        Experience world-class learning and get certified by top-tier universities and industry leaders.
      </p>
      <div className="flex justify-center items-center">
        {/* Render DynamicMegaMenu */}
        <div className="w-full">
          <DynamicMegaMenu
          categmenu=""
          showClose={false}
            region="global"
            showCourseImage={false}
            closeMenu={() => {}}
            showCategoryList={true}
            menuclassName="!border-t-0 max-h-full"
            showCourseList={true}
            courseListclassName="grid grid-cols-1 lg:grid-cols-2 sm:grid-cols-2 gap-4"
            courseMainclassName="rounded-md max-h-[77vh] overflow-y-auto"
            categotyclassName="lg:w-1/2 md:max-h-[77vh] max-h-full"
          />
        </div>
      </div>
    </div>
  );
};

export default ProgCard;

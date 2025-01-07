"use client"
import Link from "next/link";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCanadianMapleLeaf } from "@fortawesome/free-brands-svg-icons";


const AccessibilityPolicy = () => (
  <div>
    <section>
    
    <h3 className="text-lg md:text-xl text-mainblue font-semibold mt-4">Accessibility Policy</h3>

      <p className="leading-custom text-xs md:text-md">
        <FontAwesomeIcon icon={faCanadianMapleLeaf} className="text-maincolor_1" aria-hidden="true" />
        At AchieversIT, we believe in making our product accessible to everyone. To do so, we are committed to the following:
      </p>
      <p className="leading-custom text-xs md:text-md">
        <FontAwesomeIcon icon={faCanadianMapleLeaf} className="text-maincolor_1" aria-hidden="true" />
        We aim to conform to internationally recognized Web Content Accessibility (WCAG) Guidelines 2.1 Level AA as well as the Section 508 standards.
      </p>
      <p className="leading-custom text-xs md:text-md">
        <FontAwesomeIcon icon={faCanadianMapleLeaf} className="text-maincolor_1" aria-hidden="true" />
        We recognize that improving accessibility across our features is a continuous process. With new technologies and features that are developed, accessibility is considered in our product design, building, and offering.
      </p>
      <p className="leading-custom text-xs md:text-md">
        <FontAwesomeIcon icon={faCanadianMapleLeaf} className="text-maincolor_1" aria-hidden="true" />
        Our Curriculum, content creators, and learning design specialists consider accessibility while creating our courses.
      </p>
      <p className="leading-custom text-xs md:text-md">
        <FontAwesomeIcon icon={faCanadianMapleLeaf} className="text-maincolor_1" aria-hidden="true" />
        We prioritize accessibility bug fixes and strive to address the concerns that may hinder the learning experience.
      </p>
      <p className="leading-custom text-xs md:text-md">
        <FontAwesomeIcon icon={faCanadianMapleLeaf} className="text-maincolor_1" aria-hidden="true" />
        Any accessibility-related queries can be reported to <Link href="mailto:accessibility@achieversit.com">accessibility@achieversit.com</Link>.
      </p>
      <p className="leading-custom text-xs md:text-md">
        <FontAwesomeIcon icon={faCanadianMapleLeaf} className="text-maincolor_1" aria-hidden="true" />
        We have published our Voluntary Product Accessibility Template (VPAT) here: <Link href="/path-to-vpat">Mobile / Web</Link>.
      </p>
    </section>
  </div>
);

export default AccessibilityPolicy;
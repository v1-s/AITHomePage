// src/app/components/ScrollItem.tsx
import React from 'react';
import Image from 'next/image';

interface ScrollItemProps {
  index: number;
  title: string;
  description: string;
  image: string;
  isVisible: boolean;
}

export const ScrollItem: React.FC<ScrollItemProps> = ({ title, description, image, isVisible }) => {
  const itemRef = React.useRef<HTMLDivElement>(null);

  return (
    <div
      ref={itemRef}
      className={`flex min-h-screen items-center px-4 md:px-8 max-w-7xl mx-auto transition-all duration-1000 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      style={{ transition: 'opacity 0.5s ease-in-out' }}
    >
      <div className="flex-1">
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
      <Image src={image} alt={title} className="w-1/2" aria-label={title} />
    </div>
  );
};

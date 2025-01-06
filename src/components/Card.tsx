// Card.js
"use client";
import Image from "next/image";

interface Item {
  image: string;
  name: string;
  package: string;
  logo: string;
}

const Card = ({ item }: { item: Item }) => (
  <div className="carousel-focus flex items-center justify-center flex-col relative bg-white mx-3 my-5 w-[300px] rounded-lg shadow-glassShadow h-60 pb-0 transform transition-transform duration-300 hover:scale-105 hover:-translate-y-1 cursor-pointer relative">
    <div className="flex flex-col justify-center items-center pt-0">
      <Image 
        src={item.image} 
        alt={item.name} 
        className="rounded-full shadow-2xl object-cover" 
        style={{ width: "70px", height: "70px" }}  
        width={70} 
        height={70}
        loading="lazy"
      />
      <p className="mt-3 text-gray-600 text-center">{item.name}</p>
      <p className="mt-3 text-gray-600 text-center">{item.package}</p>
      <Image 
        src={item.logo} 
        className="brand h-8 w-8 mt-2" 
        alt="Company Logo" 
        width={200} 
        height={100}
        loading="lazy"
      />
    </div>
  </div>
);

export default Card;

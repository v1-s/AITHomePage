import React, { useState } from 'react';
import Image from 'next/image';

const teamMembers = [
  {
    name: 'Praveen Halakurki',
    role: 'CEO & Co-Founder',
    image: '/assets/images/global-pic-1.jpg',
  },
  {
    name: 'Pradeep Narayan',
    role: 'MD & Co-Founder',
    image: '/assets/images/global-pic-2.jpg',
  },
  {
    name: 'Amar K',
    role: 'Center Head - RajajiNagar',
    image: '/assets/images/review-pic-1.png',
  },
  {
    name: 'Santhosh Halakurki',
    role: 'Branch Head - Hubli',
    image: '/assets/images/review-pic-3.png',
  },
  {
    name: 'John Doe',
    role: 'Marketing Head',
    image: '/assets/images/review-pic-1.png',
  },
  {
    name: 'Jane Smith',
    role: 'Product Manager',
    image: '/assets/images/review-pic-1.png',
  },
  {
    name: 'Alice Brown',
    role: 'Sales Director',
    image: '/path-to-image/alice.jpg',
  },
  {
    name: 'Bob White',
    role: 'Operations Manager',
    image: '/path-to-image/bob.jpg',
  },
  // Add more members as needed
];

const DynamicTeam = () => {
  const [visibleMembers, setVisibleMembers] = useState(4); // Initially show 4 members
  const [loading, setLoading] = useState(false);

  const loadMoreMembers = () => {
    setLoading(true);
    setTimeout(() => {
      setVisibleMembers((prev) => prev + 4); // Load 4 more members at a time
      setLoading(false);
    }, 500); // Simulate loading time
  };

  const displayedMembers = teamMembers.slice(0, visibleMembers);

  return (
    <section className="bg-gray-100 py-12" id="alumini">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8 glitter_text">Our Dynamic Team</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {displayedMembers.map((member, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg overflow-hidden relative group"
            >
              <div className="relative">
                <Image
                  src={member.image}
                  alt={member.name}
                  width={200}
                  height={200}
                  className="w-full h-40 object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-blue-500 opacity-0 group-hover:opacity-20 transition cursor-pointer"></div>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800">{member.name}</h3>
                <p className="text-sm text-gray-600">{member.role}</p>
              </div>
              <div className="absolute top-0 left-0 w-4 h-4 bg-blue-500"></div>
              <div className="absolute bottom-0 right-0 w-4 h-4 bg-orange-500"></div>
            </div>
          ))}
        </div>
        {visibleMembers < teamMembers.length && (
          <div className="text-center mt-6">
            <button
              onClick={loadMoreMembers}
              className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
              disabled={loading}
              aria-label="Load more team members"
            >
              {loading ? 'Loading...' : 'Load More'}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default DynamicTeam;


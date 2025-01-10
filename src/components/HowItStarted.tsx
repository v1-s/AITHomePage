import React from 'react';

const HowItStarted = () => {
  return (
    <section className="bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
          <div className="lg:col-span-2">
            <h2 className="text-xl md:text-3xl font-bold text-gray-800 mb-6">How it all started?</h2>
            <p className="text-sm md:text-base text-gray-700 mb-6">
              Murali Pagadala, along with his vision for AchieversIT, was looking forward to revolutionizing IT education.
              Surprisingly, very few institutions in the country provided quality training in advanced IT technologies.
              Their only option was to rely on generic online courses, which were either too expensive or lacked proper
              mentorship and practical exposure. Realizing this gap, Murali decided to create a platform that provides
              affordable, practical, and career-oriented training for learners across the globe.
            </p>
            <h3 className="font-semibold text-gray-800 mb-4 text-md md:text-lg">They seized this untapped opportunity!</h3>
            <p className="text-sm md:text-base text-gray-700 mb-6">
              Murali started by collaborating with experienced IT professionals and industry experts. He then reached out
              to his network on LinkedIn to announce the commencement of specialized IT training. Within a week, he
              received an overwhelming response, with more than 20 professionals eager to contribute as trainers and
              mentors.
            </p>
            <p className="text-sm md:text-base text-gray-700 mb-6">
              Within just 3 months of launching AchieversIT, several renowned IT companies, including startups and
              enterprises, expressed their interest in training their employees. One such client asked for 300 employees
              to be trained on cutting-edge technologies immediately, showcasing the demand for tailored IT training
              programs.
            </p>
            <h3 className="font-semibold text-gray-800 mb-4 text-md md:text-lg">
              This was an important milestone that prompted Murali to establish AchieversIT as a leader in IT training.
            </h3>
            <p className="text-sm md:text-base text-gray-700 mb-6">
              Since its inception, AchieversIT has become a trusted name in providing high-quality training in areas like
              Web Development, Cloud Computing, Data Science, UI/UX, and more. The company has collaborated with leading
              industry players to design and deliver 200+ technical training programs. To date, AchieversIT has empowered
              over 500,000 learners to achieve their career goals, solidifying its position as a pioneer in IT education.
            </p>
            <p className=" text-sm md:text-base text-gray-700">
              These training programs not only offer learners a deep understanding of the latest IT technologies but also
              bridge the skill gaps required to excel in today&apos;s competitive job market.
            </p>
          </div>

          {/* Quote Section */}
          <div className="p-6 flex items-center">
            <blockquote className="text-purple-600 italic text-md md:text-lg">
              “At AchieversIT, we are committed to transforming education by combining practical learning and expert
              mentorship to create industry-ready professionals.”
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItStarted;

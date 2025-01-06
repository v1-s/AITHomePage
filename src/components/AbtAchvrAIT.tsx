import React from 'react';

const AboutAchieversIT = () => {
  const sections = [
    {
      title: 'What is AchieversIT?',
      content: `AchieversIT is a leading training institute renowned for offering high-quality, practical IT training programs tailored to meet the demands of today’s dynamic industries. Founded with the mission of bridging the gap between academia and real-world skills, AchieversIT has become a trusted name among learners aspiring to build successful careers in IT. The institute is committed to empowering students with hands-on skills and guaranteed placement support, ensuring a seamless transition into the workforce.`,
    },
    {
      title: 'What are the courses provided by AchieversIT?',
      content: `AchieversIT provides a wide range of industry-relevant courses designed to equip students with practical skills and knowledge. Their course offerings include Web Development, Data Science, Cloud Computing, Digital Marketing, UI/UX Design, Python Programming, Salesforce, and more. With highly experienced trainers and a strong emphasis on project-based learning, AchieversIT ensures that learners are job-ready. All courses are backed by dedicated support systems, placement assistance, and access to extensive learning resources, including guides, live projects, and mentorship.`,
    },
    {
      title: 'Who is the founder of AchieversIT?',
      content: `AchieversIT was founded by Murali Pagadala with a vision to redefine the learning experience in IT education. Murali’s leadership and dedication have been instrumental in making AchieversIT a premier destination for IT training. His innovative approach and commitment to excellence have helped thousands of learners acquire industry-relevant skills and achieve their career aspirations.`,
    },
    {
      title: 'What is the mission behind AchieversIT courses?',
      content: `AchieversIT’s mission is to empower learners with practical and hands-on IT skills essential for excelling in their professional careers. The institute focuses on designing courses that directly address the demands of global industries. AchieversIT strives to connect students with real-world scenarios, offering extensive project-based training to ensure learners are ready to face workplace challenges.

A dedicated placement support team at AchieversIT ensures that students not only learn but also secure rewarding career opportunities with top organizations. By fostering a culture of innovation and practical learning, AchieversIT ensures its students remain competitive and successful in their fields.`,
    },
    {
      title: 'What is the vision behind AchieversIT?',
      content: `The vision of AchieversIT is to create a world where learning is accessible, practical, and directly aligned with industry requirements. The institute is committed to helping students achieve their dreams by offering top-notch training and mentorship. AchieversIT aims to be a leader in IT education by continuously adapting to evolving industry trends and ensuring that learners receive cutting-edge training that enables them to excel in their chosen domains.`,
    },
    {
      title: 'How is AchieversIT different from traditional training?',
      content: `AchieversIT stands apart from traditional training institutes by focusing on practical, hands-on learning experiences. Unlike conventional education that prioritizes theoretical knowledge, AchieversIT emphasizes project-based learning, personalized mentorship, and live industry exposure. The institute’s curriculum is designed in collaboration with industry experts to ensure relevance and immediate applicability in the job market. AchieversIT’s unique approach bridges the gap between academic learning and professional requirements, empowering students to achieve their career goals.`,
    },
  ];

  return (
    <section className="py-10 px-6 sm:px-8 lg:px-12">
      <div className="max-w-7xl mx-auto">
        {sections.map((section, index) => (
          <div key={index} className="mb-12">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              <span className='glitter_text'>{section.title}</span>
            </h3>
            <p className="text-gray-800">{section.content}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AboutAchieversIT;

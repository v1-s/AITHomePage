// import { useState, useEffect } from 'react';

// export default function LMSPage() {
//   const [content, setContent] = useState('');
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(false);

//   useEffect(() => {
//     const loadLMSContent = async () => {
//       try {
//         const response = await fetch('http://lms.achieversit.com/lms-core/index.php');
//         if (!response.ok) {
//           throw new Error('Failed to fetch');
//         }
//         const text = await response.text();
//         setContent(text);
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching LMS content:', error);
//         setError(true);
//         setLoading(false);
//       }
//     };

//     loadLMSContent();
//   }, []);

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center min-h-screen">
//         <div className="animate-spin rounded-full border-t-4 border-mainblue w-16 h-16"></div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="flex flex-col justify-center items-center min-h-screen text-center">
//         <h1 className="text-5xl font-bold text-maincolor_1 mb-4">404 - Content Not Found</h1>
//         <p className="text-xl text-gray-600 mb-4">We couldn&apos;t load the requested page. Please try again later.</p>
//         <p className="mt-4 text-lg text-gray-500">Something went wrong while fetching the LMS content.</p>
//       </div>
//     );
//   }

//   return (
//     <div>
//       {/* Display the content dynamically */}
//       <div
//         className="lms-content"
//         dangerouslySetInnerHTML={{ __html: content }}
//       />
//     </div>
//   );
// }

import { useState, useEffect } from 'react';

export default function LMSPage() {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const loadLMSContent = async () => {
    setLoading(true);
    setError(false);
    try {
      const response = await fetch('http://lms.achieversit.com/lms-core/index.php');
      if (!response.ok) {
        throw new Error('Failed to fetch');
      }
      const text = await response.text();
      setContent(text);
    } catch (error) {
      console.error('Error fetching LMS content:', error);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLMSContent();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full border-t-4 border-mainblue w-16 h-16"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen text-center">
        <h1 className="text-5xl font-bold text-maincolor_1 mb-4">404 - Content Not Found</h1>
        <p className="text-xl text-gray-600 mb-4">We couldn&apos;t load the requested page. Please try again later.</p>
        <button
          className="bg-mainblue text-white px-4 py-2 rounded"
          onClick={loadLMSContent}
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div>
      <div
        className="lms-content"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
}

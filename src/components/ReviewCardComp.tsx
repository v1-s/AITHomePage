import Image from "next/image";

interface CareerCardProps {
  name: string;
  role: string;
  company: string;
  image: string;
  storyLink: string;
}

const CareerCard: React.FC<CareerCardProps> = ({ name, role, company, image, storyLink }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center h-full">
      {/* Profile Image */}
      <div className="w-20 h-20 mb-3">
        <Image
          src={image}
          alt={name}
          width={200}
          height={100}
          className="rounded-full object-cover"
          aria-label={`Profile image of ${name}`}
        />
      </div>

      {/* Career Journey */}
      <div className="flex flex-col items-center justify-center py-2 w-full flex-grow">
        {/* Career Step 1 */}
        <div className="flex items-center mb-3 w-full">
          <div className="border-2 border-gray-500 rounded p-1">
            <Image
              src="/assets/images/company logo/Genpact.webp" // Hardcoded logo for illustration, replace with dynamic 'image' if needed
              alt="Genpact"
              width={100}
              height={100}
              aria-label="Genpact logo"
            />
          </div>
          <div className="ml-3">
            <h2 className="text-lg font-bold">{role}</h2>
            <p className="text-gray-500">{company}</p>
          </div>
        </div>

        {/* Dotted Line and Circle for Step 1 */}
        <div className="flex flex-col items-center mb-3 w-full">
          <div className="h-6 border-l-2 border-dotted border-yellow-500"></div>
          <div className="h-3 w-3 bg-yellow-500 rounded-full"></div>
        </div>

        {/* Career Step 2 */}
        <div className="flex items-center w-full">
          <div className="border-2 border-gray-500 rounded p-1">
            <Image
              src="/assets/images/company logo/Microsoft.webp" // Same as above
              alt="Microsoft"
              width={200}
              height={200}
              aria-label="Microsoft logo"
            />
          </div>
          <div className="ml-3">
            <h2 className="text-lg font-bold">Sales Executive</h2>
            <p className="text-gray-500">Lodha Group</p>
          </div>
        </div>
      </div>

      {/* Horizontal Line Above "View Story" */}
      <hr className="my-3 w-full border-t-2 border-gray-300" />

      {/* Link to Career Story at the Bottom */}
      <a href={storyLink} className="mt-3 text-blue-500 hover:text-blue-700" aria-label={`View story of ${name}`}>
        View Story &rarr;
      </a>
    </div>
  );
};

export default CareerCard;

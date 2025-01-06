'use client';

import { TrophyIcon } from 'lucide-react';  // Import appropriate icons

interface TimelineItem {
  year: string;
  company: string;
  title: string;
  description: string;
}

interface TimelineProps {
  items: TimelineItem[];
}

export function Timeline({ items }: TimelineProps) {
  // Duplicate the items to ensure seamless looping
  const extendedItems = [...items, ...items]; // Duplicate the items for infinite scrolling

  return (
    <div className="w-full overflow-x-hidden pb-8 relative">
      <div className="min-w-max">
        {/* Apply infinite scrolling animation with adjusted speed */}
        <div className="relative top-0 left-0 flex gap-8 timeline-marquee group">
          {extendedItems.map((item, index) => (
            <div
              key={index}
              className="relative w-96 translate-y-4 animate-in fade-in slide-in-from-bottom-4 duration-1200 fill-mode-forwards shadow-glassShadow rounded-md p-4 cursor-pointer group-hover:animate-pause"
              style={{ animationDelay: `${index * 1000}ms` }} // Adjust delay for each item
            >
              {/* Connector Line */}
              <div className="absolute top-8 left-0 w-full">
                <div 
                  className={index === 0
                    ? "h-1 w-1/2 ml-auto bg-muted"
                    : index === extendedItems.length - 1
                    ? "h-1 w-1/2 bg-muted"
                    : "h-1 w-full bg-muted"}
                />
              </div>

              {/* Timeline Node */}
              <div className="relative flex justify-center">
                <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-lg transition-transform hover:scale-110">
                  <span className="h-10 w-10 text-white">
                    <TrophyIcon className="h-10 w-10 text-blue-900" />
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-col justify-between flex-grow text-center">
                <div className="font-bold text-2xl glitter_text">{item.year}</div>
                <div className="text-xl font-bold uppercase glitter_text font-medium">{item.title}</div>
                <p className="mt-2 text-md text-grey-400 flex-grow">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Styles for infinite scrolling and item animations */}
      <style jsx>{`
        .timeline-marquee {
          display: flex;
          animation: marquee 120s linear infinite; /* Adjust time for speed */
        }

        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        /* For smooth transition of items as they enter */
        .animate-in {
          animation: fadeIn 1s ease-in-out;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .group:hover .timeline-marquee {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}


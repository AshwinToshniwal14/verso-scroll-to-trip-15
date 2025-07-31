interface ContentBubbleProps {
  content: {
    id: number;
    thumbnail: string;
    source: string;
    location: string;
    type: string;
  };
  index: number;
  isAnimated: boolean;
  isMobile: boolean;
}

export const ContentBubble = ({ content, index, isAnimated, isMobile }: ContentBubbleProps) => {
  const getSourceIcon = (source: string) => {
    switch (source) {
      case 'IG': return '📸';
      case 'WA': return '💬';
      case 'TT': return '🎵';
      default: return '📱';
    }
  };

  const getSourceColor = (source: string) => {
    switch (source) {
      case 'IG': return 'bg-gradient-to-r from-purple-500 to-pink-500';
      case 'WA': return 'bg-green-500';
      case 'TT': return 'bg-black';
      default: return 'bg-gray-500';
    }
  };

  const mobilePositions = [
    { left: '10%', top: '5%' },
    { right: '15%', top: '15%' },
    { left: '5%', top: '35%' },
    { right: '10%', top: '50%' },
    { left: '20%', top: '70%' }
  ];

  const desktopPositions = [
    { left: '15%', top: '10%' },
    { right: '20%', top: '5%' },
    { left: '10%', top: '40%' },
    { right: '15%', top: '35%' },
    { left: '25%', top: '65%' }
  ];

  const positions = isMobile ? mobilePositions : desktopPositions;
  const position = positions[index % positions.length];

  const animationDelay = index * 200;
  const clusterDelay = 2000 + (index * 100);

  return (
    <div
      className={`absolute transition-all duration-1000 ease-out ${
        isAnimated 
          ? 'opacity-100 scale-100' 
          : 'opacity-0 scale-50'
      }`}
      style={{
        ...position,
        transitionDelay: `${animationDelay}ms`,
        transform: isAnimated && Date.now() > clusterDelay 
          ? 'translate(50%, 50%) scale(0.8)' 
          : undefined
      }}
    >
      <div className="relative group cursor-pointer">
        {/* Content Card */}
        <div className="w-20 h-20 md:w-24 md:h-24 rounded-xl overflow-hidden shadow-lg border-2 border-white hover:scale-105 transition-transform duration-200">
          <img 
            src={content.thumbnail} 
            alt={content.location}
            className="w-full h-full object-cover"
          />
          
          {/* Source Badge */}
          <div className={`absolute -top-2 -right-2 w-6 h-6 ${getSourceColor(content.source)} rounded-full flex items-center justify-center text-white text-xs font-bold shadow-sm`}>
            {content.source}
          </div>
        </div>

        {/* Hover Tooltip */}
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
          <div className="bg-black/80 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
            {content.location}
          </div>
          <div className="w-2 h-2 bg-black/80 transform rotate-45 mx-auto -mt-1"></div>
        </div>
      </div>
    </div>
  );
};
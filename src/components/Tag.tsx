import React from 'react';

interface TagProps {
  name: string;
  description: string;
}

// Composant Tag2
export const Tag2: React.FC<TagProps> = ({ name, description }) => {
  return (
    <div className="relative inline-block group">
      <span className="bg-blue-500 text-white px-2 py-1 rounded cursor-pointer">
        {name}
      </span>
      <div className="absolute left-0 mt-2 w-64 bg-gray-800 text-white text-sm p-2 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        {description}
      </div>
    </div>
  );
};

// Composant Tag
const Tag: React.FC<TagProps> = ({ name, description }) => {
  return (
    <div className="relative inline-block group">
      <span className="mx-1 bg-black text-white py-1 px-3 rounded-xl cursor-pointer">
        {name}
      </span>
      <div className="absolute left-1/2 transform -translate-x-1/2 mt-2 hidden group-hover:block bg-white w-64 text-center text-black p-2 rounded-lg shadow-lg z-50">
        <div className="relative">
          <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-white rotate-45"></div> {/* Triangle pointe */}
          <small>{description}</small>
        </div>
      </div>
    </div>
  );
};

export default Tag;

import React from 'react';

interface BadgeProps {
  label: string;
  color: 'red' | 'green' | 'yellow' | 'pink';
}

const colorMap = {
  red: 'bg-red-500',
  green: 'bg-green-600',
  yellow: 'bg-yellow-400',
  pink: 'bg-pink-500',
};

const Badge: React.FC<BadgeProps> = ({ label, color }) => {
  return (
    <span
      className={`text-white text-[10px] font-bold px-2 py-1 rounded-sm absolute top-2 left-2 ${colorMap[color]}`}
    >
      {label}
    </span>
  );
};

export default Badge;

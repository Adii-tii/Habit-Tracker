import React from "react";

const UserLevelCard = ({ userName, userId, userLevel }) => {
  return (
    <div className="bg-gray-100 text-yellow-500 rounded-xl p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-black">{userName}</h3>
          <p className="text-sm text-gray-800">{userId}</p>
        </div>
        <div className="text-right">
          <div className="text-3xl font-bold">{userLevel}</div>
          <p className="text-sm text-gray-800">Level</p>
        </div>
      </div>
      <div className="mt-4 pt-4 border-t border-gray-700">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-800">Progress to next level</span>
          <span className="text-sm font-medium">75%</span>
        </div>
        <div className="w-full bg-yellow-500 rounded-full h-2">
          <div className="bg-black h-2 rounded-full transition-all duration-300" style={{ width: '75%' }}></div>
        </div>
      </div>
    </div>
  );
};

export default UserLevelCard;
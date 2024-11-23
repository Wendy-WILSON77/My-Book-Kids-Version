import React from 'react';

const GroupButtonList = ({ book, index, toggleLikeBook }) => {
  return (
    <div className="flex justify-between items-center p-4 font-bold">
      <div className="flex-grow">
      </div>
      <button
        className={`heart-button ${book.liked ? 'liked' : ''} ml-4`}
        onClick={() => toggleLikeBook(book, index)}
      >
        ❤️
      </button>
    </div>
  );
};

export default GroupButtonList;


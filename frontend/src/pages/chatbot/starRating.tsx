import { useState } from 'react';
import { CiStar } from 'react-icons/ci';

export default function StarRating() {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  return (
    <div className="flex flex-col items-center gap-4 p-6 bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl shadow-lg border border-slate-700 max-w-xs mx-auto">
      <h3 className="text-xl font-semibold text-slate-100">Rate Your Experience</h3>

      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map(star => (
          <button
            type="button"
            title="Rate Your Experience"
            key={star}
            className="transition-all duration-200 transform hover:scale-110 focus:outline-none"
            onMouseEnter={() => setHoverRating(star)}
            onMouseLeave={() => setHoverRating(0)}
            onClick={() => setRating(star)}
          >
            <CiStar
              size={36}
              fill={(hoverRating || rating) >= star ? '#FBBF24' : 'transparent'}
              stroke={(hoverRating || rating) >= star ? '#FBBF24' : '#94A3B8'}
              strokeWidth={1.5}
              className={`transition-colors duration-200 ${
                (hoverRating || rating) >= star ? 'text-amber-400' : 'text-slate-400'
              }`}
            />
          </button>
        ))}
      </div>

      <div className="h-6 mt-1">
        {rating > 0 && (
          <p className="text-sm font-medium text-center text-slate-300 animate-fade-in">
            {rating === 5 && 'Excellent!'}
            {rating === 4 && 'Very Good!'}
            {rating === 3 && 'Good'}
            {rating === 2 && 'Fair'}
            {rating === 1 && 'Poor'}
          </p>
        )}
      </div>

      {rating > 0 && (
        <button
          type="button"
          onClick={() => setRating(0)}
          className="mt-2 px-4 py-1 text-xs font-medium text-slate-400 hover:text-slate-300 bg-slate-700 hover:bg-slate-600 rounded-full transition-colors"
        >
          Clear
        </button>
      )}
    </div>
  );
}


import { StarIcon as FullStar } from '@heroicons/react/24/solid';
import { StarIcon as EmptyStar } from '@heroicons/react/24/outline';

type starratingProps={
    rating:number,
    maxStars:number,
}

// Props: rating should be a number (e.g., 4.5, 3)
const StarRating = ({ rating , maxStars  }:starratingProps) => {
    // Calculate full stars, half stars, and empty stars
    const fullStars = Math.floor(rating); // Full stars
    const halfStar = rating % 1 >= 0.5; // Check if we need a half star
    const emptyStars = maxStars - fullStars - (halfStar ? 1 : 0);

    return (
        <div className="flex items-center space-x-1">
            {/* Render full stars */}
            {[...Array(fullStars)].map((_, index) => (
                <FullStar key={index} className="w-5 h-5 text-yellow-400" />
            ))}
            
            {/* Render half star if needed */}
            {halfStar && (
                <FullStar className="w-5 h-5 text-yellow-400" style={{ clipPath: 'inset(0 50% 0 0)' }} />
            )}

            {/* Render empty stars */}
            {[...Array(emptyStars)].map((_, index) => (
                <EmptyStar key={index} className="w-5 h-5 text-gray-300" />
            ))}
        </div>
    );
};

export default StarRating;

import React, {useState} from 'react';
import { Star, MoreHorizontal, ThumbsUp, Lightbulb, MessageSquare } from 'lucide-react';
import tripadvisor from '../assets/images/tripadvisor.svg';
import googlemaps from '../assets/images/googlemaps.svg';
// import reviewrating from '../assets/images/reviewrating.svg';
import star1 from '../assets/images/star1.svg'
import useful2 from '../assets/images/useful2.svg'
import comment from '../assets/images/comment.svg'

// Accept reviews from API via props
const defaultReviewsData = [
    {
        author: 'Abel Shola',
        title: 'Business Owner',
        date: 'Dec 1, 2025',
        rating: 4,
        reviewText: 'Our passion for driver construction stems from a genuine desire to foster safer communities. We understand that new drivers are challenging, but we have a team of experts.Our passion for driver construction stems from a genuine desire to foster safer communities. We understand that new drivers are challenging, but we have a team of experts.',
        useful: 6,
        notUseful: 3,
        useful3: 9,
        message: 6,
        avatar: 'https://placehold.co/40x40/E5E7EB/9CA3AF?text=A'
    }
];

// Helper component for the progress bars in the rating breakdown
const RatingBar = ({ stars, percentage }) => {
    return (
        <div className="flex items-center space-x-2">
            <span className="flex flex-row text-[13px] md:text-[14px] w-[60px] text-gray-500">{stars} stars</span>
            <div className="w-full bg-[#FBEBE6] rounded-full h-2 my-3">
                <div
                    className="bg-[#DB3A06] h-2 rounded-full"
                    style={{ width: `${percentage}%` }}
                ></div>
            </div>
        </div>
    );
};

// Helper component for the individual review card
const ReviewCard = ({ review }) => {
    // API review fields: comment, rating, createdAt, user
    const author = review.user?.firstname && review.user?.lastname
        ? `${review.user.firstname} ${review.user.lastname}`
        : review.user?.firstname || review.author || 'Anonymous';
    const title = review.user?.role ? review.user.role : review.title || '';
    const date = review.createdAt ? new Date(review.createdAt).toLocaleDateString() : review.date || '';
    const rating = review.rating || 0;
    const reviewText = review.comment || review.reviewText || '';
    const avatar = review.user?.image_url || review.avatar || 'https://placehold.co/40x40/E5E7EB/9CA3AF?text=A';
    // Useful counts not in API, fallback to 0
    const useful = review.useful || 0;
    const notUseful = review.notUseful || 0;
    // const useful3 = review.useful3 || 0;
    const message = review.message || 0;

    return (
        <div className="bg-white rounded-xl p-4 sm:p-6 shadow-md border border-gray-100 mb-6">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                    <img src={avatar} alt={author} className="w-10 h-10 rounded-full" />
                    <div>
                        <h4 className="text-[#000000] text-lg font-medium">{author}</h4>
                        <p className="text-sm font-normal text-gray-500">{title}</p>
                    </div>
                </div>
                {/* <button>
                    <MoreHorizontal className="w-5 h-5 text-gray-400" />
                </button> */}
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-500 mb-2">
                <div className="flex space-x-0.5">
                    {Array.from({ length: rating }).map((_, i) => (
                        <img key={i} src={star1} alt='star' />
                    ))}
                    {Array.from({ length: 5 - rating }).map((_, i) => (
                        <Star key={i} className="w-6 h-6 text-gray-300" />
                    ))}
                </div>
                <span>{date}</span>
            </div>
            <p className="text-base font-normal text-[#00000] mb-4">{reviewText}</p>
            <div className="flex items-center space-x-4 text-gray-500 text-xs flex-wrap md:flex-nowrap gap-3 md:gap-0">
                <div className="bg-[#e9f0fd] p-2 rounded-[89.26px] pt-0.5 pr-2 pb-0.5 pl-2 gap-[5px] flex items-center space-x-1">
                    <img src={useful2} alt="icon" />
                    <span>Usefull {useful}</span>
                </div>
                <div className="bg-[#e9f0fd] p-2 rounded-[89.26px] pt-0.5 pr-2 pb-0.5 pl-2 gap-[5px] flex items-center space-x-1">
                    <img src={useful2} alt="icon" className='rotate-180' />
                    <span>Not Usefull {notUseful}</span>
                </div>
                <div className="bg-[#e9f0fd] p-2 rounded-[89.26px] pt-0.5 pr-2 pb-0.5 pl-2 gap-[5px] flex items-center space-x-1">
                    <img src={comment} alt="icon" />
                    <span>{message}</span>
                </div>
            </div>
        </div>
    );
};

export default function ServicesReview({ reviews, totalReviews, averageRating }) {
    // Use API reviews if provided, else fallback
    const reviewsData = Array.isArray(reviews) && reviews.length > 0 ? reviews : defaultReviewsData;
    const total = typeof totalReviews === 'number' ? totalReviews : reviewsData.length;
    const avgRating = typeof averageRating === 'number' ? averageRating : 4.0;

    // Star rating breakdown
    const starCounts = [0, 0, 0, 0, 0];
    let recommendedCount = 0;
    reviewsData.forEach((review) => {
        const rating = review.rating || 0;
        if (rating >= 1 && rating <= 5) {
            starCounts[rating - 1] += 1;
            if (rating >= 4) recommendedCount += 1;
        }
    });
    const percentages = starCounts.map((count) => (total > 0 ? Math.round((count / total) * 100) : 0));
    const percentRecommended = total > 0 ? Math.round((recommendedCount / total) * 100) : 0;

    // Show more / show less state
    const [visibleCount, setVisibleCount] = useState(3);
    const isShowingAll = visibleCount >= reviewsData.length;

    const handleToggleReviews = () => {
        if (isShowingAll) {
            setVisibleCount(3); // collapse
        } else {
            setVisibleCount(reviewsData.length); // show all
        }
    };

    return (
        <div className="bg-gray-50 rounded-[10px] border border-solid border-gray-300 font-sans antialiased mb-6">
            <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <h2 className="text-[17px] md:text-2xl font-semibold text-[#000000] mb-2">
                    Recommended Reviews <span className='font-normal'>({total})</span>
                </h2>

                {/* Overall Rating Section */}
                <div className="bg-white rounded-[10px] p-4 border border-solid border-gray-300 mb-3">
                    <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0 md:space-x-8">
                        {/* Rating Score */}
                        <div className="w-full flex flex-col md:flex-row items-start md:items-center space-x-4">
                            {/* Tripadvisor and Google Maps logo */}
                            <div className="flex md:flex-col justify-center gap-3 md:gap-0 w-full md:w-[32%] text-left space-y-0 md:space-y-3 mb-4 md:mb-0">
                                {/* Tripadvisor placeholder logo */}
                                <div className="mt-1 bg-[#E0F7FF] p-2 flex flex-col items-start justify-start">
                                    <p className="text-[#03aeef] text-[15.188206672668457px] font-bold leading-normal">8.4/10</p>
                                    <p className="text-[#1d2a36] text-[6.513221263885498px] leading-normal font-medium">(Very Good, 8,950 Reviews)</p>
                                    <img src={tripadvisor} alt="tripadvisor" className='mt-1' />
                                </div>
                                {/* Google Maps placeholder logo */}
                                <div className="mt-1 bg-[#E9FFEF] p-2 flex flex-col items-start justify-start">
                                    <p className="text-[#35a853] text-[15.188206672668457px] font-bold leading-normal">8.4/10</p>
                                    <p className="text-[#1d2a36] text-[6.513221263885498px] leading-normal font-medium">(Very Good, 8,950 Reviews)</p>
                                    <img src={googlemaps} alt="google maps" className='mt-1'/>
                                </div>
                            </div>

                            {/* Overall Rating Section */}
                            <div className=" text-center">
                                <h3 className="text-xl text-left font-medium text-gray-800 ">Overall Rating</h3>
                                <div className="flex flex-col space-x-1 justify-center mb-0">
                                    <div className="flex flex-row gap-3 items-center justify-start self-stretch shrink-0 relative">
                                        <div className="flex flex-row gap-[11px] items-center justify-start shrink-0 w-[157px] relative">
                                            <div className="flex flex-row items-center relative"
                                            >
                                                {Array.from({ length: 5 }).map((_, i) => (
                                                <img
                                                    key={i}
                                                    src={star1}
                                                    alt="star"
                                                    className={`w-6 h-6 md:w-8 md:h-8 ${i < Math.round(avgRating) ? '' : 'opacity-15'}`}
                                                />
                                                ))}
                                                <span className="font-['-',_sans-serif] text-[22px] md:text-[32px] font-normal">{avgRating.toFixed(1)}</span>
                                                <span className="_4-0-128-span2" />
                                                <span className="font-['-',_sans-serif] text-[22px] md:text-[32px] font-normal">({total})</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className='flex flex-col items-start justify-start'>
                                        <p className="mt-1 text-[24px] md:text-[32px] text-[#000] font-semibold">{percentRecommended}%</p>
                                        <p className="text-sm md:text-xl font-semibold text-[#DB3A06]">Recommended</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Star Rating Breakdown (integrated with backend) */}
                        <div className="w-full md:w-[32%] flex-shrink-0">
                            <RatingBar stars={5} percentage={percentages[4]} />
                            <RatingBar stars={4} percentage={percentages[3]} />
                            <RatingBar stars={3} percentage={percentages[2]} />
                            <RatingBar stars={2} percentage={percentages[1]} />
                            <RatingBar stars={1} percentage={percentages[0]} />
                        </div>
                    </div>
                </div>

                {/* Individual Reviews Section */}
                <div className="space-y-6">
                    {reviewsData.slice(0, visibleCount).map((review, index) => (
                        <ReviewCard key={index} review={review} />
                    ))}

                    {reviewsData.length > 3 && (
                        <div className="flex justify-center mt-4 mb-4">
                            <button
                                onClick={handleToggleReviews}
                                className="px-6 py-3 rounded-lg bg-[#DB3A06] text-white font-semibold hover:bg-orange-700 transition-colors"
                            >
                                {isShowingAll ? 'Show Less Reviews' : 'Show More Reviews'}
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

import ReviewCard from '../../components/ReviewCard'
 const reviewsData = [
    {
      name: 'Pranav V',
      review: 'Lorem ipsum Lorem, ipsum dolor. Lorem ipsum dolor sit amet consectetur.',
      verified: true,
      stars: 5,
    },
    {
      name: 'John Doe',
      review: 'Amazing product! Will buy again.',
      verified: true,
      stars: 4,
    },
    {
      name: 'Jane Smith',
      review: 'Good quality but delivery was late.',
      verified: false,
      stars: 3,
    },
    {
      name: 'Pranav V',
      review: 'Lorem ipsum Lorem, ipsum dolor. Lorem ipsum dolor sit amet consectetur.',
      verified: true,
      stars: 5,
    },
    {
      name: 'John Doe',
      review: 'Amazing product! Will buy again.',
      verified: true,
      stars: 4,
    },
    {
      name: 'Jane Smith',
      review: 'Good quality but delivery was late.',
      verified: false,
      stars: 3,
    },
  ];
const Reviews = () => {
  return (
    <div className="w-full p-4">
      <h2 className="font-text text-3xl sm:text-4xl font-semibold tracking-wide">Customer Reviews</h2>

      {reviewsData.map((review, index) => (
        <ReviewCard
          key={index}
          name={review.name}
          review={review.review}
          verified={review.verified}
          stars={review.stars}
        />
      ))}
    </div>
  );
}

export default Reviews
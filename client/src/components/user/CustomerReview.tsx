import { FaStar } from "react-icons/fa"
import { MdVerified } from "react-icons/md"
import ReviewCard from "../ReviewCard"
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

const CustomerReview = () => {
    return (
        <>
            <p className="font-text text-3xl sm:text-4xl font-semibold tracking-wide text-center">CUSTOMER RATING</p>
            <section className="grid 1 sm:grid-cols-4 font-text">

                {reviewsData.map((review, index) => (
        <ReviewCard
          key={index}
          name={review.name}
          review={review.review}
          verified={review.verified}
          stars={review.stars}
        />
      ))}





            </section>
        </>

    )
}

export default CustomerReview
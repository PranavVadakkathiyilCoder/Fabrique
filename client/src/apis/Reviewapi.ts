import axios from "./axios"; // or wherever you export your axios instance

 const submitProductReview = async (data: {
  product: string;
  order: string;
  rating: number;
  review: string;
}) => {
  return axios.post("/review/addreivew", data);
};

const GetSellerReview = async () => {
  return axios.get("/review/getsellerreview");
};



export {submitProductReview,GetSellerReview}
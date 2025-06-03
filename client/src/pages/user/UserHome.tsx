import NewArrivels from "../../components/user/NewArrivels"
import Slider from "../../components/user/Swiper"
import TopSelling from "../../components/user/TopSelling"
import UserNav from "../../layout/user/UserNav"

import CustomerReview from "../../components/user/CustomerReview"
import Footer from "../../layout/Footer"
import NavBarMobile from "../../layout/user/NavBarMobile"

const UserHome = () => {
  return (
    <>
    <UserNav/>
    <Slider/>
    <NewArrivels/>
    <TopSelling/>
    <CustomerReview/>
    <Footer/>
    
    
    
    </>
  )
}

export default UserHome
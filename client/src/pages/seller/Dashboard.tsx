import { BsArrowUpRightCircle, BsThreeDots } from "react-icons/bs"
import BarChart from '../../components/seller/charts/Barchart'
import Piechart from "../../components/seller/charts/PieChart"

const Dashboard = () => {
  return (
    <div className="w-screen">
      <h2 className="text-2xl font-bold mb-4 p-4">Customer Chats</h2>
        <section className="grid sm:grid-cols-4 grid-cols-1 p-4 gap-6">
            <div className="col-span-1 border-l-5 border-l-blue-500    shadow-xl rounded-md ">
                
                <div className="flex items-center justify-between px-3 py-3">
                    <p className="sm:text-3xl">Total Earning </p>
                    <p className="text-xl"><BsArrowUpRightCircle/></p>
                </div>
                <div className="text-center flex  justify-center">
                    <p className="text-gray-500">$</p>
                    <p className="sm:text-6xl text-4xl "> 450</p>
                    
                </div>
                <p className="float-right px-3 text-3xl text-gray-500"><BsThreeDots/></p>
            </div>
            
            
            <div className="col-span-1 border-l-5 border-l-red-500   shadow-xl rounded-md ">
                
                <div className="flex items-center justify-between px-3 py-3">
                    <p className="sm:text-3xl">Total Stocks</p>
                    <p className="text-xl"><BsArrowUpRightCircle/></p>
                </div>
                <div className="text-center flex  justify-center">
                    <p className="text-gray-500">$</p>
                    <p className="sm:text-6xl text-4xl  "> 450</p>
                    
                </div>
                <p className="float-right px-3 text-3xl text-gray-500"><BsThreeDots/></p>
            </div>
            <div className="col-span-1 border-l-5 border-l-yellow-500  shadow-xl rounded-md ">
                
                <div className="flex items-center justify-between px-3 py-3">
                    <p className="sm:text-3xl">Total Orders</p>
                    <p className="text-xl"><BsArrowUpRightCircle/></p>
                </div>
                <div className="text-center flex  justify-center">
                    <p className="text-gray-500">$</p>
                    <p className="sm:text-6xl text-4xl  "> 450</p>
                    
                </div>
                <p className="float-right px-3 text-3xl text-gray-500"><BsThreeDots/></p>
            </div>
            <div className="col-span-1 border-l-5 border-l-green-500   shadow-xl rounded-md ">
                
                <div className="flex items-center justify-between px-3 py-3">
                    <p className="sm:text-3xl">Reviews</p>
                    <p className="text-xl"><BsArrowUpRightCircle/></p>
                </div>
                <div className="text-center flex  justify-center">
                    <p className="text-gray-500">$</p>
                    <p className="sm:text-6xl text-4xl  "> 450</p>
                    
                </div>
                <p className="float-right px-3 text-3xl text-gray-500"><BsThreeDots/></p>
            </div>
        </section>
        <section>
            <p>Earning </p>
            <BarChart/>
        </section>
        <section>
            <p>Stocks</p>
            <Piechart/>
        </section>
    </div>
  )
}

export default Dashboard
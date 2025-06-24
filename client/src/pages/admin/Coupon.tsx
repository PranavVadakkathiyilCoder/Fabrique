import { useEffect, useState } from "react";
import { addCoupon, getCoupon, blockCoupon } from "../../apis/Couponapi";
import toast from "react-hot-toast";

type CouponType = {
    _id: string;
    code: string;
    actions: string;
    offer: number;
    expiryDate: string;
    maxUsage: number;
    usedCount: number;
    status:string;
    createdAt: string;
};

const Coupon = () => {
    const [showForm, setShowForm] = useState(false);
    const [coupons, setCoupons] = useState<CouponType[]>([]);
    const [addcoupon, setaddcoupon] = useState(false)
    const successmsg = (msg: string) => {
        toast.success(msg, {
            icon: "👏",
            style: { backgroundColor: "black", color: "white" },
        })
    }

    const errmsg = (msg: string) => {
        toast.error(msg, {
            icon: "🔥",
            style: { backgroundColor: "#d00000", color: "white" },
        })
    }
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const form = e.currentTarget;
        const code = (form.code as HTMLInputElement).value;
        const offer = Number((form.offer as HTMLInputElement).value);
        const expiryDate = (form.expiryDate as HTMLInputElement).value;
        const maxUsage = Number((form.maxUsage as HTMLInputElement).value);
        const data = {
            code,
            offer,
            expiryDate,
            maxUsage,
        };

        try {
            const res = await addCoupon(data);
            console.log(res.data);
            
            if (res.data.success) {
                setaddcoupon(true)
                successmsg("Coupon Added Successful")
            }
        } catch (error) {
            console.error(error);
        }

        setShowForm(false);
    };

    const getcoupons = async () => {
        try {
            const res = await getCoupon()
            console.log(res.data);
            setCoupons(res.data.Coupon)

        } catch (error) {
            console.log(error);

        }
    }
    const blockCoupons = async (couponId: string) => {
        try {
            console.log("id", couponId);

            const res = await blockCoupon(couponId)
            console.log(res.data);
        } catch (error) {
            console.log(error);

        }
    }
    useEffect(() => {


        getcoupons()
    }, [addcoupon])





    return (
        <div className="p-4">
            <button
                onClick={() => setShowForm(!showForm)}
                className="mb-4 px-4 py-2 bg-black text-white rounded hover:bg-gray-700"
            >
                Add Coupon +
            </button>

            {showForm && (
                <>

                    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"></div>


                    <div className="fixed inset-0 z-50 flex items-center justify-center">
                        <form
                            onSubmit={handleSubmit}
                            className="p-6 w-full max-w-md bg-white rounded shadow-lg border border-gray-300"
                        >
                            <p className="text-center text-2xl mb-2">ADD COUPEN </p>
                            <div className="mb-4">
                                <label className="block font-medium">Coupon Code:</label>
                                <input
                                    type="text"
                                    name="code"
                                    required
                                    className="w-full p-2 border border-gray-300 rounded outline-none ring-blue-500 focus:ring-2"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block font-medium">Discount : ( in % )</label>
                                <input
                                    type="number"
                                    name="offer"
                                    required
                                    className="w-full p-2 border border-gray-300 rounded outline-none ring-blue-500 focus:ring-2"
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block font-medium">Expiry Date:</label>
                                <input
                                    type="date"
                                    name="expiryDate"
                                    required
                                    className="w-full p-2 border border-gray-300 rounded outline-none ring-blue-500 focus:ring-2"
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block font-medium">Max Usage:</label>
                                <input
                                    type="number"
                                    name="maxUsage"
                                    required
                                    className="w-full p-2 border border-gray-300 rounded outline-none ring-blue-500 focus:ring-2"
                                />
                            </div>

                            <div className="flex justify-center mt-4">
                                <button
                                    type="submit"
                                    className="px-6 py-2 bg-black text-white rounded hover:bg-gray-700"
                                >
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </>
            )}



            {coupons.length > 0 ?

                (
                    <div className="overflow-x-auto">
                        <table className="min-w-full border-collapse border border-gray-300 text-left">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="border border-gray-300 px-4 py-2 text-center">Code</th>
                                    <th className="border border-gray-300 px-4 py-2 text-center">Discount</th>

                                    <th className="border border-gray-300 px-4 py-2 text-center">Created Date</th>
                                    <th className="border border-gray-300 px-4 py-2 text-center">Expiry Date</th>
                                    <th className="border border-gray-300 px-4 py-2 text-center">Max Usage</th>
                                    <th className="border border-gray-300 px-4 py-2 text-center">Used Count</th>
                                    <th className="border border-gray-300 px-4 py-2 text-center">Status</th>
                                    <th className="border border-gray-300 px-4 py-2 text-center">Block</th>
                                </tr>
                            </thead>
                            <tbody>
                                {coupons.map((coupon, idx) => (
                                    <tr key={idx} className="text-center">
                                        <td className="border border-gray-300 px-4 py-2 align-top">{coupon.code}</td>
                                        <td className="border border-gray-300 px-4 py-2 align-top">{coupon.offer} %</td>
                                        <td className="border border-gray-300 px-4 py-2 align-top">
                                            {new Date(coupon.createdAt).toLocaleString("en-IN")}
                                        </td>
                                        <td className="border border-gray-300 px-4 py-2 align-top">
                                            {new Date(coupon.expiryDate).toLocaleString("en-IN")}
                                        </td>
                                        <td className="border border-gray-300 px-4 py-2 align-top">{coupon.maxUsage}</td>
                                        <td className="border border-gray-300 px-4 py-2 align-top">{coupon.usedCount || 0}</td>
                                        <td className="border border-gray-300 px-4 py-2 align-top">{coupon.status}</td>
                                        <td className="border border-gray-300 px-4 py-2 align-top">
                                            <button
                                                onClick={() => blockCoupons(coupon._id)}
                                                disabled={coupon.actions === "Block"}
                                                className={`px-4 py-2 rounded text-white ${coupon.actions === "Block"
                                                    ? "bg-gray-400 cursor-not-allowed"
                                                    : "bg-black hover:bg-gray-700"}`}
                                            >
                                                {coupon.actions === "Block" ? "Blocked" : "Block"}
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )
                :
                (<>
                    <div className="text-center text-gray-500 py-20 text-lg font-medium">
                        🚫 No Coupon Found
                    </div>

                </>)


            }
        </div>
    );
};

export default Coupon;

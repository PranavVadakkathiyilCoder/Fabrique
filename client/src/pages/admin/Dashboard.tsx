import Piechart from "../../components/charts/Piechart";
import BarChart from "../../components/charts/Barchart";

import DashboardCard from "../../components/DashboardCard";

const Dashboard = () => {
  const cardData = [
    { title: 'Total Earning', value: 450, borderColor: 'border-l-blue-500' },
    { title: 'Total Stocks', value: 450, borderColor: 'border-l-red-500' },
    { title: 'Total Orders', value: 450, borderColor: 'border-l-yellow-500' },
    { title: 'Reviews', value: 450, borderColor: 'border-l-green-500' },
  ];

  const BarChartData = [35, 44, 24, 34, 6, 49, 30, 15, 25, 30, 50, 12];

  const PieChartData1 = [
    { id: 0, value: 40, label: 'Electronics' },
    { id: 1, value: 30, label: 'Clothing' },
    { id: 2, value: 15, label: 'Furniture' },
    { id: 3, value: 10, label: 'Beauty' },
    { id: 4, value: 5, label: 'Others' },

  ];
  const PieChartData2 = [
    { id: 0, value: 35, label: 'Defective' },
    { id: 1, value: 25, label: 'Wrong Item' },
    { id: 2, value: 20, label: 'Size Issue' },
    { id: 3, value: 15, label: 'Late Delivery' },
    { id: 4, value: 5, label: 'Others' },
  ];
  const PieChartData3 = [
    { id: 0, value: 60, label: 'Cash on Delivery' },
    { id: 1, value: 25, label: 'UPI' },
    { id: 2, value: 10, label: 'Credit Card' },
    { id: 3, value: 5, label: 'Net Banking' },
  ];

  return (
    <div className="w-screen">
      <h2 className="text-2xl font-bold  p-4">Dashboard
      </h2>
      <section className="grid sm:grid-cols-4 grid-cols-1 p-4 gap-6">
        {cardData.map((card, index) => (
          <DashboardCard
            key={index}
            title={card.title}
            value={card.value}
            borderColor={card.borderColor}
          />
        ))}
      </section>
      <section>
        <p className="text-2xl font-bold  p-4">Earning </p>
        <BarChart chartdata={BarChartData} />
      </section>
      <section >
        <p className="text-2xl font-bold  p-4">Stocks</p>
        <div className="sm:flex">
          <Piechart PieChartData={PieChartData1} />
          <Piechart PieChartData={PieChartData2} />
          <Piechart PieChartData={PieChartData3} />

        </div>

      </section>
    </div>
  )
}

export default Dashboard
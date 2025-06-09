import BarChart from '../../components/charts/Barchart'
import Piechart from '../../components/charts/Piechart'
import DashboardCard from "../../components/DashboardCard"

const Dashboard = () => {
    const cardData = [
        { title: 'Total Earning', value: 450, borderColor: 'border-l-blue-500' },
        { title: 'Total Stocks', value: 450, borderColor: 'border-l-red-500' },
        { title: 'Total Orders', value: 450, borderColor: 'border-l-yellow-500' },
        { title: 'Reviews', value: 450, borderColor: 'border-l-green-500' },
    ];
    const BarChartData = [35, 44, 24, 34, 6, 49, 30, 15, 25, 30, 50, 12];
    const PieChartData = [
        { id: 0, value: 25, label: 'series A' },
        { id: 1, value: 25, label: 'series B' },
        { id: 2, value: 20, label: 'series C' },
        { id: 3, value: 30, label: 'series D' },
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
            <section>
                <p className="text-2xl font-bold flex  p-4">Stocks</p>
                <Piechart PieChartData={PieChartData} />
                <Piechart PieChartData={PieChartData} />
                <Piechart PieChartData={PieChartData} />
            </section>
        </div>
    )
}

export default Dashboard
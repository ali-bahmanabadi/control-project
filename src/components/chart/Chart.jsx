import {
    XAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    BarChart,
    YAxis,
    Legend,
    Bar,
} from 'recharts'
import './chart.scss'

const Chart = ({ title, data }) => {
    console.log('data', data)
    return (
        <div className="chart">
            <div className="title">{title}</div>
            {data && data.length === 0 && (
                <h1>وظیفه ای برای پروژه وجود ندارد!</h1>
            )}
            {data && data.length > 0 && (
                <ResponsiveContainer width="100%">
                    <BarChart
                        width={200}
                        height={100}
                        data={data}
                        margin={{
                            top: 20,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="title" />
                        <YAxis domain={[0, 100]} />
                        <Tooltip />
                        <Legend />
                        <Bar
                            dataKey="taskProgress"
                            stackId="a"
                            fill="#c72f2f"
                            maxBarSize={50}
                            animationDuration={2000}
                        />
                    </BarChart>
                </ResponsiveContainer>
            )}
        </div>
    )
}

export default Chart

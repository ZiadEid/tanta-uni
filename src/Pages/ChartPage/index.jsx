import { useEffect, useState } from 'react'
import { useStore } from '../../Store'
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from 'recharts';

const ChartPage = () => {
  // Global State
  const { chartActive } = useStore();
  // Local State
  const [data, setData] = useState([
    { name: 'Alice', degree: 85 },
    { name: 'Bob', degree: 92 },
    { name: 'Charlie', degree: 78 },
  ]);

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A28DFF', '#FF6699'];

  useEffect(() => {
    chartActive();
  }, [])
  return (
    <div className="grow relative px-6 mt-2">
      {/* <div className='bg-gray-800 rounded-lg'>
        <ResponsiveContainer className="w-full" height={400}>
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis domain={[0, 200]} />
            <Tooltip />
            <Legend />
            <Bar dataKey="degree" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div> */}
      <div className='bg-gray-800 rounded-lg'>
        <ResponsiveContainer width="100%" height={400}>
          <PieChart>
            <Pie
              data={data}
              dataKey="degree"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={120}
              fill="#8884d8"
              label
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default ChartPage
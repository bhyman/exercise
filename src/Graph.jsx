import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Rectangle,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

// Source: https://recharts.org/en-US/examples/SimpleBarChart
export const Graph = ({ data }) => {
  return (
    <ResponsiveContainer>
      <BarChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey={(val) =>
            val.content.length > 5
              ? `${val.content.substr(0, 5)}...`
              : val.content
          }
        />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar
          dataKey="num_followers"
          name="Number of followers"
          fill="#8884d8"
        />
        <Bar
          dataKey="num_following"
          name="Number of following"
          fill="#82ca9d"
        />
      </BarChart>
    </ResponsiveContainer>
  );
};


import React from 'react';
import { 
  BarChart as RechartsBarChart, 
  Bar, 
  LineChart as RechartsLineChart, 
  Line,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer
} from 'recharts';
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';

// Define types for the chart data
type BarChartData = Array<Record<string, any>>;
type LineChartData = Array<Record<string, any>>;
type PieChartData = Array<{name: string; value: number}>;

interface BarChartProps {
  data: BarChartData;
  dataKey?: string;
  height?: number | string;
}

interface LineChartProps {
  data: LineChartData;
  dataKey?: string;
  height?: number | string;
}

interface PieChartProps {
  data: PieChartData;
  height?: number | string;
}

// Default colors for charts
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

// Bar Chart Component
export const BarChart = ({ data, dataKey = 'total', height = '100%' }: BarChartProps) => {
  return (
    <ChartContainer config={{ bar: { theme: { light: "#0088FE", dark: "#4299E1" } } }} className="w-full h-full">
      <ResponsiveContainer width="100%" height={height}>
        <RechartsBarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip content={<ChartTooltipContent />} />
          <Legend />
          <Bar dataKey={dataKey} fill="var(--color-bar)" />
        </RechartsBarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};

// Line Chart Component
export const LineChart = ({ data, dataKey = 'total', height = '100%' }: LineChartProps) => {
  return (
    <ChartContainer config={{ line: { theme: { light: "#0088FE", dark: "#4299E1" } } }} className="w-full h-full">
      <ResponsiveContainer width="100%" height={height}>
        <RechartsLineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip content={<ChartTooltipContent />} />
          <Legend />
          <Line 
            type="monotone" 
            dataKey={dataKey} 
            stroke="var(--color-line)" 
            activeDot={{ r: 8 }} 
          />
        </RechartsLineChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};

// Pie Chart Component
export const PieChart = ({ data, height = '100%' }: PieChartProps) => {
  return (
    <ChartContainer config={{ pie: { theme: { light: "#0088FE", dark: "#4299E1" } } }} className="w-full h-full">
      <ResponsiveContainer width="100%" height={height}>
        <RechartsPieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={true}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip content={<ChartTooltipContent />} />
          <Legend />
        </RechartsPieChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};

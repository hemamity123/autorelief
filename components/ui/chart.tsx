"use client"

import {
  Bar,
  BarChart as RechartsBarChart,
  Cell,
  Legend,
  Pie,
  PieChart as RechartsPieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

interface ChartProps {
  data: any[]
  index: string
  categories: string[]
  colors: string[]
  valueFormatter?: (value: number) => string
  yAxisWidth?: number
}

export function BarChart({ data, index, categories, colors, valueFormatter, yAxisWidth = 56 }: ChartProps) {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <RechartsBarChart data={data}>
        <XAxis dataKey={index} />
        <YAxis width={yAxisWidth} tickFormatter={valueFormatter} />
        <Tooltip formatter={(value: number) => (valueFormatter ? valueFormatter(value) : value)} />
        <Legend />
        {categories.map((category, i) => (
          <Bar key={category} dataKey={category} fill={colors[i % colors.length]} />
        ))}
      </RechartsBarChart>
    </ResponsiveContainer>
  )
}

export function PieChart({ data, index, categories, colors, valueFormatter }: ChartProps) {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <RechartsPieChart>
        <Pie
          data={data}
          nameKey={index}
          dataKey={categories[0]}
          cx="50%"
          cy="50%"
          outerRadius={80}
          label={(entry) => entry[index]}
        >
          {data.map((entry, i) => (
            <Cell key={entry[index]} fill={colors[i % colors.length]} />
          ))}
        </Pie>
        <Tooltip formatter={(value: number) => (valueFormatter ? valueFormatter(value) : value)} />
        <Legend />
      </RechartsPieChart>
    </ResponsiveContainer>
  )
}


"use client"

import { BarChart, PieChart } from "@/components/ui/chart"

interface ChartComponentProps {
  type: "bar" | "pie"
  data: any[]
  config: {
    xAxis?: string
    yAxis?: string | string[]
    colors: string[]
  }
}

export default function ChartComponent({ type, data, config }: ChartComponentProps) {
  const commonProps = {
    data,
    index: config.xAxis || "name",
    categories: Array.isArray(config.yAxis) ? config.yAxis : [config.yAxis || "value"],
    colors: config.colors,
  }

  switch (type) {
    case "bar":
      return <BarChart {...commonProps} />
    case "pie":
      return <PieChart {...commonProps} />
    default:
      return null
  }
}


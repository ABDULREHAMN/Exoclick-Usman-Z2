"use client"
import { useState } from "react"
import { Download, Filter, RefreshCw, BarChart2 } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

const reportData = {
  "Last 7 Days": {
    "All Countries": {
      "All Devices": [
        { date: "Jun 02, 2026", impressions: "4321", clicks: "191", ctr: "4.42%", ecpm: "$81.07", revenue: "$33.21" },
        { date: "Jun 01, 2026", impressions: "12431", clicks: "342", ctr: "2.75%", ecpm: "$81.26", revenue: "$83.16" },
        { date: "May 31, 2026", impressions: "12231", clicks: "341", ctr: "2.79%", ecpm: "$80.26", revenue: "$80.16" },
        { date: "May 30, 2026", impressions: "12332", clicks: "341", ctr: "2.76%", ecpm: "$79.99", revenue: "$80.11" },
        { date: "May 29, 2026", impressions: "12210", clicks: "339", ctr: "2.78%", ecpm: "$79.99", revenue: "$79.38" },
        { date: "May 28, 2026", impressions: "12243", clicks: "341", ctr: "2.79%", ecpm: "$80.12", revenue: "$81.11" },
        { date: "May 27, 2026", impressions: "12451", clicks: "348", ctr: "2.79%", ecpm: "$87.02", revenue: "$78.99" },
      ],
      Desktop: [
        { date: "Jun 02, 2026", impressions: "3024", clicks: "134", ctr: "4.43%", ecpm: "$81.07", revenue: "$23.25" },
        { date: "Jun 01, 2026", impressions: "8701", clicks: "239", ctr: "2.75%", ecpm: "$81.26", revenue: "$58.21" },
        { date: "May 31, 2026", impressions: "8561", clicks: "239", ctr: "2.79%", ecpm: "$80.26", revenue: "$56.11" },
        { date: "May 30, 2026", impressions: "8632", clicks: "239", ctr: "2.77%", ecpm: "$79.99", revenue: "$56.08" },
        { date: "May 29, 2026", impressions: "8547", clicks: "237", ctr: "2.77%", ecpm: "$79.99", revenue: "$55.57" },
        { date: "May 28, 2026", impressions: "8570", clicks: "239", ctr: "2.79%", ecpm: "$80.12", revenue: "$56.78" },
        { date: "May 27, 2026", impressions: "8715", clicks: "244", ctr: "2.80%", ecpm: "$87.02", revenue: "$55.29" },
      ],
      Mobile: [
        { date: "Jun 02, 2026", impressions: "1297", clicks: "57", ctr: "4.39%", ecpm: "$81.07", revenue: "$9.96" },
        { date: "Jun 01, 2026", impressions: "3730", clicks: "103", ctr: "2.76%", ecpm: "$81.26", revenue: "$24.95" },
        { date: "May 31, 2026", impressions: "3670", clicks: "102", ctr: "2.78%", ecpm: "$80.26", revenue: "$24.05" },
        { date: "May 30, 2026", impressions: "3700", clicks: "102", ctr: "2.76%", ecpm: "$79.99", revenue: "$24.03" },
        { date: "May 29, 2026", impressions: "3663", clicks: "102", ctr: "2.78%", ecpm: "$79.99", revenue: "$23.81" },
        { date: "May 28, 2026", impressions: "3673", clicks: "102", ctr: "2.78%", ecpm: "$80.12", revenue: "$24.33" },
        { date: "May 27, 2026", impressions: "3736", clicks: "104", ctr: "2.78%", ecpm: "$87.02", revenue: "$23.70" },
      ],
    },
  },
  "Last 30 Days": {
    "All Countries": {
      "All Devices": [
        { date: "Jun 02, 2026", impressions: "4321", clicks: "191", ctr: "4.42%", ecpm: "$81.07", revenue: "$33.21" },
        { date: "Jun 01, 2026", impressions: "12431", clicks: "342", ctr: "2.75%", ecpm: "$81.26", revenue: "$83.16" },
        { date: "May 31, 2026", impressions: "12231", clicks: "341", ctr: "2.79%", ecpm: "$80.26", revenue: "$80.16" },
        { date: "May 30, 2026", impressions: "12332", clicks: "341", ctr: "2.76%", ecpm: "$79.99", revenue: "$80.11" },
        { date: "May 29, 2026", impressions: "12210", clicks: "339", ctr: "2.78%", ecpm: "$79.99", revenue: "$79.38" },
        { date: "May 28, 2026", impressions: "12243", clicks: "341", ctr: "2.79%", ecpm: "$80.12", revenue: "$81.11" },
        { date: "May 27, 2026", impressions: "12451", clicks: "348", ctr: "2.79%", ecpm: "$87.02", revenue: "$78.99" },
        { date: "May 26, 2026", impressions: "12221", clicks: "341", ctr: "2.79%", ecpm: "$84.87", revenue: "$80.32" },
        { date: "May 25, 2026", impressions: "12121", clicks: "343", ctr: "2.83%", ecpm: "$82.09", revenue: "$79.66" },
        { date: "May 24, 2026", impressions: "12522", clicks: "341", ctr: "2.72%", ecpm: "$80.99", revenue: "$79.93" },
        { date: "May 23, 2026", impressions: "12231", clicks: "341", ctr: "2.79%", ecpm: "$80.93", revenue: "$81.43" },
        { date: "May 22, 2026", impressions: "12343", clicks: "343", ctr: "2.78%", ecpm: "$80.12", revenue: "$81.24" },
        { date: "May 21, 2026", impressions: "12133", clicks: "323", ctr: "2.66%", ecpm: "$80.72", revenue: "$79.22" },
        { date: "May 20, 2026", impressions: "12311", clicks: "332", ctr: "2.69%", ecpm: "$81.12", revenue: "$80.33" },
      ],
      Desktop: [
        { date: "Jun 02, 2026", impressions: "3024", clicks: "134", ctr: "4.43%", ecpm: "$81.07", revenue: "$23.25" },
        { date: "Jun 01, 2026", impressions: "8701", clicks: "239", ctr: "2.75%", ecpm: "$81.26", revenue: "$58.21" },
        { date: "May 31, 2026", impressions: "8561", clicks: "239", ctr: "2.79%", ecpm: "$80.26", revenue: "$56.11" },
        { date: "May 30, 2026", impressions: "8632", clicks: "239", ctr: "2.77%", ecpm: "$79.99", revenue: "$56.08" },
        { date: "May 29, 2026", impressions: "8547", clicks: "237", ctr: "2.77%", ecpm: "$79.99", revenue: "$55.57" },
        { date: "May 28, 2026", impressions: "8570", clicks: "239", ctr: "2.79%", ecpm: "$80.12", revenue: "$56.78" },
        { date: "May 27, 2026", impressions: "8715", clicks: "244", ctr: "2.80%", ecpm: "$87.02", revenue: "$55.29" },
        { date: "May 26, 2026", impressions: "8555", clicks: "239", ctr: "2.79%", ecpm: "$84.87", revenue: "$56.23" },
        { date: "May 25, 2026", impressions: "8485", clicks: "240", ctr: "2.83%", ecpm: "$82.09", revenue: "$55.76" },
        { date: "May 24, 2026", impressions: "8765", clicks: "239", ctr: "2.73%", ecpm: "$80.99", revenue: "$55.96" },
        { date: "May 23, 2026", impressions: "8561", clicks: "239", ctr: "2.79%", ecpm: "$80.93", revenue: "$57.00" },
        { date: "May 22, 2026", impressions: "8640", clicks: "240", ctr: "2.78%", ecpm: "$80.12", revenue: "$56.87" },
        { date: "May 21, 2026", impressions: "8493", clicks: "226", ctr: "2.66%", ecpm: "$80.72", revenue: "$55.46" },
        { date: "May 20, 2026", impressions: "8618", clicks: "232", ctr: "2.69%", ecpm: "$81.12", revenue: "$56.23" },
      ],
      Mobile: [
        { date: "Jun 02, 2026", impressions: "1297", clicks: "57", ctr: "4.39%", ecpm: "$81.07", revenue: "$9.96" },
        { date: "Jun 01, 2026", impressions: "3730", clicks: "103", ctr: "2.76%", ecpm: "$81.26", revenue: "$24.95" },
        { date: "May 31, 2026", impressions: "3670", clicks: "102", ctr: "2.78%", ecpm: "$80.26", revenue: "$24.05" },
        { date: "May 30, 2026", impressions: "3700", clicks: "102", ctr: "2.76%", ecpm: "$79.99", revenue: "$24.03" },
        { date: "May 29, 2026", impressions: "3663", clicks: "102", ctr: "2.78%", ecpm: "$79.99", revenue: "$23.81" },
        { date: "May 28, 2026", impressions: "3673", clicks: "102", ctr: "2.78%", ecpm: "$80.12", revenue: "$24.33" },
        { date: "May 27, 2026", impressions: "3736", clicks: "104", ctr: "2.78%", ecpm: "$87.02", revenue: "$23.70" },
        { date: "May 26, 2026", impressions: "3666", clicks: "102", ctr: "2.78%", ecpm: "$84.87", revenue: "$24.09" },
        { date: "May 25, 2026", impressions: "3636", clicks: "103", ctr: "2.83%", ecpm: "$82.09", revenue: "$23.90" },
        { date: "May 24, 2026", impressions: "3757", clicks: "102", ctr: "2.72%", ecpm: "$80.99", revenue: "$23.97" },
        { date: "May 23, 2026", impressions: "3670", clicks: "102", ctr: "2.78%", ecpm: "$80.93", revenue: "$24.43" },
        { date: "May 22, 2026", impressions: "3703", clicks: "103", ctr: "2.78%", ecpm: "$80.12", revenue: "$24.37" },
        { date: "May 21, 2026", impressions: "3640", clicks: "97", ctr: "2.66%", ecpm: "$80.72", revenue: "$23.76" },
        { date: "May 20, 2026", impressions: "3693", clicks: "100", ctr: "2.71%", ecpm: "$81.12", revenue: "$24.10" },
      ],
    },
  },
  "Last 3 Months": {
    "All Countries": {
      "All Devices": [
        { date: "Jun 01, 2026", impressions: "5463", clicks: "201", ctr: "3.68%", ecpm: "$81.99", revenue: "$37.21" },
        { date: "May 31, 2026", impressions: "12231", clicks: "341", ctr: "2.79%", ecpm: "$80.26", revenue: "$80.16" },
        { date: "May 20, 2026", impressions: "12311", clicks: "332", ctr: "2.69%", ecpm: "$81.12", revenue: "$80.33" },
        { date: "May 01, 2026", impressions: "6488", clicks: "232", ctr: "3.57%", ecpm: "$16.22", revenue: "$22.41" },
        { date: "Apr 30, 2026", impressions: "6433", clicks: "229", ctr: "3.56%", ecpm: "$14.33", revenue: "$20.22" },
      ],
      Desktop: [
        { date: "Jun 01, 2026", impressions: "3824", clicks: "141", ctr: "3.69%", ecpm: "$81.99", revenue: "$26.05" },
        { date: "May 31, 2026", impressions: "8561", clicks: "239", ctr: "2.79%", ecpm: "$80.26", revenue: "$56.11" },
        { date: "May 20, 2026", impressions: "8618", clicks: "232", ctr: "2.69%", ecpm: "$81.12", revenue: "$56.23" },
        { date: "May 01, 2026", impressions: "4541", clicks: "162", ctr: "3.57%", ecpm: "$16.22", revenue: "$15.69" },
        { date: "Apr 30, 2026", impressions: "4503", clicks: "160", ctr: "3.56%", ecpm: "$14.33", revenue: "$14.16" },
      ],
      Mobile: [
        { date: "Jun 01, 2026", impressions: "1639", clicks: "60", ctr: "3.66%", ecpm: "$81.99", revenue: "$11.16" },
        { date: "May 31, 2026", impressions: "3670", clicks: "102", ctr: "2.78%", ecpm: "$80.26", revenue: "$24.05" },
        { date: "May 20, 2026", impressions: "3693", clicks: "100", ctr: "2.71%", ecpm: "$81.12", revenue: "$24.10" },
        { date: "May 01, 2026", impressions: "1947", clicks: "70", ctr: "3.57%", ecpm: "$16.22", revenue: "$6.72" },
        { date: "Apr 30, 2026", impressions: "1930", clicks: "69", ctr: "3.56%", ecpm: "$14.33", revenue: "$6.06" },
      ],
    },
  },
  "Last 6 Months": {
    "All Countries": {
      "All Devices": [
        { date: "Jun 01, 2026", impressions: "5463", clicks: "201", ctr: "3.68%", ecpm: "$81.99", revenue: "$37.21" },
        { date: "May 31, 2026", impressions: "12231", clicks: "341", ctr: "2.79%", ecpm: "$80.26", revenue: "$80.16" },
        { date: "May 20, 2026", impressions: "12311", clicks: "332", ctr: "2.69%", ecpm: "$81.12", revenue: "$80.33" },
        { date: "May 01, 2026", impressions: "6488", clicks: "232", ctr: "3.57%", ecpm: "$16.22", revenue: "$22.41" },
        { date: "Apr 30, 2026", impressions: "6433", clicks: "229", ctr: "3.56%", ecpm: "$14.33", revenue: "$20.22" },
        { date: "Mar 15, 2026", impressions: "8000", clicks: "250", ctr: "3.13%", ecpm: "$18.00", revenue: "$48.00" },
      ],
      Desktop: [
        { date: "Jun 01, 2026", impressions: "3824", clicks: "141", ctr: "3.69%", ecpm: "$81.99", revenue: "$26.05" },
        { date: "May 31, 2026", impressions: "8561", clicks: "239", ctr: "2.79%", ecpm: "$80.26", revenue: "$56.11" },
        { date: "May 20, 2026", impressions: "8618", clicks: "232", ctr: "2.69%", ecpm: "$81.12", revenue: "$56.23" },
        { date: "May 01, 2026", impressions: "4541", clicks: "162", ctr: "3.57%", ecpm: "$16.22", revenue: "$15.69" },
        { date: "Apr 30, 2026", impressions: "4503", clicks: "160", ctr: "3.56%", ecpm: "$14.33", revenue: "$14.16" },
        { date: "Mar 15, 2026", impressions: "5600", clicks: "175", ctr: "3.13%", ecpm: "$18.00", revenue: "$33.60" },
      ],
      Mobile: [
        { date: "Jun 01, 2026", impressions: "1639", clicks: "60", ctr: "3.66%", ecpm: "$81.99", revenue: "$11.16" },
        { date: "May 31, 2026", impressions: "3670", clicks: "102", ctr: "2.78%", ecpm: "$80.26", revenue: "$24.05" },
        { date: "May 20, 2026", impressions: "3693", clicks: "100", ctr: "2.71%", ecpm: "$81.12", revenue: "$24.10" },
        { date: "May 01, 2026", impressions: "1947", clicks: "70", ctr: "3.57%", ecpm: "$16.22", revenue: "$6.72" },
        { date: "Apr 30, 2026", impressions: "1930", clicks: "69", ctr: "3.56%", ecpm: "$14.33", revenue: "$6.06" },
        { date: "Mar 15, 2026", impressions: "2400", clicks: "75", ctr: "3.13%", ecpm: "$18.00", revenue: "$14.40" },
      ],
    },
  },
  "This Year": {
    "All Countries": {
      "All Devices": [
        { date: "Jun 01, 2026", impressions: "5463", clicks: "201", ctr: "3.68%", ecpm: "$81.99", revenue: "$37.21" },
        { date: "May 31, 2026", impressions: "12231", clicks: "341", ctr: "2.79%", ecpm: "$80.26", revenue: "$80.16" },
        { date: "May 20, 2026", impressions: "12311", clicks: "332", ctr: "2.69%", ecpm: "$81.12", revenue: "$80.33" },
        { date: "May 01, 2026", impressions: "6488", clicks: "232", ctr: "3.57%", ecpm: "$16.22", revenue: "$22.41" },
        { date: "Apr 30, 2026", impressions: "6433", clicks: "229", ctr: "3.56%", ecpm: "$14.33", revenue: "$20.22" },
        { date: "Jan 20, 2026", impressions: "5000", clicks: "150", ctr: "3.00%", ecpm: "$10.00", revenue: "$15.00" },
      ],
      Desktop: [
        { date: "Jun 01, 2026", impressions: "3824", clicks: "141", ctr: "3.69%", ecpm: "$81.99", revenue: "$26.05" },
        { date: "May 31, 2026", impressions: "8561", clicks: "239", ctr: "2.79%", ecpm: "$80.26", revenue: "$56.11" },
        { date: "May 20, 2026", impressions: "8618", clicks: "232", ctr: "2.69%", ecpm: "$81.12", revenue: "$56.23" },
        { date: "May 01, 2026", impressions: "4541", clicks: "162", ctr: "3.57%", ecpm: "$16.22", revenue: "$15.69" },
        { date: "Apr 30, 2026", impressions: "4503", clicks: "160", ctr: "3.56%", ecpm: "$14.33", revenue: "$14.16" },
        { date: "Jan 20, 2026", impressions: "3500", clicks: "105", ctr: "3.00%", ecpm: "$10.00", revenue: "$10.50" },
      ],
      Mobile: [
        { date: "Jun 01, 2026", impressions: "1639", clicks: "60", ctr: "3.66%", ecpm: "$81.99", revenue: "$11.16" },
        { date: "May 31, 2026", impressions: "3670", clicks: "102", ctr: "2.78%", ecpm: "$80.26", revenue: "$24.05" },
        { date: "May 20, 2026", impressions: "3693", clicks: "100", ctr: "2.71%", ecpm: "$81.12", revenue: "$24.10" },
        { date: "May 01, 2026", impressions: "1947", clicks: "70", ctr: "3.57%", ecpm: "$16.22", revenue: "$6.72" },
        { date: "Apr 30, 2026", impressions: "1930", clicks: "69", ctr: "3.56%", ecpm: "$14.33", revenue: "$6.06" },
        { date: "Jan 20, 2026", impressions: "1500", clicks: "45", ctr: "3.00%", ecpm: "$10.00", revenue: "$4.50" },
      ],
    },
  },
  "Custom Range": {
    "All Countries": {
      "All Devices": [
        { date: "Jun 01, 2026", impressions: "5463", clicks: "201", ctr: "3.68%", ecpm: "$81.99", revenue: "$37.21" },
        { date: "May 31, 2026", impressions: "12231", clicks: "341", ctr: "2.79%", ecpm: "$80.26", revenue: "$80.16" },
        { date: "May 30, 2026", impressions: "12332", clicks: "341", ctr: "2.76%", ecpm: "$79.99", revenue: "$80.11" },
        { date: "May 29, 2026", impressions: "12210", clicks: "339", ctr: "2.78%", ecpm: "$79.99", revenue: "$79.38" },
      ],
      Desktop: [
        { date: "Jun 01, 2026", impressions: "3824", clicks: "141", ctr: "3.69%", ecpm: "$81.99", revenue: "$26.05" },
        { date: "May 31, 2026", impressions: "8561", clicks: "239", ctr: "2.79%", ecpm: "$80.26", revenue: "$56.11" },
        { date: "May 30, 2026", impressions: "8632", clicks: "239", ctr: "2.77%", ecpm: "$79.99", revenue: "$56.08" },
        { date: "May 29, 2026", impressions: "8547", clicks: "237", ctr: "2.77%", ecpm: "$79.99", revenue: "$55.57" },
      ],
      Mobile: [
        { date: "Jun 01, 2026", impressions: "1639", clicks: "60", ctr: "3.66%", ecpm: "$81.99", revenue: "$11.16" },
        { date: "May 31, 2026", impressions: "3670", clicks: "102", ctr: "2.78%", ecpm: "$80.26", revenue: "$24.05" },
        { date: "May 30, 2026", impressions: "3700", clicks: "102", ctr: "2.76%", ecpm: "$79.99", revenue: "$24.03" },
        { date: "May 29, 2026", impressions: "3663", clicks: "102", ctr: "2.78%", ecpm: "$79.99", revenue: "$23.81" },
      ],
    },
  },
}

const statisticsTotals = {
  impressions: 270036,
  clicks: 7533,
  revenue: 2042.30,
  ecpm: 80.12,
  ctr: 2.79,
}

export function ReportContent() {
  const [showReport] = useState(true)
  const [selectedDateRange, setSelectedDateRange] = useState("Last 7 Days")
  const [selectedGroupBy, setSelectedGroupBy] = useState("Day")
  const [selectedMetrics, setSelectedMetrics] = useState("All Metrics")
  const [selectedSite, setSelectedSite] = useState("All Sites")
  const [selectedCountry, setSelectedCountry] = useState("All Countries")
  const [selectedDevice, setSelectedDevice] = useState("All Devices")
  const [currentReportData, setCurrentReportData] = useState(reportData["Last 7 Days"]["All Countries"]["All Devices"])
  const [isFiltered, setIsFiltered] = useState(false)

  const handleGenerateReport = () => {
    // Data already rendered, no action needed
  }

  const handleRefresh = () => {
    // Data already current, no action needed
  }

  const handleApplyFilters = () => {
    const dateData = reportData[selectedDateRange as keyof typeof reportData]
    const countryData = dateData?.[selectedCountry as keyof typeof dateData]
    const deviceData = countryData?.[selectedDevice as keyof typeof countryData]

    if (deviceData) {
      setCurrentReportData(deviceData)
      setIsFiltered(true)
    } else {
      setCurrentReportData(reportData["Last 7 Days"]["All Countries"]["All Devices"])
      setIsFiltered(false)
    }
  }

  const handleReset = () => {
    setSelectedDateRange("Last 7 Days")
    setSelectedGroupBy("Day")
    setSelectedMetrics("All Metrics")
    setSelectedSite("All Sites")
    setSelectedCountry("All Countries")
    setSelectedDevice("All Devices")

    setCurrentReportData(reportData["Last 7 Days"]["All Countries"]["All Devices"])
    setIsFiltered(false)
  }

  const calculateTotals = () => {
    if (currentReportData.length === 0) {
      return {
        totalRevenue: statisticsTotals.revenue.toFixed(3),
        totalImpressions: statisticsTotals.impressions.toLocaleString(),
        totalClicks: statisticsTotals.clicks.toLocaleString(),
        avgCTR: `${statisticsTotals.ctr.toFixed(2)}%`,
        avgECPM: `$${statisticsTotals.ecpm.toFixed(2)}`,
      }
    }

    const totalRevenue = currentReportData.reduce((sum, row) => {
      const revenue = Number.parseFloat(row.revenue.replace("$", "").replace(",", ""))
      return sum + revenue
    }, 0)

    const totalImpressions = currentReportData.reduce((sum, row) => {
      const impressions = Number.parseInt(row.impressions.replace(",", ""))
      return sum + impressions
    }, 0)

    const totalClicks = currentReportData.reduce((sum, row) => {
      const clicks = Number.parseInt(row.clicks.replace(",", ""))
      return sum + clicks
    }, 0)

    const avgCTR = totalImpressions > 0 ? ((totalClicks / totalImpressions) * 100).toFixed(2) : "0.00"
    const avgECPM = totalImpressions > 0 ? ((totalRevenue / totalImpressions) * 1000).toFixed(2) : "0.00"

    return {
      totalRevenue: totalRevenue.toFixed(3),
      totalImpressions: totalImpressions.toLocaleString(),
      totalClicks: totalClicks.toLocaleString(),
      avgCTR: `${avgCTR}%`,
      avgECPM: `$${avgECPM}`,
    }
  }

  const totals = calculateTotals()

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <h1 className="text-2xl font-bold">Reports</h1>
        <div className="flex items-center space-x-2 flex-wrap gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" className="flex items-center bg-transparent" onClick={handleRefresh}>
                  <RefreshCw size={16} className="mr-2" />
                  Refresh
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Refresh report data</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" className="flex items-center bg-transparent">
                  <Download size={16} className="mr-2" />
                  Export
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Export report as CSV</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      <Card className="p-6">
        <div className="flex items-center mb-4">
          <Filter size={18} className="mr-2" />
          <h3 className="font-medium">Report Filters</h3>
          {isFiltered && (
            <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Filters Applied</span>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="text-sm font-medium mb-1 block">Date Range</label>
            <select
              className="w-full p-2 border rounded-md bg-white"
              value={selectedDateRange}
              onChange={(e) => setSelectedDateRange(e.target.value)}
            >
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
              <option>Last 3 Months</option>
              <option>Last 6 Months</option>
              <option>This Year</option>
              <option>Custom Range</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-medium mb-1 block">Group By</label>
            <select
              className="w-full p-2 border rounded-md bg-white"
              value={selectedGroupBy}
              onChange={(e) => setSelectedGroupBy(e.target.value)}
            >
              <option>Hour</option>
              <option>Day</option>
              <option>Week</option>
              <option>Month</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-medium mb-1 block">Metrics</label>
            <select
              className="w-full p-2 border rounded-md bg-white"
              value={selectedMetrics}
              onChange={(e) => setSelectedMetrics(e.target.value)}
            >
              <option>All Metrics</option>
              <option>Revenue Only</option>
              <option>Traffic Only</option>
              <option>Performance Only</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          <div>
            <label className="text-sm font-medium mb-1 block">Sites</label>
            <select
              className="w-full p-2 border rounded-md bg-white"
              value={selectedSite}
              onChange={(e) => setSelectedSite(e.target.value)}
            >
              <option>https://techblogi.com</option>
              <option>All Sites</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-medium mb-1 block">Countries</label>
            <select
              className="w-full p-2 border rounded-md bg-white"
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
            >
              <option>All Countries</option>
              <option>United States</option>
              <option>United Kingdom</option>
              <option>Canada</option>
              <option>Australia</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-medium mb-1 block">Device</label>
            <select
              className="w-full p-2 border rounded-md bg-white"
              value={selectedDevice}
              onChange={(e) => setSelectedDevice(e.target.value)}
            >
              <option>All Devices</option>
              <option>Desktop</option>
              <option>Mobile</option>
              <option>Tablet</option>
            </select>
          </div>
          <div className="flex items-end gap-2">
            <Button className="bg-green-500 hover:bg-green-600 flex-1" onClick={handleApplyFilters}>
              Apply Filters
            </Button>
            <Button variant="outline" onClick={handleReset} className="bg-transparent">
              Reset
            </Button>
          </div>
        </div>

        {/* Filter Summary */}
        <div className="mt-4 p-3 bg-gray-50 rounded-lg">
          <div className="text-sm text-gray-600">
            <strong>Current Filters:</strong> {selectedDateRange} • {selectedGroupBy} • {selectedSite} •{" "}
            {selectedCountry} • {selectedDevice} • {selectedMetrics}
          </div>
        </div>
      </Card>

      {/* Statistics Summary - Always visible */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="bg-green-50 p-4 rounded-lg text-center">
          <div className="text-sm text-gray-600 mb-1">Total Revenue</div>
          <div className="text-xl font-bold text-gray-800">{totals.totalRevenue}</div>
        </div>
        <div className="bg-blue-50 p-4 rounded-lg text-center">
          <div className="text-sm text-gray-600 mb-1">Total Impressions</div>
          <div className="text-xl font-bold text-gray-800">{totals.totalImpressions}</div>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg text-center">
          <div className="text-sm text-gray-600 mb-1">Total Clicks</div>
          <div className="text-xl font-bold text-gray-800">{totals.totalClicks}</div>
        </div>
        <div className="bg-orange-50 p-4 rounded-lg text-center">
          <div className="text-sm text-gray-600 mb-1">Average CTR</div>
          <div className="text-xl font-bold text-gray-800">{totals.avgCTR}</div>
        </div>
        <div className="bg-indigo-50 p-4 rounded-lg text-center">
          <div className="text-sm text-gray-600 mb-1">Average eCPM</div>
          <div className="text-xl font-bold text-gray-800">{totals.avgECPM}</div>
        </div>
      </div>

      {/* Report Table */}
      {showReport && (
        <Card className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">Report Results</h3>
            <div className="text-sm text-gray-500">
              Generated on {new Date().toLocaleDateString()} at {new Date().toLocaleTimeString()}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium text-sm">Date</th>
                  <th className="text-left py-3 px-4 font-medium text-sm">Impressions</th>
                  <th className="text-left py-3 px-4 font-medium text-sm">Clicks</th>
                  <th className="text-left py-3 px-4 font-medium text-sm">CTR</th>
                  <th className="text-left py-3 px-4 font-medium text-sm">eCPM</th>
                  <th className="text-left py-3 px-4 font-medium text-sm">Revenue</th>
                </tr>
              </thead>
              <tbody>
                {currentReportData.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-12 text-center">
                      <div className="text-gray-400">
                        <BarChart2 className="h-12 w-12 mx-auto mb-2" />
                        <p className="text-sm font-medium">No records available</p>
                        <p className="text-xs mt-1">Reports will be visible after data is added</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  currentReportData.map((row, index) => (
                    <ReportRow
                      key={index}
                      date={row.date}
                      impressions={row.impressions}
                      clicks={row.clicks}
                      ctr={row.ctr}
                      ecpm={row.ecpm}
                      revenue={row.revenue}
                    />
                  ))
                )}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </div>
  )
}

interface ReportRowProps {
  date: string
  impressions: string
  clicks: string
  ctr: string
  ecpm: string
  revenue: string
}

function ReportRow({ date, impressions, clicks, ctr, ecpm, revenue }: ReportRowProps) {
  return (
    <tr className="border-b hover:bg-gray-50">
      <td className="py-3 px-4 text-sm">{date}</td>
      <td className="py-3 px-4 text-sm">{impressions}</td>
      <td className="py-3 px-4 text-sm">{clicks}</td>
      <td className="py-3 px-4 text-sm">{ctr}</td>
      <td className="py-3 px-4 text-sm">{ecpm}</td>
      <td className="py-3 px-4 text-sm font-medium">{revenue}</td>
    </tr>
  )
}

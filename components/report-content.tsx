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
        { date: "Jun 14, 2026", impressions: "4564", clicks: "197", ctr: "4.32%", ecpm: "$80.89", revenue: "$38.10" },
        { date: "Jun 13, 2026", impressions: "12123", clicks: "340", ctr: "2.80%", ecpm: "$81.98", revenue: "$80.97" },
        { date: "Jun 12, 2026", impressions: "12349", clicks: "341", ctr: "2.76%", ecpm: "$83.18", revenue: "$83.07" },
        { date: "Jun 11, 2026", impressions: "12008", clicks: "343", ctr: "2.86%", ecpm: "$82.11", revenue: "$83.22" },
        { date: "Jun 10, 2026", impressions: "3410", clicks: "194", ctr: "5.68%", ecpm: "$83.59", revenue: "$33.19" },
        { date: "Jun 09, 2026", impressions: "12342", clicks: "346", ctr: "2.80%", ecpm: "$81.87", revenue: "$80.72" },
        { date: "Jun 08, 2026", impressions: "12543", clicks: "351", ctr: "2.80%", ecpm: "$84.22", revenue: "$83.98" },
      ],
      Desktop: [
        { date: "Jun 14, 2026", impressions: "3195", clicks: "138", ctr: "4.32%", ecpm: "$80.89", revenue: "$26.67" },
        { date: "Jun 13, 2026", impressions: "8486", clicks: "238", ctr: "2.81%", ecpm: "$81.98", revenue: "$56.68" },
        { date: "Jun 12, 2026", impressions: "8644", clicks: "239", ctr: "2.77%", ecpm: "$83.18", revenue: "$58.15" },
        { date: "Jun 11, 2026", impressions: "8406", clicks: "240", ctr: "2.85%", ecpm: "$82.11", revenue: "$58.25" },
        { date: "Jun 10, 2026", impressions: "2387", clicks: "136", ctr: "5.70%", ecpm: "$83.59", revenue: "$23.24" },
        { date: "Jun 09, 2026", impressions: "8639", clicks: "242", ctr: "2.80%", ecpm: "$81.87", revenue: "$56.50" },
        { date: "Jun 08, 2026", impressions: "8780", clicks: "246", ctr: "2.80%", ecpm: "$84.22", revenue: "$58.79" },
      ],
      Mobile: [
        { date: "Jun 14, 2026", impressions: "1369", clicks: "59", ctr: "4.31%", ecpm: "$80.89", revenue: "$11.43" },
        { date: "Jun 13, 2026", impressions: "3637", clicks: "102", ctr: "2.81%", ecpm: "$81.98", revenue: "$24.29" },
        { date: "Jun 12, 2026", impressions: "3705", clicks: "102", ctr: "2.75%", ecpm: "$83.18", revenue: "$24.92" },
        { date: "Jun 11, 2026", impressions: "3602", clicks: "103", ctr: "2.86%", ecpm: "$82.11", revenue: "$24.97" },
        { date: "Jun 10, 2026", impressions: "1023", clicks: "58", ctr: "5.67%", ecpm: "$83.59", revenue: "$9.95" },
        { date: "Jun 09, 2026", impressions: "3703", clicks: "104", ctr: "2.81%", ecpm: "$81.87", revenue: "$24.22" },
        { date: "Jun 08, 2026", impressions: "3763", clicks: "105", ctr: "2.79%", ecpm: "$84.22", revenue: "$25.19" },
      ],
    },
  },
  "Last 30 Days": {
    "All Countries": {
      "All Devices": [
        { date: "Jun 14, 2026", impressions: "4564", clicks: "197", ctr: "4.32%", ecpm: "$80.89", revenue: "$38.10" },
        { date: "Jun 13, 2026", impressions: "12123", clicks: "340", ctr: "2.80%", ecpm: "$81.98", revenue: "$80.97" },
        { date: "Jun 12, 2026", impressions: "12349", clicks: "341", ctr: "2.76%", ecpm: "$83.18", revenue: "$83.07" },
        { date: "Jun 11, 2026", impressions: "12008", clicks: "343", ctr: "2.86%", ecpm: "$82.11", revenue: "$83.22" },
        { date: "Jun 10, 2026", impressions: "3410", clicks: "194", ctr: "5.68%", ecpm: "$83.59", revenue: "$33.19" },
        { date: "Jun 09, 2026", impressions: "12342", clicks: "346", ctr: "2.80%", ecpm: "$81.87", revenue: "$80.72" },
        { date: "Jun 08, 2026", impressions: "12543", clicks: "351", ctr: "2.80%", ecpm: "$84.22", revenue: "$83.98" },
        { date: "Jun 07, 2026", impressions: "12512", clicks: "350", ctr: "2.80%", ecpm: "$83.99", revenue: "$83.55" },
        { date: "Jun 06, 2026", impressions: "12488", clicks: "348", ctr: "2.79%", ecpm: "$83.74", revenue: "$83.12" },
        { date: "Jun 05, 2026", impressions: "12453", clicks: "347", ctr: "2.79%", ecpm: "$83.41", revenue: "$82.87" },
        { date: "Jun 04, 2026", impressions: "12401", clicks: "345", ctr: "2.78%", ecpm: "$82.99", revenue: "$82.45" },
        { date: "Jun 03, 2026", impressions: "12372", clicks: "344", ctr: "2.78%", ecpm: "$82.11", revenue: "$81.88" },
        { date: "Jun 02, 2026", impressions: "12322", clicks: "342", ctr: "2.78%", ecpm: "$81.22", revenue: "$81.22" },
        { date: "Jun 01, 2026", impressions: "12431", clicks: "342", ctr: "2.75%", ecpm: "$81.26", revenue: "$83.16" },
      ],
      Desktop: [
        { date: "Jun 14, 2026", impressions: "3195", clicks: "138", ctr: "4.32%", ecpm: "$80.89", revenue: "$26.67" },
        { date: "Jun 13, 2026", impressions: "8486", clicks: "238", ctr: "2.81%", ecpm: "$81.98", revenue: "$56.68" },
        { date: "Jun 12, 2026", impressions: "8644", clicks: "239", ctr: "2.77%", ecpm: "$83.18", revenue: "$58.15" },
        { date: "Jun 11, 2026", impressions: "8406", clicks: "240", ctr: "2.85%", ecpm: "$82.11", revenue: "$58.25" },
        { date: "Jun 10, 2026", impressions: "2387", clicks: "136", ctr: "5.70%", ecpm: "$83.59", revenue: "$23.24" },
        { date: "Jun 09, 2026", impressions: "8639", clicks: "242", ctr: "2.80%", ecpm: "$81.87", revenue: "$56.50" },
        { date: "Jun 08, 2026", impressions: "8780", clicks: "246", ctr: "2.80%", ecpm: "$84.22", revenue: "$58.79" },
        { date: "Jun 07, 2026", impressions: "8759", clicks: "245", ctr: "2.80%", ecpm: "$83.99", revenue: "$58.49" },
        { date: "Jun 06, 2026", impressions: "8741", clicks: "243", ctr: "2.79%", ecpm: "$83.74", revenue: "$58.18" },
        { date: "Jun 05, 2026", impressions: "8717", clicks: "242", ctr: "2.79%", ecpm: "$83.41", revenue: "$57.99" },
        { date: "Jun 04, 2026", impressions: "8681", clicks: "241", ctr: "2.78%", ecpm: "$82.99", revenue: "$57.71" },
        { date: "Jun 03, 2026", impressions: "8660", clicks: "240", ctr: "2.78%", ecpm: "$82.11", revenue: "$57.32" },
        { date: "Jun 02, 2026", impressions: "8625", clicks: "239", ctr: "2.77%", ecpm: "$81.22", revenue: "$56.85" },
        { date: "Jun 01, 2026", impressions: "8701", clicks: "239", ctr: "2.75%", ecpm: "$81.26", revenue: "$58.21" },
      ],
      Mobile: [
        { date: "Jun 14, 2026", impressions: "1369", clicks: "59", ctr: "4.31%", ecpm: "$80.89", revenue: "$11.43" },
        { date: "Jun 13, 2026", impressions: "3637", clicks: "102", ctr: "2.81%", ecpm: "$81.98", revenue: "$24.29" },
        { date: "Jun 12, 2026", impressions: "3705", clicks: "102", ctr: "2.75%", ecpm: "$83.18", revenue: "$24.92" },
        { date: "Jun 11, 2026", impressions: "3602", clicks: "103", ctr: "2.86%", ecpm: "$82.11", revenue: "$24.97" },
        { date: "Jun 10, 2026", impressions: "1023", clicks: "58", ctr: "5.67%", ecpm: "$83.59", revenue: "$9.95" },
        { date: "Jun 09, 2026", impressions: "3703", clicks: "104", ctr: "2.81%", ecpm: "$81.87", revenue: "$24.22" },
        { date: "Jun 08, 2026", impressions: "3763", clicks: "105", ctr: "2.79%", ecpm: "$84.22", revenue: "$25.19" },
        { date: "Jun 07, 2026", impressions: "3753", clicks: "105", ctr: "2.80%", ecpm: "$83.99", revenue: "$25.06" },
        { date: "Jun 06, 2026", impressions: "3747", clicks: "105", ctr: "2.80%", ecpm: "$83.74", revenue: "$24.94" },
        { date: "Jun 05, 2026", impressions: "3736", clicks: "105", ctr: "2.81%", ecpm: "$83.41", revenue: "$24.88" },
        { date: "Jun 04, 2026", impressions: "3720", clicks: "104", ctr: "2.79%", ecpm: "$82.99", revenue: "$24.74" },
        { date: "Jun 03, 2026", impressions: "3712", clicks: "104", ctr: "2.80%", ecpm: "$82.11", revenue: "$24.56" },
        { date: "Jun 02, 2026", impressions: "3697", clicks: "103", ctr: "2.79%", ecpm: "$81.22", revenue: "$24.37" },
        { date: "Jun 01, 2026", impressions: "3730", clicks: "103", ctr: "2.76%", ecpm: "$81.26", revenue: "$24.95" },
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
  impressions: 323395,
  clicks: 9058,
  revenue: 2368.32,
  ecpm: 82.88,
  ctr: 2.80,
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

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
        { date: "May 20, 2026", impressions: "12543", clicks: "345", ctr: "2.75%", ecpm: "$81.22", revenue: "$84.11" },
        { date: "May 19, 2026", impressions: "12545", clicks: "344", ctr: "2.74%", ecpm: "$81.00", revenue: "$83.88" },
        { date: "May 18, 2026", impressions: "12547", clicks: "344", ctr: "2.74%", ecpm: "$80.88", revenue: "$83.55" },
        { date: "May 17, 2026", impressions: "12548", clicks: "343", ctr: "2.73%", ecpm: "$80.66", revenue: "$83.22" },
        { date: "May 16, 2026", impressions: "12549", clicks: "342", ctr: "2.72%", ecpm: "$80.44", revenue: "$82.99" },
        { date: "May 15, 2026", impressions: "12550", clicks: "342", ctr: "2.72%", ecpm: "$80.22", revenue: "$82.66" },
        { date: "May 14, 2026", impressions: "12551", clicks: "341", ctr: "2.71%", ecpm: "$80.00", revenue: "$82.33" },
      ],
      Desktop: [
        { date: "May 20, 2026", impressions: "8759", clicks: "241", ctr: "2.75%", ecpm: "$81.22", revenue: "$58.88" },
        { date: "May 19, 2026", impressions: "8781", clicks: "241", ctr: "2.74%", ecpm: "$81.00", revenue: "$58.71" },
        { date: "May 18, 2026", impressions: "8783", clicks: "241", ctr: "2.74%", ecpm: "$80.88", revenue: "$58.50" },
        { date: "May 17, 2026", impressions: "8784", clicks: "240", ctr: "2.73%", ecpm: "$80.66", revenue: "$58.26" },
        { date: "May 16, 2026", impressions: "8785", clicks: "239", ctr: "2.72%", ecpm: "$80.44", revenue: "$58.09" },
        { date: "May 15, 2026", impressions: "8785", clicks: "239", ctr: "2.72%", ecpm: "$80.22", revenue: "$57.86" },
        { date: "May 14, 2026", impressions: "8786", clicks: "239", ctr: "2.71%", ecpm: "$80.00", revenue: "$57.63" },
      ],
      Mobile: [
        { date: "May 20, 2026", impressions: "3784", clicks: "104", ctr: "2.75%", ecpm: "$81.22", revenue: "$25.23" },
        { date: "May 19, 2026", impressions: "3764", clicks: "103", ctr: "2.74%", ecpm: "$81.00", revenue: "$25.17" },
        { date: "May 18, 2026", impressions: "3764", clicks: "103", ctr: "2.74%", ecpm: "$80.88", revenue: "$25.05" },
        { date: "May 17, 2026", impressions: "3764", clicks: "103", ctr: "2.73%", ecpm: "$80.66", revenue: "$24.96" },
        { date: "May 16, 2026", impressions: "3764", clicks: "103", ctr: "2.72%", ecpm: "$80.44", revenue: "$24.90" },
        { date: "May 15, 2026", impressions: "3765", clicks: "103", ctr: "2.72%", ecpm: "$80.22", revenue: "$24.80" },
        { date: "May 14, 2026", impressions: "3765", clicks: "102", ctr: "2.71%", ecpm: "$80.00", revenue: "$24.70" },
      ],
    },
  },
  "Last 30 Days": {
    "All Countries": {
      "All Devices": [
        { date: "May 20, 2026", impressions: "12543", clicks: "345", ctr: "2.75%", ecpm: "$81.22", revenue: "$84.11" },
        { date: "May 19, 2026", impressions: "12545", clicks: "344", ctr: "2.74%", ecpm: "$81.00", revenue: "$83.88" },
        { date: "May 18, 2026", impressions: "12547", clicks: "344", ctr: "2.74%", ecpm: "$80.88", revenue: "$83.55" },
        { date: "May 13, 2026", impressions: "12543", clicks: "345", ctr: "2.75%", ecpm: "$81.22", revenue: "$79.11" },
      ],
      Desktop: [
        { date: "May 20, 2026", impressions: "8759", clicks: "241", ctr: "2.75%", ecpm: "$81.22", revenue: "$58.88" },
        { date: "May 19, 2026", impressions: "8781", clicks: "241", ctr: "2.74%", ecpm: "$81.00", revenue: "$58.71" },
        { date: "May 18, 2026", impressions: "8783", clicks: "241", ctr: "2.74%", ecpm: "$80.88", revenue: "$58.50" },
        { date: "May 13, 2026", impressions: "8780", clicks: "241", ctr: "2.75%", ecpm: "$81.22", revenue: "$55.38" },
      ],
      Mobile: [
        { date: "May 20, 2026", impressions: "3784", clicks: "104", ctr: "2.75%", ecpm: "$81.22", revenue: "$25.23" },
        { date: "May 19, 2026", impressions: "3764", clicks: "103", ctr: "2.74%", ecpm: "$81.00", revenue: "$25.17" },
        { date: "May 18, 2026", impressions: "3764", clicks: "103", ctr: "2.74%", ecpm: "$80.88", revenue: "$25.05" },
        { date: "May 13, 2026", impressions: "3763", clicks: "104", ctr: "2.75%", ecpm: "$81.22", revenue: "$23.73" },
      ],
    },
  },
  "Last 3 Months": {
    "All Countries": {
      "All Devices": [
        { date: "May 20, 2026", impressions: "12543", clicks: "345", ctr: "2.75%", ecpm: "$81.22", revenue: "$84.11" },
        { date: "May 01, 2026", impressions: "6488", clicks: "232", ctr: "3.57%", ecpm: "$16.22", revenue: "$22.41" },
        { date: "Apr 30, 2026", impressions: "6433", clicks: "229", ctr: "3.56%", ecpm: "$14.33", revenue: "$20.22" },
        { date: "Mar 15, 2026", impressions: "8000", clicks: "250", ctr: "3.13%", ecpm: "$18.00", revenue: "$48.00" },
      ],
      Desktop: [
        { date: "May 20, 2026", impressions: "8759", clicks: "241", ctr: "2.75%", ecpm: "$81.22", revenue: "$58.88" },
        { date: "May 01, 2026", impressions: "4541", clicks: "162", ctr: "3.57%", ecpm: "$16.22", revenue: "$15.69" },
        { date: "Apr 30, 2026", impressions: "4503", clicks: "160", ctr: "3.56%", ecpm: "$14.33", revenue: "$14.16" },
        { date: "Mar 15, 2026", impressions: "5600", clicks: "175", ctr: "3.13%", ecpm: "$18.00", revenue: "$33.60" },
      ],
      Mobile: [
        { date: "May 20, 2026", impressions: "3784", clicks: "104", ctr: "2.75%", ecpm: "$81.22", revenue: "$25.23" },
        { date: "May 01, 2026", impressions: "1947", clicks: "70", ctr: "3.57%", ecpm: "$16.22", revenue: "$6.72" },
        { date: "Apr 30, 2026", impressions: "1930", clicks: "69", ctr: "3.56%", ecpm: "$14.33", revenue: "$6.06" },
        { date: "Mar 15, 2026", impressions: "2400", clicks: "75", ctr: "3.13%", ecpm: "$18.00", revenue: "$14.40" },
      ],
    },
  },
  "Last 6 Months": {
    "All Countries": {
      "All Devices": [
        { date: "May 20, 2026", impressions: "12543", clicks: "345", ctr: "2.75%", ecpm: "$81.22", revenue: "$84.11" },
        { date: "May 01, 2026", impressions: "6488", clicks: "232", ctr: "3.57%", ecpm: "$16.22", revenue: "$22.41" },
        { date: "Apr 30, 2026", impressions: "6433", clicks: "229", ctr: "3.56%", ecpm: "$14.33", revenue: "$20.22" },
        { date: "Feb 15, 2026", impressions: "7500", clicks: "225", ctr: "3.00%", ecpm: "$15.00", revenue: "$38.00" },
      ],
      Desktop: [
        { date: "May 20, 2026", impressions: "8759", clicks: "241", ctr: "2.75%", ecpm: "$81.22", revenue: "$58.88" },
        { date: "May 01, 2026", impressions: "4541", clicks: "162", ctr: "3.57%", ecpm: "$16.22", revenue: "$15.69" },
        { date: "Apr 30, 2026", impressions: "4503", clicks: "160", ctr: "3.56%", ecpm: "$14.33", revenue: "$14.16" },
        { date: "Feb 15, 2026", impressions: "5250", clicks: "157", ctr: "3.00%", ecpm: "$15.00", revenue: "$26.60" },
      ],
      Mobile: [
        { date: "May 20, 2026", impressions: "3784", clicks: "104", ctr: "2.75%", ecpm: "$81.22", revenue: "$25.23" },
        { date: "May 01, 2026", impressions: "1947", clicks: "70", ctr: "3.57%", ecpm: "$16.22", revenue: "$6.72" },
        { date: "Apr 30, 2026", impressions: "1930", clicks: "69", ctr: "3.56%", ecpm: "$14.33", revenue: "$6.06" },
        { date: "Feb 15, 2026", impressions: "2250", clicks: "68", ctr: "3.00%", ecpm: "$15.00", revenue: "$11.40" },
      ],
    },
  },
  "This Year": {
    "All Countries": {
      "All Devices": [
        { date: "May 20, 2026", impressions: "12543", clicks: "345", ctr: "2.75%", ecpm: "$81.22", revenue: "$84.11" },
        { date: "May 01, 2026", impressions: "6488", clicks: "232", ctr: "3.57%", ecpm: "$16.22", revenue: "$22.41" },
        { date: "Apr 30, 2026", impressions: "6433", clicks: "229", ctr: "3.56%", ecpm: "$14.33", revenue: "$20.22" },
        { date: "Jan 20, 2026", impressions: "5000", clicks: "150", ctr: "3.00%", ecpm: "$10.00", revenue: "$15.00" },
      ],
      Desktop: [
        { date: "May 20, 2026", impressions: "8759", clicks: "241", ctr: "2.75%", ecpm: "$81.22", revenue: "$58.88" },
        { date: "May 01, 2026", impressions: "4541", clicks: "162", ctr: "3.57%", ecpm: "$16.22", revenue: "$15.69" },
        { date: "Apr 30, 2026", impressions: "4503", clicks: "160", ctr: "3.56%", ecpm: "$14.33", revenue: "$14.16" },
        { date: "Jan 20, 2026", impressions: "3500", clicks: "105", ctr: "3.00%", ecpm: "$10.00", revenue: "$10.50" },
      ],
      Mobile: [
        { date: "May 20, 2026", impressions: "3784", clicks: "104", ctr: "2.75%", ecpm: "$81.22", revenue: "$25.23" },
        { date: "May 01, 2026", impressions: "1947", clicks: "70", ctr: "3.57%", ecpm: "$16.22", revenue: "$6.72" },
        { date: "Apr 30, 2026", impressions: "1930", clicks: "69", ctr: "3.56%", ecpm: "$14.33", revenue: "$6.06" },
        { date: "Jan 20, 2026", impressions: "1500", clicks: "45", ctr: "3.00%", ecpm: "$10.00", revenue: "$4.50" },
      ],
    },
  },
  "Custom Range": {
    "All Countries": {
      "All Devices": [
        { date: "May 20, 2026", impressions: "12543", clicks: "345", ctr: "2.75%", ecpm: "$81.22", revenue: "$84.11" },
        { date: "May 19, 2026", impressions: "12545", clicks: "344", ctr: "2.74%", ecpm: "$81.00", revenue: "$83.88" },
        { date: "May 18, 2026", impressions: "12547", clicks: "344", ctr: "2.74%", ecpm: "$80.88", revenue: "$83.55" },
        { date: "May 17, 2026", impressions: "12548", clicks: "343", ctr: "2.73%", ecpm: "$80.66", revenue: "$83.22" },
      ],
      Desktop: [
        { date: "May 20, 2026", impressions: "8759", clicks: "241", ctr: "2.75%", ecpm: "$81.22", revenue: "$58.88" },
        { date: "May 19, 2026", impressions: "8781", clicks: "241", ctr: "2.74%", ecpm: "$81.00", revenue: "$58.71" },
        { date: "May 18, 2026", impressions: "8783", clicks: "241", ctr: "2.74%", ecpm: "$80.88", revenue: "$58.50" },
        { date: "May 17, 2026", impressions: "8784", clicks: "240", ctr: "2.73%", ecpm: "$80.66", revenue: "$58.26" },
      ],
      Mobile: [
        { date: "May 20, 2026", impressions: "3784", clicks: "104", ctr: "2.75%", ecpm: "$81.22", revenue: "$25.23" },
        { date: "May 19, 2026", impressions: "3764", clicks: "103", ctr: "2.74%", ecpm: "$81.00", revenue: "$25.17" },
        { date: "May 18, 2026", impressions: "3764", clicks: "103", ctr: "2.74%", ecpm: "$80.88", revenue: "$25.05" },
        { date: "May 17, 2026", impressions: "3764", clicks: "103", ctr: "2.73%", ecpm: "$80.66", revenue: "$24.96" },
      ],
    },
  },
}

const statisticsTotals = {
  impressions: 261929,
  clicks: 7188,
  revenue: 1231.83,
  ecpm: 78.66,
  ctr: 2.75,
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

/**
 * Auto Daily Placeholder utility
 * Automatically generates placeholder entries for the current date with zero values
 * Can be updated manually later as data becomes available
 */

export interface DailyPlaceholder {
  date: string
  impressions: number
  clicks: number
  revenue: number
  ctr: string
  ecpm: string
}

/**
 * Gets the current date in "MMM DD, YYYY" format (e.g., "Jun 24, 2026")
 */
export function getCurrentDateFormatted(): string {
  const today = new Date()
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "2-digit",
  }
  return today.toLocaleDateString("en-US", options)
}

/**
 * Creates a daily placeholder entry with zero values for the current date
 */
export function createTodayPlaceholder(): DailyPlaceholder {
  return {
    date: getCurrentDateFormatted(),
    impressions: 0,
    clicks: 0,
    revenue: 0,
    ctr: "0.00%",
    ecpm: "$0.00",
  }
}

/**
 * Checks if today's entry already exists in the data array
 */
export function todayEntryExists(data: DailyPlaceholder[]): boolean {
  const today = getCurrentDateFormatted()
  return data.some((entry) => entry.date === today)
}

/**
 * Ensures today's entry exists in the data array, adding it if necessary
 * Places it at the beginning of the array
 */
export function ensureTodayEntry(
  data: DailyPlaceholder[]
): DailyPlaceholder[] {
  if (todayEntryExists(data)) {
    return data
  }

  const todayEntry = createTodayPlaceholder()
  return [todayEntry, ...data]
}

/**
 * Gets the latest activity entry for today's date
 */
export function getTodayLatestActivity(
  data: DailyPlaceholder[]
): DailyPlaceholder {
  const today = createTodayPlaceholder()
  const existingToday = data.find((entry) => entry.date === today.date)
  return existingToday || today
}

export type HistoryAttempt = {
  attemptId: string,
  title: string,
  description: string,
  categories: string[],
  complexity: string,
  datetimeAttempted: string, // Change this to specific type format
  content: string // Change this type depending on how the text editor needs input data
}

export type HistoryTableHeaders = {
  title: string,
  category: string,
  complexity: string,
  datetimeAttempted: string
}

export type HistoryTableData = {
  attemptId: string,
  title: string,
  category: string,
  complexity: string[],
  datetimeAttempted: string
}
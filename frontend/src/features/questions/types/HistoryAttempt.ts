export type HistoryAttempt = {
  id: string,
  title: string,
  description: string,
  categories: string[],
  complexity: string,
  attemptDateTime: string,
  content: string
}

export type HistoryTableHeaders = {
  title: string,
  categories: string[],
  complexity: string,
  datetimeAttempted: string
}

export type HistoryTableData = {
  attemptId: string,
  title: string,
  categories: string[],
  complexity: string,
  datetimeAttempted: string
}
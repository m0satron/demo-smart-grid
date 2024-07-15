import { ref } from 'vue'
import Papa from 'papaparse'

export function useCsvData() {
  const parsedData = ref<Array<Record<string, any>>>([])

  const loadCSVFile = async (fileName: string, columnsToExtract: string[]) => {
    try {
      const filePath = new URL(`../assets/data/${fileName}`, import.meta.url).href
      const response = await fetch(filePath)
      const csvText = await response.text()

      parseCSV(csvText, columnsToExtract)
    } catch (error) {
      console.error(`Error loading CSV file ${fileName}:`, error)
    }
  }

  const parseCSV = (csvText: string, columnsToExtract: string[]) => {
    Papa.parse(csvText, {
      header: true,
      complete: (results) => extractColumns(results.data, columnsToExtract),
      error: (error) => console.error('Error parsing CSV:', error)
    })
  }

  const extractColumns = (data: Array<Record<string, any>>, columnsToExtract: string[]) => {
    const extractedData = data.map((row) => {
      const extractedRow: Record<string, any> = {}
      columnsToExtract.forEach((col) => (extractedRow[col] = row[col]))
      return extractedRow
    })
    parsedData.value = [...extractedData]
  }

  return {
    parsedData,
    loadCSVFile
  }
}

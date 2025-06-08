import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { useReportContext } from '@/contexts/ReportContext.tsx'
import { summarizeReport } from '@/services/openaiService.ts'

const useTableHeaders = () => {
  const { mutate: summarize, isPending } = useMutation({
    mutationFn: (content: string) =>
      summarizeReport(
        content,
        'Generate a report draft based on user input with title and description in json format',
      ),
    onSuccess: (result) => {
      const match = result.match(/{(.+?)}/)

      if (match) {
        try {
          const raw = match[1]
          let jsonText = raw.replace(/'/g, '"')
          jsonText = jsonText.replace(/(\w+):/g, '"$1":')
          const parsed = JSON.parse(`{${jsonText}}`)

          const generatedReport = {
            title: parsed.title,
            description: parsed.description,
          }

          setEditReport(generatedReport)
        } catch (e) {
          console.error('Failed to parse mocked summary result:', e)
        }
      }

      setCreateReportDrawerOpen(true)
    },
    onError: (error) => {
      console.error('Summarize failed', error)
    },
  })
  const [generateReportValue, setGenerateReportValue] = useState('')
  const { setGenerateReportOpen, setEditReport, setCreateReportDrawerOpen } =
    useReportContext()

  const handleGenerateReportConfirm = () => {
    summarize(generateReportValue)
    setGenerateReportValue('')
    setGenerateReportOpen(false)
  }

  const handleGenerateReportClose = () => {
    setGenerateReportValue('')
    setGenerateReportOpen(false)
  }

  return {
    generateReportValue,
    setGenerateReportValue,
    handleGenerateReportClose,
    handleGenerateReportConfirm,
    isPending,
  }
}

export default useTableHeaders

import { useEffect, useState } from 'react'
import { useReportContext } from '@/contexts/ReportContext.tsx'

const useEditReport = () => {
  const {
    editReport,
    setEditReport,
    setReportItems,
    setCreateReportDrawerOpen,
  } = useReportContext()
  const [reportTitleValue, setReportTitleValue] = useState('')
  const [reportDescriptionValue, setReportDescriptionValue] = useState('')
  const [buttonText, setButtonText] = useState('Create Report')

  useEffect(() => {
    if (editReport) {
      setReportTitleValue(editReport.title)
      setReportDescriptionValue(editReport.description)
      editReport.id && setButtonText('Update Report')
    }
  }, [editReport])

  const handleOnClose = () => {
    setEditReport(null)
    setCreateReportDrawerOpen(false)
  }

  const handleOnSubmit = () => {
    const match = reportDescriptionValue.match(/<p>(.*?)<\/p>/)

    const reportDescriptionContent = match ? match[1] : ''

    if (!editReport?.id && reportTitleValue && reportDescriptionValue) {
      const newReport = {
        id: crypto.randomUUID(),
        title: reportTitleValue,
        description: reportDescriptionContent,
      }
      setReportItems((prev) => [...prev, newReport])
    } else if (editReport && reportTitleValue && reportDescriptionValue) {
      const updatedReport = {
        ...editReport,
        title: reportTitleValue,
        description: reportDescriptionContent,
      }

      setReportItems((prevItems) =>
        prevItems.map((item) =>
          item.id === updatedReport.id ? updatedReport : item,
        ),
      )
    }
    setEditReport(null)
    setCreateReportDrawerOpen(false)
  }

  useEffect(() => {
    return () => {
      document.activeElement instanceof HTMLElement &&
        document.activeElement.blur()
      setReportTitleValue('')
      setReportDescriptionValue('')
    }
  }, [])

  return {
    reportTitleValue,
    setReportTitleValue,
    reportDescriptionValue,
    setReportDescriptionValue,
    editReport,
    setEditReport,
    handleOnClose,
    buttonText,
    handleOnSubmit,
  }
}

export default useEditReport

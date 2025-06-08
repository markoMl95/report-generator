import { useEffect, useMemo, useState } from 'react'
import { debounce } from 'lodash'
import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { useMutation } from '@tanstack/react-query'
import type { ColumnFiltersState } from '@tanstack/react-table'
import type { ReportsModel } from '@/models/Reports/Reports.ts'
import { useReportContext } from '@/contexts/ReportContext.tsx'
import { getColumns } from '@/components/Table/reportColumns'
import { summarizeReport } from '@/services/openaiService'

const useReportsTable = () => {
  const {
    mutate: summarize,
    data: summaryResult,
    isPending,
  } = useMutation({
    mutationFn: (content: string) => summarizeReport(content),
    onSuccess: () => {
      setSummaryDialogOpen(true)
    },
    onError: (error) => {
      console.error('Summarize failed', error)
    },
  })

  const {
    reportItems,
    setReportItems,
    setEditReport,
    setCreateReportDrawerOpen,
    setDeleteDialogOpen,
    setSummaryDialogOpen,
    isAdmin,
  } = useReportContext()

  const [selectedReport, setSelectedReport] = useState<ReportsModel | null>(
    null,
  )
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [filterValue, setFilterValue] = useState<string>('')

  const handleEdit = (report: ReportsModel) => {
    setCreateReportDrawerOpen(true)
    setEditReport(report)
  }

  const handleDelete = (report: ReportsModel) => {
    setDeleteDialogOpen(true)
    setSelectedReport(report)
  }

  const handleConfirm = () => {
    setReportItems((prev) => prev.filter((r) => r.id !== selectedReport!.id))
    setDeleteDialogOpen(false)
  }

  const handleCancel = () => {
    setSelectedReport(null)
    setDeleteDialogOpen(false)
  }

  const handleSummarize = (report: ReportsModel) => {
    const content = `title: ${report.title}, description: ${report.description}`
    summarize(content)
  }

  const debouncedFilter = useMemo(
    () =>
      debounce((value: string) => {
        setColumnFilters([
          {
            id: 'title',
            value,
          },
        ])
      }, 750),
    [],
  )

  const handleFilterChange = (value: string) => {
    setFilterValue(value)
    debouncedFilter(value)
  }

  const disabled = isPending || !isAdmin

  const columns = getColumns({
    onEdit: handleEdit,
    onDelete: handleDelete,
    onSummarize: handleSummarize,
    isPending,
    disabled,
  })

  const table = useReactTable({
    data: reportItems,
    columns,
    state: { columnFilters },
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  })

  useEffect(() => {
    return () => debouncedFilter.cancel()
  }, [debouncedFilter])

  return {
    table,
    reportItems,
    setReportItems,
    handleConfirm,
    handleCancel,
    handleFilterChange,
    filterValue,
    summaryResult,
  }
}

export default useReportsTable

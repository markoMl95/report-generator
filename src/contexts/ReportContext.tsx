import { createContext, useContext, useState } from 'react'
import type { Dispatch, ReactNode, SetStateAction } from 'react'
import type { ReportsModel } from '@/models/Reports/Reports.ts'

type ReportContextType = {
  reportItems: Array<ReportsModel>
  isAdmin: boolean
  setIsAdmin: Dispatch<SetStateAction<boolean>>
  setReportItems: Dispatch<SetStateAction<Array<ReportsModel>>>
  editReport: ReportsModel | null
  setEditReport: Dispatch<SetStateAction<ReportsModel | null>>
  createReportDrawerOpen: boolean
  setCreateReportDrawerOpen: Dispatch<SetStateAction<boolean>>
  deleteDialogOpen: boolean
  setDeleteDialogOpen: Dispatch<SetStateAction<boolean>>
  summaryDialogOpen: boolean
  setSummaryDialogOpen: Dispatch<SetStateAction<boolean>>
  generateReportOpen: boolean
  setGenerateReportOpen: Dispatch<SetStateAction<boolean>>
}

const ReportContext = createContext<ReportContextType | undefined>(undefined)

export const ReportProvider = ({ children }: { children: ReactNode }) => {
  const [reportItems, setReportItems] = useState<Array<ReportsModel>>([
    {
      id: '1',
      title: 'Monthly Revenue',
      description: 'This is report for revenue by month for last year',
    },
    {
      id: '2',
      title: 'User Growth',
      description: 'Users added each month in last year in Setvi',
    },
  ])
  const [isAdmin, setIsAdmin] = useState<boolean>(
    localStorage.getItem('role') === 'admin',
  )
  const [editReport, setEditReport] = useState<ReportsModel | null>(null)
  const [createReportDrawerOpen, setCreateReportDrawerOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [summaryDialogOpen, setSummaryDialogOpen] = useState(false)
  const [generateReportOpen, setGenerateReportOpen] = useState(false)

  return (
    <ReportContext.Provider
      value={{
        reportItems,
        setReportItems,
        isAdmin,
        setIsAdmin,
        setEditReport,
        editReport,
        createReportDrawerOpen,
        setCreateReportDrawerOpen,
        deleteDialogOpen,
        setDeleteDialogOpen,
        summaryDialogOpen,
        setSummaryDialogOpen,
        generateReportOpen,
        setGenerateReportOpen,
      }}
    >
      {children}
    </ReportContext.Provider>
  )
}

export const useReportContext = (): ReportContextType => {
  const context = useContext(ReportContext)
  if (!context)
    throw new Error('useReportContext must be used inside ReportProvider')
  return context
}

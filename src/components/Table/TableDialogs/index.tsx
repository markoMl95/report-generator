import CreateReport from '@/containers/CreateReport'
import ConfirmDialog from '@/components/ConfirmDialog'
import { useReportContext } from '@/contexts/ReportContext'
import useEditReport from '@/hooks/useEditReport.ts'
import {
  CreateReportDrawer,
  CustomTextarea,
} from '@/components/Table/TableDialogs/styles.ts'
import useTableHeaders from '@/hooks/useTableHeaders.ts'
import Loading from '@/components/Loading'

interface Props {
  handleConfirm: () => void
  handleCancel: () => void
  summaryResult: string | undefined
}

const TableDialogs = ({
  handleConfirm,
  handleCancel,
  summaryResult,
}: Props) => {
  const {
    createReportDrawerOpen,
    deleteDialogOpen,
    setSummaryDialogOpen,
    summaryDialogOpen,
    generateReportOpen,
  } = useReportContext()
  const { handleOnClose } = useEditReport()
  const {
    generateReportValue,
    setGenerateReportValue,
    handleGenerateReportClose,
    handleGenerateReportConfirm,
    isPending,
  } = useTableHeaders()

  if (isPending) return <Loading open={isPending} />

  return (
    <>
      <CreateReportDrawer
        anchor="right"
        open={createReportDrawerOpen}
        onClose={handleOnClose}
      >
        <CreateReport />
      </CreateReportDrawer>
      <ConfirmDialog
        open={deleteDialogOpen}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        title="Delete report"
        description="Are you sure you want to delete this report?"
        confirmButtonText="Delete"
        cancelButtonText="Cancel"
      />
      <ConfirmDialog
        open={summaryDialogOpen}
        onCancel={() => setSummaryDialogOpen(false)}
        title="Summarized report"
        description={summaryResult}
        cancelButtonText="Close"
      />
      <ConfirmDialog
        open={generateReportOpen}
        onConfirm={handleGenerateReportConfirm}
        onCancel={handleGenerateReportClose}
        title="Generate AI report"
        description="Write your report here"
        confirmButtonText="Generate"
        cancelButtonText="Cancel"
      >
        <CustomTextarea
          id="generateReportId"
          name="generateReport"
          value={generateReportValue}
          onChange={(e) => setGenerateReportValue(e.target.value)}
          aria-label="minimum height"
          minRows={3}
          maxLength={1000}
          placeholder="Generate report..."
        />
      </ConfirmDialog>
    </>
  )
}

export default TableDialogs

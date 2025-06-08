import { createFileRoute, redirect } from '@tanstack/react-router'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import type { AuthContext } from '@/hooks/useAuth.ts'
import useReportsTable from '@/hooks/useReportsTable.ts'
import TanStackTable from '@/components/Table'
import TableHeaders from '@/components/Table/TableHeaders'
import TableDialogs from '@/components/Table/TableDialogs'

export const Route = createFileRoute('/reports')({
  component: RouteComponent,
  beforeLoad: async ({
    context,
  }: {
    context: { authentication: AuthContext }
  }) => {
    const { isLogged } = context.authentication
    if (!isLogged()) {
      throw redirect({ to: '/login' })
    }
  },
})

function RouteComponent() {
  const {
    table,
    reportItems,
    setReportItems,
    handleConfirm,
    handleCancel,
    handleFilterChange,
    filterValue,
    summaryResult,
  } = useReportsTable()

  return (
    <Box>
      <Typography variant="h3" sx={{ mb: 5 }}>
        Reports page
      </Typography>
      <TableHeaders
        filterValue={filterValue}
        onFilterChange={handleFilterChange}
      />
      <TanStackTable
        table={table}
        data={reportItems}
        setData={setReportItems}
      />
      <TableDialogs
        handleConfirm={handleConfirm}
        handleCancel={handleCancel}
        summaryResult={summaryResult}
      />
    </Box>
  )
}

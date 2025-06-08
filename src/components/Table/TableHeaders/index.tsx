import { Button, TextField } from '@mui/material'
import Box from '@mui/material/Box'
import { useReportContext } from '@/contexts/ReportContext.tsx'

interface Props {
  filterValue: string
  onFilterChange: (value: string) => void
}

const TableHeaders = ({ filterValue, onFilterChange }: Props) => {
  const { setCreateReportDrawerOpen, setGenerateReportOpen, isAdmin } =
    useReportContext()

  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
      <TextField
        id="searchTitleId"
        name="searchTitle"
        value={filterValue}
        sx={{ height: 5 }}
        onChange={(e) => onFilterChange(e.target.value)}
        size="small"
        variant="outlined"
        placeholder="Search title"
      />
      <Box sx={{ display: 'flex' }}>
        <Button
          disabled={!isAdmin}
          variant="contained"
          color="secondary"
          sx={{ mr: 2 }}
          onClick={() => setGenerateReportOpen(true)}
        >
          Generate Draft
        </Button>
        <Button
          disabled={!isAdmin}
          variant="contained"
          color="primary"
          onClick={() => setCreateReportDrawerOpen(true)}
        >
          Create Report
        </Button>
      </Box>
    </Box>
  )
}

export default TableHeaders

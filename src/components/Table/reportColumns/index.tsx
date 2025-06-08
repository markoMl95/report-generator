import { IconButton, Stack, Tooltip } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import SummarizeIcon from '@mui/icons-material/Summarize'
import LoopIcon from '@mui/icons-material/Loop'
import Box from '@mui/material/Box'
import type { ColumnDef } from '@tanstack/react-table'
import type { ReportsModel } from '@/models/Reports/Reports.ts'

export const getColumns = ({
  onEdit,
  onDelete,
  onSummarize,
  isPending,
  disabled,
}: {
  onEdit: (report: ReportsModel) => void
  onDelete: (report: ReportsModel) => void
  onSummarize: (report: ReportsModel) => void
  isPending: boolean
  disabled: boolean
}): Array<ColumnDef<ReportsModel>> => [
  {
    accessorKey: 'title',
    header: () => <Box sx={{ pl: 5 }}>Title</Box>,
  },
  {
    accessorKey: 'description',
    header: 'Description',
    cell: (info: any) => info.getValue(),
  },
  {
    id: 'actions',
    header: '',
    cell: ({ row }) => (
      <Stack direction="row" spacing={1} justifyContent="center">
        <Tooltip title="Edit" placement="top">
          <span>
            <IconButton
              size="small"
              onClick={() => onEdit(row.original)}
              disabled={disabled}
            >
              <EditIcon fontSize="small" />
            </IconButton>
          </span>
        </Tooltip>
        <Tooltip title="Delete" placement="top">
          <span>
            <IconButton
              size="small"
              color="error"
              onClick={() => onDelete(row.original)}
              disabled={disabled}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </span>
        </Tooltip>
        <Tooltip title="Summarize" placement="top">
          <span>
            <IconButton
              size="small"
              onClick={() => onSummarize(row.original)}
              disabled={disabled}
            >
              {isPending ? <LoopIcon /> : <SummarizeIcon fontSize="small" />}
            </IconButton>
          </span>
        </Tooltip>
      </Stack>
    ),
  },
]

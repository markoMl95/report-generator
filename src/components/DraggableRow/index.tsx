import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import {
  IconButton,
  Stack,
  TableCell,
  TableRow,
  Typography,
} from '@mui/material'
import DragIndicatorIcon from '@mui/icons-material/DragIndicator'
import { flexRender } from '@tanstack/react-table'

const DraggableRow = ({ row }: { row: any }) => {
  const { setNodeRef, attributes, listeners, transform, transition } =
    useSortable({ id: row.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <TableRow ref={setNodeRef} style={style}>
      {row.getVisibleCells().map((cell: any) => {
        const isTitleCell = cell.column.id === 'title'

        return (
          <TableCell key={cell.id}>
            {isTitleCell ? (
              <Stack direction="row" alignItems="center" spacing={1}>
                <IconButton
                  {...listeners}
                  {...attributes}
                  size="small"
                  sx={{ cursor: 'grab', color: 'gray' }}
                >
                  <DragIndicatorIcon />
                </IconButton>
                <Typography variant="body2">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </Typography>
              </Stack>
            ) : (
              flexRender(cell.column.columnDef.cell, cell.getContext())
            )}
          </TableCell>
        )
      })}
    </TableRow>
  )
}

export default DraggableRow

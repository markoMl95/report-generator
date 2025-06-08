import {
  DndContext,
  MouseSensor,
  closestCenter,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { flexRender } from '@tanstack/react-table'
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from '@mui/material'
import type { ReportsModel } from '@/models/Reports/Reports.ts'
import DraggableRow from '@/components/DraggableRow'

type Props = {
  table: any
  data: Array<ReportsModel>
  setData: (newData: Array<ReportsModel>) => void
}

const TanStackTable = ({ table, data, setData }: Props) => {
  const { pageIndex, pageSize } = table.getState().pagination

  const sensors = useSensors(useSensor(MouseSensor))

  const handleDragEnd = (event: any) => {
    const { active, over } = event
    if (active.id !== over?.id) {
      const oldIndex = table
        .getRowModel()
        .rows.findIndex((r: any) => r.id === active.id)
      const newIndex = table
        .getRowModel()
        .rows.findIndex((r: any) => r.id === over.id)
      const newData = arrayMove(data, oldIndex, newIndex)

      setData(newData)
    }
  }

  return (
    <Box sx={{ width: '100%' }}>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={table.getRowModel().rows.map((row: any) => row.id)}
          strategy={verticalListSortingStrategy}
        >
          <TableContainer component={Paper}>
            <Table
              sx={{
                '& td, & th': {
                  borderRight: '1px solid rgba(224, 224, 224, 1)', // default MUI divider color
                },
                '& td:last-child, & th:last-child': {
                  borderRight: 0,
                },
              }}
            >
              <TableHead>
                {table.getHeaderGroups().map((headerGroup: any) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header: any) => (
                      <TableCell key={header.id} colSpan={header.colSpan}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                            )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableHead>
              <TableBody>
                {table.getRowModel().rows.map((row: any) => (
                  <DraggableRow key={row.id} row={row} />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </SortableContext>
      </DndContext>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={data.length}
        rowsPerPage={pageSize}
        page={pageIndex}
        onPageChange={(_, newPage) => table.setPageIndex(newPage)}
        onRowsPerPageChange={(e) => table.setPageSize(Number(e.target.value))}
      />
    </Box>
  )
}

export default TanStackTable

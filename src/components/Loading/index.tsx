import { Box, CircularProgress, Dialog, Typography } from '@mui/material'

const LoadingDialog = ({ open }: { open: boolean }) => (
  <Dialog open={open} PaperProps={{ sx: { p: 4 } }}>
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <CircularProgress size={24} sx={{ mr: 2 }} />
      <Typography>Generating report, please wait...</Typography>
    </Box>
  </Dialog>
)

export default LoadingDialog

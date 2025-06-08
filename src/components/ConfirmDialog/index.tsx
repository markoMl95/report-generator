import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material'

type Props = {
  open: boolean
  title?: string
  description?: string
  onConfirm?: () => void
  onCancel?: () => void
  confirmButtonText?: string
  cancelButtonText?: string
  children?: React.ReactNode
}

const ConfirmDialog = ({
  open,
  title,
  description,
  onConfirm,
  onCancel,
  confirmButtonText,
  cancelButtonText,
  children = null,
}: Props) => {
  return (
    <Dialog open={open} onClose={onCancel}>
      <DialogTitle sx={{ fontSize: 20, fontWeight: 'bold' }}>
        {title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>{description}</DialogContentText>
        {children}
      </DialogContent>
      <DialogActions>
        {cancelButtonText && (
          <Button onClick={onCancel}>{cancelButtonText}</Button>
        )}
        {confirmButtonText && (
          <Button
            onClick={onConfirm}
            color="error"
            variant="contained"
            autoFocus
          >
            {confirmButtonText}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  )
}

export default ConfirmDialog

import { styled } from '@mui/material/styles'
import Drawer from '@mui/material/Drawer'
import TextareaAutosize from '@mui/material/TextareaAutosize'

export const CreateReportDrawer = styled(Drawer)(({ theme }) => ({
  width: theme.spacing(60),
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    width: theme.spacing(60),
    boxSizing: 'border-box',
    backgroundColor: theme.palette.lightGrey?.main || theme.palette.grey[200],
  },
}))

export const CustomTextarea = styled(TextareaAutosize)(({ theme }) => ({
  marginTop: theme.spacing(2),
  width: theme.spacing(70),
  backgroundColor: 'transparent',
  fontSize: 16,
  padding: `${theme.spacing(2.0625)} ${theme.spacing(1.75)}`,
  border: `1px solid ${theme.palette.grey[400]}`,
  borderRadius: theme.shape.borderRadius,
  transition: 'border-color 0.2s ease-in-out',
  minHeight: theme.spacing(10),
  maxHeight: theme.spacing(50),
  outline: 'none',
  resize: 'vertical',

  '&:focus': {
    borderColor: theme.palette.primary.main,
  },
}))

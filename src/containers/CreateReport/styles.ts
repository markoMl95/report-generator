import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'

export const CustomBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  marginTop: theme.spacing(10),
}))

export const StyledEditorWrapper = styled(Box)(({ theme }) => {
  const backgroundColorDefault = `${theme.palette.background.default} !important`

  return {
    '& .tox-editor-header': {
      backgroundColor: backgroundColorDefault,
    },
    '& .tox-toolbar-overlord > :first-of-type': {
      backgroundColor: theme.palette.background.default,
    },
    '& .tox-tbtn': {
      backgroundColor: backgroundColorDefault,
    },
    '& .tox-statusbar': {
      backgroundColor: backgroundColorDefault,
    },
  }
})

import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import CloseIcon from '@mui/icons-material/Close'
import IconButton from '@mui/material/IconButton'
import Box from '@mui/material/Box'
import { TextField } from '@mui/material'
import { Editor } from '@tinymce/tinymce-react'
import { CustomBox, StyledEditorWrapper } from './styles'
import useEditReport from '@/hooks/useEditReport'

const CreateReport = () => {
  const {
    reportTitleValue,
    setReportTitleValue,
    reportDescriptionValue,
    setReportDescriptionValue,
    handleOnClose,
    buttonText,
    handleOnSubmit,
  } = useEditReport()

  return (
    <CustomBox>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 10 }}>
        <Typography variant="h4">Create Report</Typography>
        <IconButton size="small" onClick={handleOnClose}>
          <CloseIcon />
        </IconButton>
      </Box>
      <Box>
        <Typography variant="body1" sx={{ fontSize: 20, mb: 2 }}>
          Report's Title
        </Typography>
        <TextField
          id="titleId"
          name="Title"
          value={reportTitleValue}
          onChange={(e) => setReportTitleValue(e.target.value)}
          variant="outlined"
          placeholder="Title"
          sx={{ width: '70%', mb: 5 }}
        />
        <Typography variant="body1" sx={{ fontSize: 20, mb: 2 }}>
          Report's Description
        </Typography>
        <StyledEditorWrapper>
          <Editor
            apiKey={import.meta.env.VITE_TINYMCE_API_KEY}
            value={reportDescriptionValue}
            onEditorChange={(newValue) => setReportDescriptionValue(newValue)}
            init={{
              height: 300,
              menubar: false,
              plugins: ['link', 'lists', 'code'],
              toolbar:
                'undo redo | bold italic | alignleft aligncenter alignright | code',
            }}
          />
        </StyledEditorWrapper>
        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 5, display: 'block' }}
          onClick={handleOnSubmit}
          disabled={!reportTitleValue || !reportDescriptionValue}
        >
          {buttonText}
        </Button>
      </Box>
    </CustomBox>
  )
}

export default CreateReport

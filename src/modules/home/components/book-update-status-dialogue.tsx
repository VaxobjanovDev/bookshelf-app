import React from 'react'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import withForm from 'components/form/with-form'
import { Button, Typography } from '@mui/material'
import FlexBox from 'components/main/flexbox'
import CancelIcon from '@mui/icons-material/Cancel'
import IconButton from '@mui/material/IconButton'

import StatusField from './form/StatusField'

interface Props {
  readonly open: boolean
  readonly handleClose: () => void
  readonly loading: boolean
  readonly form: any
  readonly bookTitle?: string
}

function BookUpdateStatusDialogue ({ open, handleClose, loading, form, bookTitle }: Props) {
  return (
    <Dialog open={open} onClose={handleClose} maxWidth="lg">
      <DialogTitle>
        <FlexBox justify="space-between">
          <Typography variant="h6">Update book status</Typography>
          <IconButton onClick={handleClose}>
            <CancelIcon />
          </IconButton>
        </FlexBox>
        <Typography variant="h6">{bookTitle}</Typography>
      </DialogTitle>
      <DialogContent sx={{ paddingTop: '8px!important' }}>
        <StatusField label="Status" />
      </DialogContent>
      <DialogActions sx={{ px: 3 }}>
        <Button onClick={handleClose} variant="outlined" fullWidth={true}>
          Close
        </Button>
        <Button onClick={form.handleSubmit} variant="contained" fullWidth={true} disabled={loading}>
          Update
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default withForm(BookUpdateStatusDialogue)

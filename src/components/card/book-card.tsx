import React, { useCallback } from 'react'
import FlexBox from 'components/main/flexbox'
import { Box, Button, Chip, Paper, Typography } from '@mui/material'
import { always, cond, equals } from 'ramda'

import { TrashIcon } from '../../icons/trash-icon'
import { EditIcon } from '../../icons/edit-icon'
import { DataItem } from '../../api/base-DTO'
import { useConfirm } from '../../context/confirm'

interface Props {
  readonly book: any
  readonly status: number
  readonly onOpenEditDialog: (book: DataItem) => void
  readonly onDeleteBook: (id: number) => void
}

type ColorStatus = 'default' | 'error' | 'primary' | 'secondary' | 'info' | 'success' | 'warning'

const getStatusLabel = cond([
  [equals(0), always('New')],
  [equals(1), always('Reading')],
  [equals(2), always('Finished')]
])

const getStatusColor = cond([
  [equals(0), always('error')],
  [equals(1), always('warning')],
  [equals(2), always('success')]
])

export const BookCard = ({ book, status, onOpenEditDialog, onDeleteBook }: Props) => {
  const onConfirm = useConfirm()
  const statusLabel = getStatusLabel(status)
  const statusColor = getStatusColor(status) as ColorStatus

  const onDeleteWithWarning = useCallback((id: number) => {
    const message = `Are you sure you want to delete this (${book?.title}) book?`

    onConfirm({ message })
      .agree(() => {
        onDeleteBook(id)
      })
      .disagree()
  }, [])

  return (
    <>
      <Paper
        variant="outlined"
        sx={{
          p: '28px 32px',
          height: '214px',
          width: '397px',
          border: 'none',
          borderRadius: '12px',
          position: 'relative',
          '&:hover .hover-buttons': {
            opacity: 1
          }
        }}>
        <FlexBox direction="column" spacing={2} align="flex-start">
          <Box sx={{ width: '100%' }}>
            <Typography variant="h6" noWrap>
              {book?.title}
            </Typography>
            <Typography variant="body2" noWrap={true}>
              Cover:
              <a href={book?.cover} target="_blank" rel="noopener noreferrer" style={{ marginLeft: '4px' }}>
                {book?.cover}
              </a>
            </Typography>
            <Typography variant="body2">Pages: {book?.pages}</Typography>
            <Typography variant="body2">Published: {book?.published}</Typography>
            <Typography variant="body2">Isbn: {book?.isbn}</Typography>
          </Box>
          <FlexBox direction="row" align="center" justify="space-between" sx={{ width: '100%' }}>
            <Typography variant="body1" sx={{ fontSize: '14px', fontWeight: '700' }}>
              {book?.author} / {book?.published}
            </Typography>
            {Boolean(statusLabel) && <Chip label={statusLabel} color={statusColor} />}
          </FlexBox>
        </FlexBox>
        {statusLabel && onOpenEditDialog && (
          <FlexBox
            align="center"
            direction="column"
            className="hover-buttons"
            sx={{
              padding: '0',
              gap: '2px',
              position: 'absolute',
              right: '-32px',
              top: '12px',
              opacity: 0,
              transition: 'opacity 0.3s ease',
              zIndex: '999'
            }}>
            <Button
              variant="contained"
              color="error"
              sx={{
                padding: '0',
                minWidth: '32px',
                width: '32px',
                height: '32px',
                background: '#FB4C4E',
                borderRadius: '6px 6px 6px 0'
              }}
              onClick={() => onDeleteWithWarning(book.id)}>
              <TrashIcon />
            </Button>
            <Button
              variant="contained"
              color="primary"
              sx={{
                padding: '0',
                minWidth: '32px',
                width: '32px',
                height: '32px',
                borderRadius: '0 6px 6px 6px'
              }}
              onClick={() => onOpenEditDialog({ book, status })}>
              <EditIcon />
            </Button>
          </FlexBox>
        )}
      </Paper>
    </>
  )
}

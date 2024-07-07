import React from 'react'
import { useField } from 'formik'
import { BaseTextFieldProps, FormControlLabel } from '@mui/material'
import MUITextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'

import { CancelSearchIcon } from '../../icons/cancel-search-icon'

interface Props extends BaseTextFieldProps {
  readonly inputVariant?: string
  readonly InputProps?: any
  readonly name?: string
  readonly label?: string
  readonly placeholder: string
}

function TextField ({ name, label, placeholder, InputProps, ...props }: Props) {
  const [field, meta, helpers] = useField(name || '')

  return (
    <FormControlLabel
      control={
        <MUITextField
          {...props}
          {...field}
          color="error"
          variant="outlined"
          placeholder={placeholder}
          error={meta.touched && Boolean(meta.error)}
          helperText={meta.touched && meta.error}
          // @ts-ignore
          onWheel={(e) => e.target.blur()}
          sx={{ width: '100%' }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton edge="end" onClick={() => helpers.setValue('')}>
                  {field.value && <CancelSearchIcon stroke="#FF4D4F" />}
                </IconButton>
              </InputAdornment>
            ),
            ...InputProps,
          }}
        />
      }
      label={label}
      labelPlacement="top"
      sx={{ width: '100%' }}
    />
  )
}

export default TextField

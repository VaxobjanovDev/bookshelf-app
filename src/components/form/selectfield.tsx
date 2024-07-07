import React, { useEffect } from 'react'
import Select from '@mui/material/Select'
import { MenuItem } from '@mui/material'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import { useField } from 'formik'
import InputLabel from '@mui/material/InputLabel'
import { styled } from '@mui/material/styles'

const InputLabelStyled = styled(InputLabel)({
  background: 'white',
  fontSize: '13px',
  lineHeight: '20px'
})

const SelectStyled = styled(Select)({
  borderRadius: '5px',
  '&.Mui-focused fieldset': {
    borderColor: '#1557FF'
  },
  '& .MuiInputBase-input': {
    color: '#202020',
    background: 'white'
  },
  '& ::placeholder': {
    opacity: 1,
    color: '#7c7c7c',
    fontSize: '15px',
    fontWeight: '500'
  }
})

function SelectField (props: any) {
  const {
    label,
    variant,
    options,
    name,
    size = 'small',
    disabled,
    onChange,
    className,
    required,
    defaultValue,
    ...defaultProps
  } = props

  const [input, meta, helpers] = useField(name)

  useEffect(() => {
    if (defaultValue !== undefined) {
      helpers.setValue(defaultValue)
    }
  }, [defaultValue, helpers])

  useEffect(() => {
    if (meta.initialValue !== undefined) {
      helpers.setValue(meta.initialValue)
    }
  }, [meta.initialValue, helpers])

  const borderColor = meta.touched && meta.error ? 'error.main' : 'default'

  return (
    <FormControl
      variant={variant}
      className={className}
      error={Boolean(meta.touched && meta.error)}
      sx={{ minWidth: 120, width: '100%' }}>
      <InputLabelStyled id={`${name}-label`} size={size}>
        {required ? `${label} *` : label}
      </InputLabelStyled>
      <SelectStyled
        size={size}
        labelId={`${name}-label`}
        id={name}
        sx={{
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor
          }
        }}
        displayEmpty={true}
        value={input.value || ''}
        disabled={disabled}
        onChange={(event) => {
          helpers.setValue(event.target.value)
          onChange && onChange(event.target.value)
        }}
        fullWidth={true}
        autoWidth={true}
        {...defaultProps}>
        {options.map((item: any, index: number) => (
          <MenuItem key={index} value={item.value}>
            {item.name}
          </MenuItem>
        ))}
      </SelectStyled>
      {Boolean((meta.touched && meta.error) || meta.initialError || meta.error) && (
        <FormHelperText
          sx={{
            height: '5px',
            fontSize: '11px'
          }}>
          {meta.error || meta.initialError}
        </FormHelperText>
      )}
    </FormControl>
  )
}

export default SelectField

import React from 'react'
import SelectField from 'components/form/selectfield'

const OPTIONS = [
  { value: '1', name: 'To Reading' },
  { value: '2', name: 'To Finished' }
]

function StatusField (props: any) {
  return <SelectField name="status" label="Статус" options={OPTIONS} {...props} />
}

export default StatusField

import React, { ReactNode, useContext, useReducer } from 'react'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogActions from '@mui/material/DialogActions'
import { Button } from '@mui/material'

import Context from './context'

export const useConfirm = () => {
  const { onConfirm } = useContext(Context) as any

  return onConfirm
}

const initialState = {
  open: false,
  title: 'Confirm action',
  message: null,
  isLoading: false,
  onAgree: () => null as any,
  onDisagree: () => null as any
}

const reducer = (state: any, action: any) => {
  if (action.type === 'open') {
    const { payload } = action

    return { ...initialState, ...payload, open: true }
  }

  if (action.type === 'close') {
    return { ...state, open: false }
  }

  if (action.type === 'startLoading') {
    return { ...state, isLoading: true }
  }

  if (action.type === 'endLoading') {
    return { ...state, isLoading: false }
  }

  return state
}

function Provider ({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState)

  const handleOpen = (payload: any) => {
    dispatch({ type: 'open', payload })
  }

  const handleClose = () => {
    dispatch({ type: 'close' })
  }

  const onDisagree = () => {
    const promise = state.onDisagree()
    const isPromise = promise instanceof Promise

    if (isPromise) {
      dispatch({ type: 'startLoading' })

      return promise.then(() => dispatch({ type: 'endLoading' })).then(() => handleClose())
    }

    handleClose()
  }

  const onAgree = () => {
    const promise = state.onAgree()
    const isPromise = promise instanceof Promise

    if (isPromise) {
      dispatch({ type: 'startLoading' })

      return promise.then(() => dispatch({ type: 'endLoading' })).then(() => handleClose())
    }

    handleClose()
  }

  const onConfirm = (payload: any) => ({
    agree: (onAgree = initialState.onAgree) => ({
      disagree: (onDisagree = initialState.onDisagree) => handleOpen({ ...payload, onAgree, onDisagree })
    })
  })

  return (
    <Context.Provider value={{ onConfirm }}>
      {children}
      <Dialog
        open={state.open}
        onClose={onDisagree}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">{state.title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">{state.message}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onDisagree} data-cy="disagree">
            Cancel
          </Button>
          <Button onClick={onAgree} data-cy="agree" autoFocus={true} disabled={state.isLoading}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Context.Provider>
  )
}

export default Provider

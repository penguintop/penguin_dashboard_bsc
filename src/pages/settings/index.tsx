import React, { ReactElement, useState } from 'react'
import { Paper, Container, TextField, Typography, Button } from '@material-ui/core'

export default function Settings(): ReactElement {
  const [refreshVisibility, toggleRefreshVisibility] = useState(false)
  const [host, setHost] = useState('')
  const [debugHost, setDebugHost] = useState('')

  const handleNewHostConnection = () => {
    if (host) {
      sessionStorage.setItem('api_host', host)
      localStorage.setItem('api_host', host)
    }

    if (debugHost) {
      sessionStorage.setItem('debug_api_host', debugHost)
      localStorage.setItem('debug_api_host', debugHost)
    }

    if (host || debugHost) {
      toggleRefreshVisibility(!refreshVisibility)
      window.location.reload()
    }
  }

  return (
    <div>
      <Container>
        <Typography variant="h4" gutterBottom>
          Settings
        </Typography>
        <Paper>
          <TextField
            label="API Endpoint"
            style={{ margin: 0 }}
            placeholder="ex: 127.0.0.0.1:1633"
            helperText="Enter node host override / port"
            fullWidth
            defaultValue={
              localStorage.getItem('api_host') ? localStorage.getItem('api_host') : process.env.REACT_APP_PEN_HOST
            }
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            onChange={e => {
              setHost(e.target.value)
              toggleRefreshVisibility(true)
            }}
            variant="filled"
          />
        </Paper>
        <Paper style={{ marginTop: '20px' }}>
          <TextField
            label="Debug API Endpoint"
            style={{ margin: 0 }}
            placeholder="ex: 127.0.0.0.1:1635"
            helperText="Enter node debug host override / port"
            fullWidth
            defaultValue={
              localStorage.getItem('debug_api_host')
                ? localStorage.getItem('debug_api_host')
                : process.env.REACT_APP_PEN_DEBUG_HOST
            }
            onChange={e => {
              setDebugHost(e.target.value)
              toggleRefreshVisibility(true)
            }}
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            variant="filled"
          />
        </Paper>
        {refreshVisibility ? (
          <div style={{ marginTop: '20px' }}>
            <Button variant="outlined" color="primary" onClick={() => handleNewHostConnection()}>
              Save
            </Button>
          </div>
        ) : null}
      </Container>
    </div>
  )
}

'use client'
import { createTheme, CssBaseline, StyledEngineProvider, ThemeProvider } from '@mui/material'
import React from 'react'

type Props = {
    children: React.ReactNode
}

export default function StyledThemeProvider({children}: Props) {

    const _theme = createTheme({
        palette:{
            mode:"light",
            background:{
                default:"#f1f1f1"
            }
        },
        components:{
            MuiButton:{
                defaultProps:{
                    size:"small"
                }
            },
            MuiTextField:{
                defaultProps:{
                    size:"small"
                }
            }
        }
        
    })

  return (
    <StyledEngineProvider injectFirst>
        <ThemeProvider theme={_theme}>
            <CssBaseline />
            {children}
        </ThemeProvider>
    </StyledEngineProvider>
  )
}
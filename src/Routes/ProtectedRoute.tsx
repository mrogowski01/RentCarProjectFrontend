import React from 'react'
import { Navigate } from 'react-router-dom'
import { routes } from './Router'

type Props = { children: React.ReactElement }

export const ProtectedRoute = (props: Props) => {
  const accessToken = localStorage.getItem('token')

  if (accessToken) return props.children

  return <Navigate to={routes.login} replace />
}

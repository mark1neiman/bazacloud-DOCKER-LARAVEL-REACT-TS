import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { useStateContext } from '../context/contextprovider'

const GuestLayout = () => {

    const { token } = useStateContext()

    if (token) {
        return <Navigate to="/" />
    }
    return (
        <div>
            <Outlet />
        </div>
    )
}

export default GuestLayout

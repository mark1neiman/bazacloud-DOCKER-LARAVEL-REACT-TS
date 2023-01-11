import React from 'react'
import { Link, Navigate, Outlet } from 'react-router-dom'
import { useStateContext } from '../context/contextprovider'
import axiosClient from '../axios-client'

const DefaultLayout = () => {

    const { user, token, setToken, setUser } = useStateContext()

    if (!token) {
        return <Navigate to='/login' />
    }

    const onLogout: React.MouseEventHandler = (e) => {
        e.preventDefault
        setUser({})
        setToken(null)
    }


    React.useEffect(() => {
        axiosClient.get('/user')
            .then(({ data }) => {
                setUser(data)
            })
    }, [])

    return (
        <div id='defaultLayout'>
            <aside>
                <Link to="/dashboard">Dashboard</Link>
                <Link to="/users">Users</Link>
            </aside>
            <div className='content'>
                <header>
                    <div>
                        Header
                    </div>
                    <div>
                        {user.name}  &nbsp; &nbsp;
                        <button onClick={onLogout} className='btn'>Logout</button>
                    </div>
                </header>
                <main>
                    <Outlet />
                </main>
            </div>

        </div>
    )
}

export default DefaultLayout

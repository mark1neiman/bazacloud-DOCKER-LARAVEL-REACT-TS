import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useStateContext } from '../context/contextprovider';
import axiosClient from '../axios-client';


const Signup = () => {

    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmationRef = useRef();

    const { setUser, setToken } = useStateContext()
    const [errors, setErrors] = useState(null)

    const onSubmit = (e) => {
        e.preventDefault();
        const payload = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            password_confirmation: passwordConfirmationRef.current.value,
        }
        console.log(payload)
        axiosClient.post('/signup', payload)
            .then(({ data }) => {
                setUser(data.user)
                setToken(data.token);
            })
            .catch(err => {
                const response = err.response;
                if (response && response.status === 422) {
                    setErrors(response.data.errors)
                }
            })
    }

    return (
        <div className='login-signup-form animated fadeInDown'>
            <div className='form'>
                <form onSubmit={onSubmit}>
                    <h1 className='title'>Signup right here right now!</h1>
                    {errors &&
                        <div className="alert">
                            {Object.keys(errors).map(key => (
                                <p key={key}>{errors[key][0]}</p>
                            ))}
                        </div>
                    }
                    <input ref={nameRef} placeholder='Full Name' />
                    <input ref={emailRef} placeholder='Email' type="email" />
                    <input ref={passwordRef} placeholder='Password' type="password" />
                    <input ref={passwordConfirmationRef} placeholder='Password Confirmation' type="password" />
                    <button className='btn btn-block'>Sign up</button>
                    <p className='message'>
                        Already registered? <Link to='/login'>Sign in</Link>
                    </p>
                </form>
            </div>
        </div>
    )
}

export default Signup

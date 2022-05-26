import { useState } from 'react'

// import styles of this component
import styles from '../Forms.module.css'
// import other component
import FormInput from '../FormInput/FormInput'
// import other pkgs
import { Container, Form, Button } from 'react-bootstrap'
import { useFormik } from 'formik'
import { object, string } from 'yup'

const LoginForm = ({ onRegister }) => {
    const [submit, setSubmit] = useState(false)

    const formik = useFormik({
        initialValues: {
            username: '',
            email: '',
            password: '',
        },
        validationSchema: object({
            username: string().required('please enter your username')
                .max(15, 'your username must be 15 characters or less')
                .min(4, 'your username must be 4 characters or more'),
            email: string().required('please enter your email').email('invalid email'),
            password: string().required('please enter your password')
                .min(8, 'your password must be 8 characters or more')
                .matches(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/, 'invalid password'),
        }),
        onSubmit: (values, actions) => {
            console.log(values)
        }
    })

    return (
        <Container className='d-flex justify-content-center align-items-center vh-100 px-5'>
            <Form noValidate className={styles.form} onSubmit={formik.handleSubmit}>
                <h2>Login</h2>

                <FormInput
                    className="mb-4 mt-5"
                    name="username"
                    controlId="username-input"
                    text="Username"
                    placeholder="Enter your Username"
                    errMsg={formik.errors.username}
                    successMsg="done"
                    invalid={submit && formik.errors.username ? true : false}
                    valid={submit && !formik.errors.username ? true : false}
                    {...formik.getFieldProps('username')}
                />

                <FormInput  
                    className="mb-4"
                    name="email"
                    controlId="email-input"
                    text="Email"
                    placeholder="Enter your Email"
                    errMsg={formik.errors.email}
                    successMsg="done"
                    invalid={submit && formik.errors.email ? true : false}
                    valid={submit && !formik.errors.email ? true : false}
                    {...formik.getFieldProps('email')}
                />

                <FormInput
                    className="mb-4"
                    name="password"
                    controlId="password-input"
                    text="Password"
                    placeholder="Enter your Password"
                    type="password"
                    errMsg={formik.errors.password}
                    successMsg="done"
                    invalid={submit && formik.errors.password ? true : false}
                    valid={submit && !formik.errors.password ? true : false}
                    {...formik.getFieldProps('password')}
                />

                <Button 
                    onClick={() => onRegister('register')}
                    className='shadow-none mt-4 p-0'
                    type="button"
                    variant="">
                    you have an account ?
                </Button>

                <Button 
                    className={`${styles["submit-btn"]}`} 
                    onClick={() => setSubmit(true)}
                    variant="primary" 
                    type="submit" 
                    style={{ width: "100%" }}>
                    Register
                </Button>
            </Form>
        </Container>
    )
}

export default LoginForm
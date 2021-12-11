import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Button, Form, Divider, Header, Grid, Icon } from 'semantic-ui-react'
import '../../styles/public.css'

import { Link } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import { startLoginEmailPassword, startGoogleLogin } from '../../actions/auth';


const LoginScreen = () => {
    const dispatch = useDispatch();
    const { loading } = useSelector(state => state.ui);

    const [formValues, handleInputChange] = useForm({
        email: '',
        password: ''
    });

    const { email, password } = formValues;

    const handleLogin = (e) => {
        e.preventDefault();
        console.log('se manda')
        dispatch(startLoginEmailPassword(email, password));
    }

    const handleGoogleLogin = () => {
        dispatch(startGoogleLogin());
    }

    return (
        <>
            <Container>
                <Grid textAlign='center' verticalAlign='middle'>
                    <Grid.Column width={6}>
                        <Header as='h2' icon>
                            <Icon name='fighter jet' />
                            Welcome to AeroH!
                            <Header.Subheader>
                                Our library of aviation history
                            </Header.Subheader>
                        </Header>
                        <Divider horizontal />
                        <Header as='h3'>Login</Header>

                        <Form onSubmit={handleLogin}>

                            <Form.Input
                                icon='envelope'
                                iconPosition='left'
                                label='Email'
                                placeholder='Email'
                                name="email"
                                type="text"
                                autoComplete="off"
                                value={email}
                                onChange={handleInputChange}
                            />

                            <Form.Input
                                icon="key"
                                iconPosition='left'
                                label="Password"
                                placeholder="Password"
                                name="password"
                                autoComplete="off"
                                type="password"
                                value={password}
                                onChange={handleInputChange}
                            />


                            <Button primary content='Sign In'
                                type="submit"
                                disabled={loading}
                            />

                            <Divider horizontal />

                            <Container>
                                <Header as='h5'>Login with social networks</Header>
                                <Button
                                    onClick={handleGoogleLogin}

                                    basic
                                    color='blue'
                                    content='Google'
                                    icon='google'
                                    label={{
                                        as: 'a',
                                        basic: true,
                                        color: 'blue',
                                        pointing: 'left',
                                        content: 'Sign In',
                                    }}
                                />
                            </Container>

                            <Divider horizontal>Or</Divider>

                            <Button secondary content="Sign Up"
                                as={Link} to='/auth/register'
                            />

                        </Form>
                    </Grid.Column>
                </Grid>
            </Container>
        </>
    )
}

export {
    LoginScreen as default
}
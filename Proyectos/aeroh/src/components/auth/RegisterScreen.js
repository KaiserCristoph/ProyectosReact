import React from 'react';
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import validator from 'validator';
import {Container, Button, Form, Divider, Header, Grid, Icon, Message} from 'semantic-ui-react'
import '../../styles/public.css'

import {useForm} from '../../hooks/useForm';
import {setError, removeError} from '../../actions/ui';
import {startRegisterWithEmailPasswordName} from '../../actions/auth';

const RegisterScreen = () => {

    const dispatch = useDispatch();
    const { msgError } = useSelector( state => state.ui );

    const [ formValues, handleInputChange ] = useForm({
        name: '',
        email: '',
        password: '',
        password2: '',
    });

    const { name ,email ,password ,password2 } = formValues;

    const handleRegister = (e) => {
        e.preventDefault();

        if ( isFormValid() ) {
            dispatch( startRegisterWithEmailPasswordName(email, password, name) );
        }

    }

    const isFormValid = () => {
        
        if ( name.trim().length === 0 ) {
            dispatch( setError('Name is required') )
            return false;
        } else if ( !validator.isEmail( email ) ) {
            dispatch( setError('Email is not valid') )
            return false;
        } else if ( password !== password2 || password.length < 5 ) {
            dispatch( setError('Password should be at least 6 characters and match each other') )
            return false
        }
        
        dispatch( removeError() );
       return true;
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
                        <Divider horizontal/>
                        <Header as='h3'>Register</Header>

                        <Form onSubmit={handleRegister}>

                            {
                                msgError &&
                                (
                                    // <Message icon>
                                    //     <Icon name='x'/>
                                    //     <Message.Content>
                                    //     <Message.Header>Error</Message.Header>
                                    //         {msgError}
                                    //     </Message.Content>
                                    // </Message>
                                    <Message color='red' floating><Icon name='x'/>{msgError}</Message>
                                )
                            }

                            <Form.Input 
                                icon='address card'
                                iconPosition='left'
                                label='Username'
                                type="text"
                                placeholder="Name"
                                name="name"
                                autoComplete="off"
                                value={ name }
                                onChange={ handleInputChange }
                            />

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
                                type="password"
                                placeholder="Password"
                                name="password"
                                autoComplete="off"
                                value={ password }
                                onChange={ handleInputChange }
                            />

                            <Form.Input 
                                icon="key"
                                iconPosition='left'
                                label="Confirm Password"
                                type="password"
                                placeholder="Confirm password"
                                name="password2"
                                autoComplete="off"
                                value={ password2 }
                                onChange={ handleInputChange }
                            />

                            <Button primary content='Register'
                                type="submit"
                            />

                            <Divider horizontal>Or</Divider>

                            <Button secondary content="Sign In"
                                as={Link} to='/auth/login'
                            />
                        </Form>
                    </Grid.Column>
                </Grid>
            </Container>
        </>
    )
}

export{
    RegisterScreen as default
}
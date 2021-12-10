import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Divider, Grid, Header, Icon, Segment } from 'semantic-ui-react';

import '../../styles/upload.css'

const UploadMenu = () => {
    return (
        <>
            <Grid verticalAlign='middle' id="mainContMenu" textAlign="center">
                <Grid.Row>
                    <Header as='h2' icon>
                        <Icon name='fighter jet' />
                        Uplad Menu
                        <Header.Subheader>
                            Here are your optios as user to interact with our data
                        </Header.Subheader>
                    </Header>

                </Grid.Row>
                <Grid.Row>
                    <Segment placeholder id='largeRow'>
                        <Grid columns={2} stackable textAlign='center'>
                            <Divider vertical>Or</Divider>

                            <Grid.Row verticalAlign='middle'>
                                <Grid.Column>
                                    <Header icon>
                                        <Icon name='fighter jet' />
                                        Add New Model
                                    </Header>
                                    <Button primary as={Link} to="/users/upload/model">Add</Button>
                                </Grid.Column>
                                <Grid.Column>
                                    <Header icon>
                                        <Icon name='industry' />
                                        Add New Manufacturer
                                    </Header>
                                    <Button secondary as={Link} to="/users/upload/manufacturer">Add</Button>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Segment>
                </Grid.Row>
            </Grid>
        </>
    );
};

UploadMenu.propTypes = {

};

export default UploadMenu;
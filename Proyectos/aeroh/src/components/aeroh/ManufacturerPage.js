import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import { Container, Divider, Grid, Header, Icon, Image, Label, Segment } from "semantic-ui-react"
import { activeManufacturer } from "../../actions/manufacturers";
import { loadManufacturerById } from "../../helpers/loadManufacturers";
import "../../styles/entPage.css"

// const ManufacturerPage = ({ id, image, name, lifespan, description, modelsAmount }) => {
const ManufacturerPage = () => {
    const dispatch = useDispatch();
    const { manufacturerId } = useParams();
    const [manufacturer, setManufacturer] = useState({})
    
    useEffect (() => {
        let manufacturerRaw = loadManufacturerById(manufacturerId);

       manufacturerRaw.then(manufacturerData => {
            dispatch(activeManufacturer(manufacturerData.id, manufacturerData))
            setManufacturer(manufacturerData)
        })
    }, [])

    const { image, name, lifeSpan, description } = manufacturer

    return (
        <>
            <Grid container columns={2}>
                <Grid.Row>
                    <Grid.Column verticalAlign='middle'>
                        <Image id="imgCol" src={image} floated='left' strech size='huge'></Image>
                    </Grid.Column>
                    <Grid.Column id="infoCol" verticalAlign='middle'>
                        <Container textAlign='justified'>
                            <Label color='blue'>
                                Manufacturer
                            </Label>
                            <Header as='h3' textAlign='center'> {name} </Header>
                            <p justified>
                                {description}
                            </p>
                            <Segment>
                                <Grid columns={2} container textAlign="center">
                                    <Grid.Column verticalAlign='middle'>
                                        <Label>
                                            <Icon name='calendar alternate' /> {lifeSpan}
                                        </Label>
                                    </Grid.Column>
                                    <Grid.Column verticalAlign='middle'>
                                        <Label>
                                            {/* <Icon name='jet fighter' /> {modelsAmount} models */}
                                            <Icon name='jet fighter' /> 0 models
                                        </Label>
                                    </Grid.Column>
                                </Grid>
                                <Divider vertical><Icon name='industry' /></Divider>
                            </Segment>
                        </Container>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </>
    )
}

export {
    ManufacturerPage as default
}
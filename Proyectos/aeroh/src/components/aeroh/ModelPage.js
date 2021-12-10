import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import { Link, useNavigate } from "react-router-dom";
import { Button, Container, Divider, Grid, Header, Icon, Image, Label, Segment } from "semantic-ui-react"
import { activeModel, startDeleting } from "../../actions/models";
import { loadModelById } from "../../helpers/loadModels";
import "../../styles/entPage.css"

const ModelPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { modelId } = useParams();
    const [model, setModel] = useState({})

    useEffect(() => {
        let modelRaw = loadModelById(modelId);

        modelRaw.then(modelData => {
            dispatch(activeModel(modelData.id, modelData))
            setModel(modelData)
        })
    }, [])

    const { id, image, name, lifeSpan, description, amountProduced } = model

    const handleDelete = () => {
        dispatch(startDeleting(id, navigate));
    }
    return (
        <>
            <Grid container columns={2}>
                <Grid.Row>
                    <Grid.Column verticalAlign='middle'>
                        <Image id="imgCol" src={image} floated='left' size='huge'></Image>
                    </Grid.Column>
                    <Grid.Column id="infoCol" verticalAlign='middle'>
                        <Container textAlign='justified'>
                            <Label color='red'>
                                Model
                            </Label>
                            <Header as='h3' textAlign='center'>{name}</Header>
                            <p>
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
                                            <Icon name='factory' /> ~{amountProduced} built
                                        </Label>
                                    </Grid.Column>
                                </Grid>
                                <Divider vertical><Icon name='jet fighter' /></Divider>
                            </Segment>
                            <Segment>
                                <Grid columns={2} container textAlign="center">
                                    <Grid.Column verticalAlign='middle'>
                                        <Button secondary content="Update"
                                            as={Link} to={`/models/update/${id}`}
                                        />
                                    </Grid.Column>
                                    <Grid.Column verticalAlign='middle'>
                                        <Button
                                            negative
                                            content="Delete"
                                            onClick={handleDelete}
                                        />
                                    </Grid.Column>
                                </Grid>
                            </Segment>
                        </Container>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </>
    )
}

export {
    ModelPage as default
}
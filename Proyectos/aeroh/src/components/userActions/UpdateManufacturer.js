import { useNavigate } from "react-router";
import { Form, Grid, Header, Icon, Segment, Button } from "semantic-ui-react"
import { useDispatch, useSelector } from "react-redux";
import { useForm } from '../../hooks/useForm';

import '../../styles/upload.css'
import { Link } from "react-router-dom";
import { updateManufacturer } from "../../actions/manufacturers";

const UploadModel = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { id, image, name, lifeSpan, description } = useSelector(state => state.manufacturer.active);

    const [formValues, handleInputChange] = useForm({
        newName: name,
        from: lifeSpan && lifeSpan.split(' ')[0],
        until: lifeSpan && lifeSpan.split(' ')[2],
        newDescription: description,
    });

    const { newName, from, until, newDescription } = formValues;

    const handleUpload = async () => {
        const imageUrl = image;

        if (imageUrl != null) {
            await dispatch(updateManufacturer({
                id,
                image: imageUrl,
                name: newName,
                lifeSpan: from.concat(" - ", until),
                description: newDescription
            }, navigate))
        } else {
            console.log("No url")
        }
    };

    const handleImageClick = () => {
        document.querySelector('#fileSelector').click()
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        // if (file) {
        //     setCurrentFile(file)
        // } else {
        //     setCurrentFile(null)
        // }
    }

    return (
        <>
            <Grid verticalAlign='middle' id="mainCont" textAlign="center">
                <Grid.Row>
                    <Header as='h2' icon>
                        <Icon name='industry' />
                        Create new manufacturer
                        <Header.Subheader>
                            Add a new manufacturer
                        </Header.Subheader>
                    </Header>

                </Grid.Row>
                <Grid.Row>
                    <Form>
                        <Segment.Group raised>
                            <Segment.Group horizontal>
                                <Segment color='teal' textAlign="center">
                                    <Form.Input
                                        icon='fighter jet'
                                        iconPosition='left'
                                        label='Name'
                                        placeholder='Name...'
                                        name="newName"
                                        type="text"
                                        autoComplete="off"
                                        value={newName}
                                        onChange={handleInputChange}
                                    />
                                </Segment>
                                <Segment color='teal' textAlign="center">
                                    <Form.Input
                                        icon='calendar alternate'
                                        iconPosition='left'
                                        label='Founded'
                                        placeholder='From...'
                                        name="from"
                                        type="text"
                                        autoComplete="off"
                                        value={from}
                                        onChange={handleInputChange}
                                    />
                                </Segment>
                                <Segment color='teal' textAlign="center">
                                    <Form.Input
                                        icon='calendar alternate'
                                        iconPosition='left'
                                        label='Closed'
                                        placeholder='Until...'
                                        name="until"
                                        type="text"
                                        autoComplete="off"
                                        value={until}
                                        onChange={handleInputChange}
                                    />
                                </Segment>
                            </Segment.Group>
                            <Segment.Group horizontal>
                                <Segment color='teal' textAlign="center">
                                    <Form.Field>
                                        <input id="fileSelector" name="file" type="file" onChange={handleFileChange} />
                                        <label>Upload Image</label>
                                        <Button icon='upload' onClick={handleImageClick} />
                                    </Form.Field>
                                </Segment>
                            </Segment.Group>
                            <Segment.Group horizontal>
                                <Segment color='teal' textAlign="center">
                                    <Form.TextArea
                                        id="uploadDesc"

                                        label='Description'
                                        placeholder='Add some history or facts about this manufacturer...'
                                        name="newDescription"
                                        type="text"
                                        autoComplete="off"
                                        value={newDescription}
                                        onChange={handleInputChange}
                                    />
                                </Segment>
                            </Segment.Group>
                            <Segment.Group horizontal>
                                <Segment textAlign="center">
                                    <Button
                                        primary
                                        content='Upload'
                                        type="submit"
                                        onClick={handleUpload}
                                    />
                                </Segment>
                                <Segment textAlign="center">
                                    <Button secondary as={Link} to={`/manufacturers/${id}`}>Go Back</Button>
                                </Segment>
                            </Segment.Group>
                        </Segment.Group>
                    </Form>

                </Grid.Row>
            </Grid>
        </>
    )
};

export {
    UploadModel as default
};
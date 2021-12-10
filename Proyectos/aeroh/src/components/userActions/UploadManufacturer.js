import { useState } from "react";
import { useNavigate } from "react-router";
import { Form, Grid, Header, Icon, Segment, Button } from "semantic-ui-react"
import { useDispatch, useSelector } from "react-redux";
import { useForm } from '../../hooks/useForm';

import '../../styles/upload.css'
import { fileUpload } from "../../helpers/fileUpload";
import { Link } from "react-router-dom";
import { UploadNewManufacturer } from "../../actions/manufacturers";

const UploadModels = () => {
    const dispatch = useDispatch();
    const [file, setCurrentFile] = useState(null)
    const lastManufacturer = useSelector(state => state.manufacturer.manufacturerAdded);
    const navigate = useNavigate();


    const [formValues, handleInputChange] = useForm({
        name: "",
        from: "",
        until: "",
        description: "",
        modelsAmount: ""
    });

    const { name, from, until, description } = formValues;

    const handleAddNew = async () => {
        if (file != null) {
            const imageUrl = await fileUpload(file);

            if (imageUrl != null) {
                await dispatch(UploadNewManufacturer({
                    image: imageUrl,
                    name,
                    lifeSpan: from.concat(" - ", until),
                    description
                }, navigate))
            } else {
                console.log("No url")
            }
        } else {
            console.log("No file")
        }
    };

    const handleImageClick = () => {
        document.querySelector('#fileSelector').click()
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setCurrentFile(file)
        } else {
            setCurrentFile(null)
        }
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
                                        name="name"
                                        type="text"
                                        autoComplete="off"
                                        value={name}
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
                                        name="description"
                                        type="text"
                                        autoComplete="off"
                                        value={description}
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
                                        onClick={handleAddNew}
                                    />
                                </Segment>
                                <Segment textAlign="center">
                                    <Button secondary as={Link} to="/users/upload/">Go Back</Button>
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
    UploadModels as default
};
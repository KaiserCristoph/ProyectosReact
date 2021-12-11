import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Form, Grid, Header, Icon, Segment, Button, Select } from "semantic-ui-react"
import { useDispatch } from "react-redux";
import { useForm } from '../../hooks/useForm';

import '../../styles/upload.css'
import { uploadNewModel } from "../../actions/models";
import { fileUpload } from "../../helpers/fileUpload";
import { loadAllManufacturers } from "../../helpers/loadManufacturers";
import { Link } from "react-router-dom";

// const ModelPage = ({ id, image, name, activeYears, description, amountProduced }) => {
const UploadModel = () => {

    const dispatch = useDispatch();
    const [file, setCurrentFile] = useState(null)
    const [currentManufacturer, setCurrentManufacturer] = useState([0])
    const [options, setOptions] = useState([])

    const navigate = useNavigate();

    useEffect(() => {
        loadAllManufacturers().then(manufacturers => {

            const manufacturersOptions = manufacturers.map((manufacturer, i, row) => {
                const { name, id } = manufacturer
                return { key: (i + 1), text: name, id: id, value: i }
            })

            setOptions(manufacturersOptions)
        })
    }, [])

    const [formValues, handleInputChange] = useForm({
        name: "",
        from: "",
        until: "",
        description: "",
        amountProduced: ""
    });

    const { name, from, until, description, amountProduced } = formValues;

    const handleAddNew = async () => {
        if (file != null) {
            const imageUrl = await fileUpload(file);

            if (imageUrl != null) {
                dispatch(uploadNewModel({
                    image: imageUrl,
                    name,
                    lifeSpan: from.concat(" - ", until),
                    description,
                    amountProduced,
                    manufacturer: options[currentManufacturer].id
                }, navigate));
            } else {
                console.log("No url")
            }
        } else {
            console.log("No file")
        }
    };

    const changeDropOption = (event, data) => {
        console.log(data.value)
        setCurrentManufacturer(data.value)
    }

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
                        <Icon name='fighter jet' />
                        Create new model
                        <Header.Subheader>
                            Add a new manufacturer model
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
                                        label='Model Name'
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
                                        label='Service start'
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
                                        label='Until'
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
                                    <Form.Input
                                        icon='industry'
                                        iconPosition='left'
                                        label='Units Built'
                                        placeholder='Units Built...'
                                        name="amountProduced"
                                        type="text"
                                        autoComplete="off"
                                        value={amountProduced}
                                        onChange={handleInputChange}
                                    />
                                </Segment>
                                <Segment color='teal' textAlign="center">
                                    {/* <Form.Input
                                                icon='fighter jet'
                                                iconPosition='left'
                                                label='Model Name'
                                                placeholder='Name...'
                                                name="name"
                                                type="text"
                                                autoComplete="off"
                                                value={name}
                                                onChange={handleInputChange}
                                            /> */}
                                    <Form.Field>
                                        <input id="fileSelector" name="file" type="file" onChange={handleFileChange} />
                                        <label>Upload Image</label>
                                        <Button icon='upload' onClick={handleImageClick} />
                                    </Form.Field>
                                </Segment>
                                <Segment color='teal' textAlign="center">
                                    <Form.Field
                                        control={Select}
                                        search
                                        label='Manufacturer'
                                        placeholder='Manufacturer'

                                        options={options}
                                        onChange={changeDropOption}
                                    />
                                </Segment>
                            </Segment.Group>
                            <Segment.Group horizontal>
                                <Segment color='teal' textAlign="center">
                                    <Form.TextArea
                                        id="uploadDesc"

                                        label='Description'
                                        placeholder='Add some history or facts about this model...'
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
    UploadModel as default
};
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useParams } from "react-router-dom";
import { Form, Grid, Header, Icon, Segment, Button } from "semantic-ui-react"
import { useDispatch, useSelector } from "react-redux";
import { useForm } from '../../hooks/useForm';

import '../../styles/upload.css'
import { UploadNewModel } from "../../actions/models";
import { loadAllManufacturers } from "../../helpers/loadManufacturers";
import { Link } from "react-router-dom";

const UpdateModels = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id, image, name, lifeSpan, description, amountProduced, manufacturer } = useSelector(state => state.model.active);

    const [currentManufacturer, setCurrentManufacturer] = useState([0])
    const [options, setOptions] = useState([])



    useEffect(() => {
        loadAllManufacturers().then(manufacturers => {
            let currentValue = 0
            const manufacturersOptions = manufacturers.map((rowManufacturer, i, row) => {
                const { name, id } = rowManufacturer
                if (id === manufacturer) {
                    console.log(id, ' - ', manufacturer)
                    currentValue = i
                }
                return { key: (i + 1), text: name, id: id, value: i }
            });

            setOptions(manufacturersOptions);
            console.log('current: ', currentValue)
            setCurrentManufacturer(currentValue)
        })
    }, []);

    useEffect(() => {
        if (options[currentManufacturer]) {
            document.querySelector('#manufacturerSelect').value = options[currentManufacturer].text
            setCurrentManufacturer(currentManufacturer);
            console.log('chgandes to: ', options[currentManufacturer].text)
        }
    }, [currentManufacturer])

    const [formValues, handleInputChange] = useForm({
        newName: name,
        from: lifeSpan && lifeSpan.split(' ')[0],
        until: lifeSpan && lifeSpan.split(' ')[2],
        newDescription: description,
        newAmountProduced: amountProduced
    });

    const { newName, from, until, newDescription, newAmountProduced } = formValues;

    const handleAddNew = async () => {
        const imageUrl = image;

        if (imageUrl != null) {
            dispatch(UploadNewModel({
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
    };

    const changeDropOption = (event, data) => {
        setCurrentManufacturer(data.value)
    }

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
                                        value={newName}
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
                                        value={newAmountProduced}
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
                                    <Form.Select
                                        fluid
                                        id="manufacturerSelect"
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
                                        onClick={handleAddNew}
                                    />
                                </Segment>
                                <Segment textAlign="center">
                                    <Button secondary as={Link} to={`/models/${id}`}>Go Back</Button>
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
    UpdateModels as default
};
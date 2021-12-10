import React, { useEffect, useState } from 'react';
import { Container, Grid, Label } from 'semantic-ui-react';

import '../../styles/main.css';
import { loadAllManufacturers } from '../../helpers/loadManufacturers';
import ManufacturerCard from './ManufacturerCard';
import { loadAllModels } from '../../helpers/loadModels';
import ModelCard from './ModelCard';

const AeroHMain = () => {

    const loadManufacturers = loadAllManufacturers()
    const [manufacturers, setManufacturers] = useState([])

    useEffect(() => {
        loadManufacturers.then(manufacturersR => {
            setManufacturers(manufacturersR.map((manufacturer, i, row) => {
                if (i < 4) {
                    return <ManufacturerCard
                        key={manufacturer.id}
                        {...manufacturer}
                    />
                }
            }));
        });
    }, [])

    const loadModels = loadAllModels()
    const [models, setModels] = useState([])

    useEffect(() => {
        loadModels.then(modelsR => {
            setModels(modelsR.map((model, i, row) => {
                if (i < 4) {
                    return <ModelCard
                        key={model.id}
                        {...model}
                    />
                }
            }));
        });
    }, [])

    return (
        <>
            <Container>
                <Grid container divided='vertically'>
                    <Grid.Row>
                        <Grid container columns={4}>
                            <Grid.Row>
                                <Grid.Column>
                                    <Container>
                                        <Label color='blue'>
                                            Some Manufacturers Added
                                        </Label>
                                    </Container>
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row>
                                {manufacturers.map(element => {
                                    return <Grid.Column>
                                        {element}
                                    </Grid.Column>
                                })}
                            </Grid.Row>
                        </Grid>
                    </Grid.Row>

                    <Grid.Row>
                        <Grid container columns={4}>
                            <Grid.Row>
                                <Grid.Column>
                                    <Container>
                                        <Label color='red'>
                                            Some Models Added
                                        </Label>
                                    </Container>
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row>
                                {models.map(element => {
                                    return <Grid.Column>
                                        {element}
                                    </Grid.Column>
                                })}
                            </Grid.Row>
                        </Grid>
                    </Grid.Row>
                </Grid>
            </Container>
        </>
    )
}

export {
    AeroHMain as default
}
import { Container, Divider, Grid, Header, Icon } from 'semantic-ui-react';

import ModelCard from './ModelCard';
import { loadAllModels } from '../../helpers/loadModels';
import { useState, useEffect, useMemo } from 'react';

const Models = () => {
    const [modelsArray, setModelsArray] = useState([])
    const allModels = useMemo(() => loadAllModels(), []);

    useEffect(() => {
        let modelsArrayTemp = []
        let modelsCurrentArray = []
        let currentModel = 0

        allModels.then(modelsR => {

            modelsR.map((model, i, row) => {
                modelsCurrentArray = [...modelsCurrentArray,
                <ModelCard
                    key={model.id}
                    {...model}
                />
                ];

                currentModel = currentModel + 1;
                if (currentModel === 4 || i + 1 === row.length) {
                    modelsArrayTemp = [...modelsArrayTemp, [...modelsCurrentArray]];

                    modelsCurrentArray = []
                    currentModel = 0
                };

                if (i + 1 === row.length) {
                    setModelsArray(() => [...modelsArrayTemp]);
                }
            });
        });
    }, []);


    return (
        <Container fluid>
            <Divider horizontal>
                <Header as='h4'>
                    <Icon name='fighter jet' />
                    Models List
                </Header>
            </Divider>
            <Grid container columns={4}>
                {
                    modelsArray.map(row => (
                        <Grid.Row>
                            {row.map(element => {
                                return <Grid.Column>
                                    {element}
                                </Grid.Column>
                            })}
                        </Grid.Row>
                    ))
                }

            </Grid>
        </Container>
    )
}

export {
    Models as default
}
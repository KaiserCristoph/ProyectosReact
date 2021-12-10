import { useEffect, useMemo, useState } from 'react';
import { Container, Divider, Grid, Header, Icon } from 'semantic-ui-react';
import { loadAllManufacturers } from '../../helpers/loadManufacturers';

import ManufacturerCard from './ManufacturerCard';

const Manufacturers = () => {
    const [manufacturersArray, setManufacturersArray] = useState([])
    const allManufacturers = useMemo(() => loadAllManufacturers(), []);
    
    useEffect(() => {
        let manufacturersArrayTemp = []
        let manufacturersCurrentArray = []
        let currentManufacturer = 0

        allManufacturers.then(manufacturersR => {

            manufacturersR.map((manufacturer, i, row) => {
                manufacturersCurrentArray = [...manufacturersCurrentArray,
                <ManufacturerCard
                    key={manufacturer.id}
                    {...manufacturer}
                />
                ];

                currentManufacturer = currentManufacturer + 1;
                if (currentManufacturer === 4 || i + 1 === row.length) {
                    manufacturersArrayTemp = [...manufacturersArrayTemp, [...manufacturersCurrentArray]];

                    manufacturersCurrentArray = []
                    currentManufacturer = 0
                };

                if (i + 1 === row.length) {
                    setManufacturersArray(() => [...manufacturersArrayTemp]);
                }
            });
        });
    }, []);

    return (
        <Container fluid>
            <Divider horizontal>
                <Header as='h4'>
                    <Icon name='fighter jet' />
                    Manufacturers List
                </Header>
            </Divider>

            <Grid container columns={4}>
                {
                    manufacturersArray.map(row => (
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
    Manufacturers as default
}
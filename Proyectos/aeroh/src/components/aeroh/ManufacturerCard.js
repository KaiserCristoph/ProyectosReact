import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Card, Container, List } from 'semantic-ui-react'
import { loadModelsByManufacturer } from '../../helpers/loadModels'

import "../../styles/cards.css"

const ManufacturerCard = ({ id, image, name, lifespan, description }) => {
    const modelsRaw = loadModelsByManufacturer(id);
    const [modelsCount, setModelsCount] = useState(0)
    useEffect(() => {
        modelsRaw.then(modelsData => {
            setModelsCount(modelsData.length);
        })
    }, [])


    return (
        <div>
            <Card
                id="elementCard"
                image={image}
                header={name}
                meta={lifespan}
                description={
                    <Container textAlign='justified'>
                        <p>{description.substring(0, 375)}...</p>
                    </Container>
                }
                extra={
                    <List>
                        <List.Item>
                            <List.Icon name='plane' />
                            <List.Content>{modelsCount} models added</List.Content>
                        </List.Item>
                        <List.Item>
                            <List.Icon name='angle double right' />
                            <List.Content>
                                <Link to={`/manufacturers/${id}`}>Learn More...</Link>
                            </List.Content>
                        </List.Item>
                    </List>
                } />
        </div>
    )
}

export {
    ManufacturerCard as default
}
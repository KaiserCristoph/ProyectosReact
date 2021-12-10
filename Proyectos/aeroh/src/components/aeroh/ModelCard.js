import React from 'react'
import { Link } from 'react-router-dom'
import { Card, Container, List } from 'semantic-ui-react'

import "../../styles/cards.css"


const ModelCard = ({ id, image, name, lifeSpan, description, amountProduced }) => (
    <Card
        id="elementCard"
        image={image}
        header={name}
        meta={lifeSpan}
        description={
            <Container textAlign='justified'>
                <p>{description.substring(0,350)}...</p>
            </Container>
        }
        extra={
            <List>
                <List.Item>
                    <List.Icon name='industry' />
                    <List.Content>~{amountProduced} built</List.Content>
                </List.Item>
                <List.Item>
                    <List.Icon name='angle double right' />
                    <List.Content>
                        <Link to={`/models/${id}`}>Learn More...</Link>
                    </List.Content>
                </List.Item>
            </List>
        }
    />
)

export {
    ModelCard as default
}
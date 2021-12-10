import React from 'react'
import {useSelector} from 'react-redux';
import {Link} from 'react-router-dom'
import {Divider, Icon, Menu, Sidebar} from 'semantic-ui-react'

const NavBar = () => {
	const { name } = useSelector( state => state.auth);


	return(
		<Sidebar
			as={Menu}
			animation='overlay'
			icon='labeled'
			inverted
			vertical
			visible
			width='thin'
		>
			<Menu.Item as={Link} to="/">
				<Icon name='fighter jet' size='massive'/>
				AeroH
			</Menu.Item>
			<Menu.Item>
				Welcome {name}!
			</Menu.Item>
			<Menu.Item as={Link} to="/users/upload/" >
				Upload
			</Menu.Item>
			<Divider horizontal></Divider>
			<Menu.Item as={Link} to="/">
				Main
			</Menu.Item>
			<Menu.Item as={Link} to="/manufacturers">
				Manufacturers
			</Menu.Item>
			<Menu.Item as={Link} to="/models">
				Models
			</Menu.Item>
		</Sidebar>
)};

export {
	NavBar as default
};
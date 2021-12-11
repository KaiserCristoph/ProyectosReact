import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { Container, Divider, Icon, Menu, Sidebar } from 'semantic-ui-react'

import "../../styles/sidebar.css"
import { types } from '../../types/types';

const NavBar = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	
	const { name } = useSelector(state => state.auth);
	const [activeItem, setActiveItem] = useState('main')


	const handleItemClick = (e, { name }) => {
		setActiveItem(name)
	};

		const handleLogout = () => {
        
        dispatch({ type: types.logout });

        navigate('/auth/login');
    }

	return (
		<Sidebar

			as={Menu}
			animation='overlay'
			icon='labeled'
			inverted
			vertical
			visible
			width='thin'
		>
			<Menu.Item id="header" as={Link} to="/">
				<Icon name='fighter jet' size='massive' />
				AeroH
			</Menu.Item>
			<Menu.Item>
				Welcome {name}!
			</Menu.Item>
			<Menu.Item name='upload' as={Link} to="/users/upload/" active={activeItem === 'upload'} onClick={handleItemClick}>
				Upload
			</Menu.Item>
			<Divider horizontal></Divider>
			<Menu.Item name='main' as={Link} to="/" active={activeItem === 'main'} onClick={handleItemClick}>
				Main
			</Menu.Item>
			<Menu.Item name='manufacturers' as={Link} to="/manufacturers" active={activeItem === 'manufacturers'} onClick={handleItemClick}>
				Manufacturers
			</Menu.Item>
			<Menu.Item name='models' as={Link} to="/models" active={activeItem === 'models'} onClick={handleItemClick}>
				Models
			</Menu.Item>
			<Menu.Item id="innerSpace">
				<Container >
				</Container>
			</Menu.Item>
			<Menu.Item onClick={handleLogout}>
				Log Out
			</Menu.Item>
		</Sidebar>
	)
};

export {
	NavBar as default
};
import React from 'react';
import { Container, Content, Header, Body, Footer } from 'native-base'
import {
	Text,
	Image,
	ScrollView,
	TouchableWithoutFeedback 
} from 'react-native';
import DrawerNavigationMenu from '../Utils/DrawerNavigationMenu';
import { dashboardStyles } from './Styles';

export default class MenuDrawer extends React.Component {
	constructor(props) {
        super(props);
	};
		
	componentDidMount() {
		this.props.navigation.navigate('Workorders');
	};
	render() {
		const {navigate} = this.props.navigation;
		const {navigation} = this.props;
		return(
			<TouchableWithoutFeedback onPress={() => navigation.closeDrawer()}>
			<Container>
				<Header style={dashboardStyles.drawerHeader}>
				<Body style={dashboardStyles.drawerHeader}>
					<Image
					style={dashboardStyles.drawerImage}
					source={require('../../images/home.png')} />
				</Body>
				</Header>
				<ScrollView style={dashboardStyles.menuScrollView}>
				<Content>
					<DrawerNavigationMenu imgSource = {require('../../images/home.png')}
						text = {'Workorders'} isDisabled = {false} isSelected = {this.props.SelectedScreen}
						onLabelClicked = {() => navigate('Workorders')}
					/>
					<DrawerNavigationMenu imgSource = {require('../../images/settings.png')}
						text = {'Settings'} isDisabled = {true} isSelected = {this.props.SelectedScreen}
						onLabelClicked = {() => navigate('Settings')}
					/>
					<DrawerNavigationMenu imgSource = {require('../../images/home.png')}
						text = {'Logout'} isDisabled = {false} isSelected = {this.props.SelectedScreen}
						onLabelClicked = {() => navigate('Logout')}
					/>			
				</Content>
				</ScrollView>
				<Footer style={dashboardStyles.footer}>
					<Text style={dashboardStyles.description}>Copyright license</Text>
					<Text style={dashboardStyles.version}>1.0</Text>
				</Footer>
			</Container>
			
			</TouchableWithoutFeedback>
		)
	}
}
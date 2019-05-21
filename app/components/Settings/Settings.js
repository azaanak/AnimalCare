import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image
} from "react-native";

import { Container, Content, Icon, Button, Footer } from 'native-base';
import CustomHeader from '../Utils/CustomHeader';

class Settings extends Component {
    render() {
        return (
            <Container>
                <CustomHeader navigation={this.props.navigation}
                    title="Settings"
                    drawerOpen={() => this.props.navigation.navigate("DrawerOpen")}
                />
                <Content contentContainerStyle={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 10 }}>
                
                </Content>
                <Footer>
                <Button
                        full
                        onPress={() => this.props.navigation.navigate('Workorders')}>
                        <Text style={{ color: 'white' }}>Go to Workorders screen</Text>
                    </Button>
                </Footer>
            </Container>
        )
    }
}

export default Settings

const styles = StyleSheet.create({
    icon: {
        height: 24,
        width: 24
    }
})
import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
import CultivationListPage from "../pages/CultivationListPage";
import React, {Component} from "react";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import FieldListPage from "../pages/FieldListPage";
import LoginComponent from "../components/LoginComponent";
import {useSelector} from "react-redux";
import CultivationFormPage from "../pages/CultivationFormPage";
import CultivationDetailComponent from "../components/CultivationDetailComponent";
import CultivActionsHistoryComponent from "../components/CultivActionsHistoryComponent";

const RootStackNavigator = createStackNavigator();
const MaterialTopTabNavigator = createMaterialTopTabNavigator();
export default class RootNavigator extends Component {
    constructor(props) {
        super(props);
        this.login = false;
        //costruttore chiamato prima che venga renderizzato il component
    }

    render(){
    let logged = true;
    //if(this.login)logged =this.login;

        const createHomeTabNavigation = () =>(
            <MaterialTopTabNavigator.Navigator
                name = "Cultivations"
                initialRouteName="Cultivations"
                tabBarOptions={{
                    activeTintColor: 'green',
                    indicatorStyle: {
                        backgroundColor: 'green',
                    },
                }}>
                <MaterialTopTabNavigator.Screen
                    name= "Cultivations"
                    component = {CultivationListPage}
                    options = {{
                        tabBarLabel: 'Cultivations',
                    }}
                />
                <MaterialTopTabNavigator.Screen
                    name ="Fields"
                    component = {FieldListPage}
                    options = {{
                        tabBarLabel: 'Fields',
                    }}
                />
            </MaterialTopTabNavigator.Navigator>
        );

        const createCultivationTabNavigation = () =>(
            <MaterialTopTabNavigator.Navigator
                name = "Cultivation Detail"
                initialRouteName="Detail"
                tabBarOptions={{
                    activeTintColor: 'green',
                    indicatorStyle: {
                        backgroundColor: 'green',
                    },
                }}>
                <MaterialTopTabNavigator.Screen
                    name= "Cultivation Sum"
                    component = {CultivationDetailComponent}
                    options = {{
                        tabBarLabel: 'Sum',
                    }}
                />
                <MaterialTopTabNavigator.Screen
                    name ="History"
                    component = {CultivActionsHistoryComponent}
                    options = {{
                        tabBarLabel: 'All',
                    }}
                />
                <MaterialTopTabNavigator.Screen
                    name ="Remedy"
                    component = {CultivActionsHistoryComponent}
                    options = {{
                        tabBarLabel: 'Threat & Remedy',
                    }}
                />

                <MaterialTopTabNavigator.Screen
                    name ="Irrigations"
                    component = {CultivActionsHistoryComponent}
                    options = {{
                        tabBarLabel: 'Water',
                    }}
                />
            </MaterialTopTabNavigator.Navigator>
        );

        const cultivationForm = () => {
            return (<RootStack.Screen
                name="cultivation form"
                component={CultivationFormPage}
            />)
        };




        return (
            <NavigationContainer>
                <RootStackNavigator.Navigator name="home">
                    {!logged && (
                    <RootStackNavigator.Screen name="login" component={LoginComponent} />
                )}
                    {logged && (
                        <RootStackNavigator.Screen name = {'Cultivations'} component = { createHomeTabNavigation }/>
                    )}
                    <RootStackNavigator.Screen name = {'home'} component = { createHomeTabNavigation }/>
                    <RootStackNavigator.Screen name = {'cultivation list'} component = { CultivationListPage }/>
                    <RootStackNavigator.Screen name = {'cultivation'} component = { createCultivationTabNavigation }/>
                    <RootStackNavigator.Screen name = {'cultivation_form'} component = { CultivationFormPage }/>
                </RootStackNavigator.Navigator>
            </NavigationContainer>
        )
    }
}
/*
<NavigationContainer>
                <RootStack.Navigator>
                    <RootStack.Screen name = {'Cultivation List'} component={ CultivationListPage}/>
                    <RootStack.Screen name = {'Field List'} component={ FieldListPage}/>
                </RootStack.Navigator>
            </NavigationContainer>
import React, {Component} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';


import UserLoginPage from '../pages/UserLoginPage';
import CultivationListPage from '../pages/CultivationListPage';
import CultivationDetailComponent from '../components/CultivationDetail';
import FieldListPage from '../pages/FieldListPage';


const StackNavigator = createStackNavigator();
const MaterialTopTabNavigator = createMaterialTopTabNavigator();
export default class RootNavigator extends Component {
    render() {
        const createHomeTopTab = () => (
            <MaterialTopTabNavigator.Navigator
                initialRouteName="cultivation_list"
                tabBarOptions={{
                    activeTintColor: '#694fad',
                    indicatorStyle: {
                        backgroundColor: '#694fad',
                    },
                }}>
                <MaterialTopTabNavigator.Screen
                    name="cultivation_list"
                    component={CultivationListPage}
                    options={{
                        tabBarLabel: 'Cultivations',
                    }}
                />
                <MaterialTopTabNavigator.Screen
                    name="fields"
                    component={FieldListPage}
                    options={{
                        tabBarLabel: 'Fields',
                    }}
                />
            </MaterialTopTabNavigator.Navigator>
        );

        const createCultivationDetailStack = () => (
            <StackNavigator.Navigator
                initialRouteName="main_explore"
                screenOptions={{
                    headerStyle: {
                        backgroundColor: '#694fad',
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        color: '#fff',
                    },
                }}>
                <StackNavigator.Screen
                    name="main_explore"
                    component={createHomeTopTab}
                    options={{
                        title: 'explore',
                    }}
                />
                <StackNavigator.Screen
                    name="cultivation_detail"
                    component={CultivationDetailComponent}
                    options={{
                        title: 'Cultivation',
                    }}
                />

                <StackNavigator.Screen
                    name="cultivation_detail"
                    component={CultivationDetailComponent}
                    options={{
                        title: 'Cultivation',
                    }}
                />
            </StackNavigator.Navigator>
        );

    }
}

 */

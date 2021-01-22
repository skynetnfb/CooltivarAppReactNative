import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
import CultivationListPage from "../pages/CultivationListPage";
import FieldListPage from "../pages/FieldListPage";
import React, {Component} from "react";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import LoginComponent from "../components/LoginComponent";
import CultivationFormPage from "../pages/CultivationFormPage";
import CultivationDetailComponent from "../components/CultivationDetailComponent";
import CultivActionsHistoryComponent from "../components/CultivActionsHistoryComponent";
import CultivActionFormPage from "../pages/CultivActionFormPage";
import FieldDetailComponent from '../components/Field/FieldDetailComponent';
import FieldCultivationHistoryComponent from '../components/Field/FieldCultivationHistoryComponent';
import FieldForm from '../components/Field/FieldForm';
import FieldFormComponent from '../components/Field/FieldFormComponent';

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

        const createCultivationTabNavigation = (props) => {
            return (
                <MaterialTopTabNavigator.Navigator
                    initialRouteName="Cultivation Sum"
                    tabBarOptions={{
                        activeTintColor: 'green',
                        indicatorStyle: {
                            backgroundColor: 'green',
                        },
                    }}
                    initialParams={props}>
                    <MaterialTopTabNavigator.Screen
                        name="Cultivation Sum"
                        component={CultivationDetailComponent}
                        options={{
                            tabBarLabel: 'Sum',
                        }}
                        initialParams={props}
                    />
                    <MaterialTopTabNavigator.Screen
                        name="History"
                        component={CultivActionsHistoryComponent}
                        options={{
                            tabBarLabel: 'All',
                        }}
                        initialParams={props}
                    />
                    <MaterialTopTabNavigator.Screen
                        name="Remedy"
                        component={CultivActionsHistoryComponent}
                        options={{
                            tabBarLabel: 'Threat & Remedy',
                        }}
                        initialParams={props}
                    />

                    <MaterialTopTabNavigator.Screen
                        name="Irrigations"
                        component={CultivActionsHistoryComponent}
                        options={{
                            tabBarLabel: 'Water',
                        }}
                        initialParams={props}
                    />
                </MaterialTopTabNavigator.Navigator>
            );
        };

        const createFieldTabNavigation = (props) =>(
            <MaterialTopTabNavigator.Navigator
                name = "Field Detail?"
                initialRouteName="Detail?"
                tabBarOptions={{
                    activeTintColor: 'green',
                    indicatorStyle: { backgroundColor: 'green' },
                }}>
                <MaterialTopTabNavigator.Screen
                    name ="Detail"
                    component = {FieldDetailComponent}
                    options = {{ tabBarLabel: 'Field detail' }}
                    initialParams={props}
                />
                <MaterialTopTabNavigator.Screen
                    name ="Cultivation History"
                    component = {FieldCultivationHistoryComponent}
                    options = {{ tabBarLabel: 'Cultivation History' }}
                    initialParams={props}
                />
                <MaterialTopTabNavigator.Screen
                    name ="Sandbox"
                    component = {FieldForm}
                    options = {{ tabBarLabel: 'Sandbox' }}
                    initialParams={props}
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
                    <RootStackNavigator.Screen name = {'field list'} component = { FieldListPage }/>
                    <RootStackNavigator.Screen name = {'cultivation'} component = { createCultivationTabNavigation }/>
                    <RootStackNavigator.Screen name = {'field'} component = { createFieldTabNavigation }
                                               initialParams={{ parameterPassedFromRootNavigator: 'zzzzz' }} />
                    <RootStackNavigator.Screen name = {'cultivation_form'} component = { CultivationFormPage }/>
                    <RootStackNavigator.Screen name = {'action form'} component = { CultivActionFormPage }/>
                    <RootStackNavigator.Screen name = {'field_form'} component = { FieldFormComponent }/>
                </RootStackNavigator.Navigator>
            </NavigationContainer>
        )
    }
}


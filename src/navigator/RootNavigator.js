import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
import CultivationListPage from "../pages/CultivationListPage";
import React from "react";
import TabHomeComponent from "../components/TabHomeComponent";

const RootStack = createStackNavigator();
export default function(){
    return (
        <NavigationContainer>
            <RootStack.Navigator>
                <RootStack.Screen name = {'Cultivation List'} component={ CultivationListPage}/>
            </RootStack.Navigator>
        </NavigationContainer>
    )
}
/*
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

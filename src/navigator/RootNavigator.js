import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
//import {createDrawerNavigator} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
//import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

import UserLoginPage from '../pages/UserLoginPage';
import CultivationListPage from '../pages/CultivationListPage';
import CultivationDetailComponent from '../components/CultivationDetail';
import FieldListPage from '../pages/FieldListPage';


const StackNavigator = createStackNavigator();
const MaterialTopTabNavigator = createMaterialTopTabNavigator();
//const BottomTabNavigator = createBottomTabNavigator();
//const DrawerNavigator = createDrawerNavigator();
const MaterialBottomTabNavigator = createMaterialBottomTabNavigator();

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
                    component={CultivationList}
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


        const createSettingsStack = () => (
            <StackNavigator.Navigator
                initialRouteName="settings"
                screenOptions={{
                    headerStyle: {
                        backgroundColor: '#d02860',
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        color: '#fff',
                    },
                }}>
            </StackNavigator.Navigator>
        );

        return (
            <NavigationContainer>
                <MaterialBottomTabNavigator.Navigator
                    initialRouteName="explore"
                    shifting={true}>
                    <MaterialBottomTabNavigator.Screen
                        name="search"
                        component={createSearchStack}
                        options={{
                            tabBarLabel: 'search',
                            tabBarColor: '#1f65ff',
                            tabBarIcon: ({color}) => (
                                <Icon name="ios-search" color={color} size={25} />
                            ),
                        }}
                    />
                    <MaterialBottomTabNavigator.Screen
                        name="explore"
                        component={createExploreStack}
                        options={{
                            tabBarLabel: 'explore',
                            tabBarColor: '#694fad',
                            tabBarIcon: ({color}) => (
                                <Icon name="ios-eye" color={color} size={25} />
                            ),
                        }}
                    />
                    <MaterialBottomTabNavigator.Screen
                        name="collection"
                        component={createCollectionStack}
                        options={{
                            tabBarLabel: 'collection',
                            tabBarColor: '#009387',
                            tabBarIcon: ({color}) => (
                                <Icon name="ios-person" color={color} size={25} />
                            ),
                        }}
                    />
                    <MaterialBottomTabNavigator.Screen
                        name="settings"
                        component={createSettingsStack}
                        options={{
                            tabBarLabel: 'settings',
                            tabBarColor: '#d02860',
                            tabBarIcon: ({color}) => (
                                <Icon name="ios-settings" color={color} size={25} />
                            ),
                        }}
                    />
                </MaterialBottomTabNavigator.Navigator>
            </NavigationContainer>
        );
    }
}

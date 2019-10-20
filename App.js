/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import {createStackNavigator, createAppContainer} from 'react-navigation';

import Splash from "./src/components/Game/Splash";
import Game from "./src/components/Game";
import MotivationScreen from "./src/components/Game/MotivationScreen";
import StoreScreen from "./src/components/Game/StoreScreen";
import PlayGame from "./src/components/Game/PlayGame";
import LevelScreen from "./src/components/Game/LevelScreen";
import Loading from "./src/components/Game/Loading";

const MainNavigator = createStackNavigator({
  Home: { screen: Splash },
  HomePage: { screen: Game },
  Motivation: { screen: MotivationScreen },
  Store: { screen: StoreScreen },
  Game: { screen: PlayGame },
  LevelScreen: { screen: LevelScreen },
  Loading: { screen: Loading }
});

export default createAppContainer(MainNavigator);

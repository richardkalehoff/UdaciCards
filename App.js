console.ignoredYellowBox = ['Remote debugger']

import React, { Component } from 'react'
import { StyleSheet, Text, View, StatusBar, Platform } from 'react-native'
import { TabNavigator, StackNavigator } from 'react-navigation'
import { Constants } from 'expo'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { setLocalNotification } from './utils/helpers'
import DeckList from './components/DeckList'
import NewDeck from './components/NewDeck'
import Deck from './components/Deck'
import AddCard from './components/AddCard'
import Quiz from './components/Quiz'

function UdaciStatusBar ({backgroundColor, ...props}) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

const Tabs = TabNavigator({
  DeckList: {
    screen: DeckList,
    navigationOptions: {
      tabBarLabel: 'Decks',
      tabBarIcon: ({ tintColor }) => <MaterialCommunityIcons name='cards' size={30} color={tintColor} />
    },
  },
  NewDeck: {
    screen: NewDeck,
    navigationOptions: {
      tabBarLabel: 'New Deck',
      tabBarIcon: ({ tintColor }) => <MaterialCommunityIcons name='plus' size={30} color={tintColor} />
    },
  }
}, {
  navigationOptions: {
    header: null
  },
  tabBarOptions: {
    activeTintColor: Platform.OS === 'ios' ? '#FFF' : '#000',
    style: {
      height: 56,
      backgroundColor: Platform.OS === 'ios' ? '#000' : '#FFF',
      shadowColor: 'rgba(0, 0, 0, 0.24)',
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 6,
      shadowOpacity: 1
    }
  }
})

const MainNavigator = StackNavigator({
  Home: {
    screen: Tabs,
  },
  Deck: {
    screen: Deck,

  },
  AddCard: {
    screen: AddCard,
  },
  Quiz: {
    screen: Quiz,
  }
}, {
  navigationOptions: {
    headerTintColor: '#fff',
    headerStyle: {
      backgroundColor: '#000',
    }
  }
})

export default class App extends Component {
  componentDidMount () {
    setLocalNotification()
  }
  render() {
    return (
      <View style={{flex: 1}}>
        <UdaciStatusBar backgroundColor={'#000'} barStyle='light-content' />
        <MainNavigator />
      </View>
    )
  }
}


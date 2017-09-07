import React, { Component } from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import { NavigationActions } from 'react-navigation'
import { saveDeckTitle } from '../utils/api'

class NewDeck extends Component {
  state = {
    title: '',
  }
  handlePress = () => {
    const { title } = this.state
    saveDeckTitle(title)
      .then(() => {
        this.props.navigation.dispatch(NavigationActions.reset({
          index: 1,
          actions: [
            NavigationActions.navigate({ routeName: 'Home'}),
            NavigationActions.navigate({ routeName: 'Deck', params: {id: title}})
          ]
        }))
      })
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.center}>What is the title of your new deck?</Text>
        <TextInput
          style={styles.input}
          onChangeText={(title) => this.setState(() => ({title}))}
          value={this.state.title}
          placeholder='Deck Title'
        />
        <TouchableOpacity style={styles.button} onPress={this.handlePress}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  center: {
    color: '#333',
    fontSize: 50,
    margin: 20,
    marginTop: 50,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#000',
    borderWidth: 1,
    margin: 20,
    padding: 5,
    color: '#000',
    borderRadius: 5,
  },
  button: {
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    backgroundColor: '#000',
    alignSelf: 'center',
    borderRadius: 5,
    margin: 20,
  },
  buttonText :{
    color: '#fff',
    fontSize: 20,
  }
})

export default NewDeck
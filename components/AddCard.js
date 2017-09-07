import React, { Component } from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import { addCardToDeck } from '../utils/api'
import { NavigationActions} from 'react-navigation'

class AddCard extends Component {
  static navigationOptions = () => {
    return {
      title: 'Add Card'
    }
  }
  state = {
    question: null,
    answer: null,
  }
  handleSubmit = () => {
    if (!this.state.question || !this.state.answer) return

    const { id, addCard } = this.props.navigation.state.params

    addCardToDeck(id, this.state)
      .then(() => addCard(this.state))

    this.props.navigation.goBack()
  }
  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          onChangeText={(question) => this.setState(() => ({ question }))}
          value={this.state.question}
          placeholder='Question'
        />
        <TextInput
          style={styles.input}
          onChangeText={(answer) => this.setState(() => ({ answer }))}
          value={this.state.answer}
          placeholder='Answer'
        />
        <TouchableOpacity style={styles.button} onPress={this.handleSubmit}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
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

export default AddCard
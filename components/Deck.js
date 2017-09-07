import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { getDeck } from '../utils/api'

class Deck extends Component {
  static navigationOptions = ({ navigation }) => {
    const { id } = navigation.state.params

    return {
      title: id
    }
  }
  state = {
    deck: null,
  }
  componentDidMount() {
    const { id } = this.props.navigation.state.params

    getDeck(id).then((deck) => this.setState(() => ({
      deck
    })))
  }
  addCard = (card) => {
    const { deck } = this.state
    const { navigation } = this.props

    this.setState(() => ({
      deck: {
        ...deck,
        questions: deck.questions.concat(card),
      }
    }))

    navigation.state.params.fetchDecks && navigation.state.params.fetchDecks()
  }
  goToAddCard = (id) => {
    this.props.navigation.navigate(
      'AddCard',
      { id, addCard: this.addCard }
    )
  }
  goToQuiz = (id) => {
    if (this.state.deck.questions.length === 0) return

    this.props.navigation.navigate(
      'Quiz',
      { id }
    )
  }
  render() {
    const { id } = this.props.navigation.state.params
    const { deck } = this.state

    if (deck === null) {
      return (
        <Text style={styles.title}>
          Loading...
        </Text>
      )
    }

    const { questions } = deck

    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.title}>{id}</Text>
          <Text style={styles.count}>{questions.length} {questions.length === 1 ? 'card' : 'cards'}</Text>
        </View>
        <View>
          <TouchableOpacity
            onPress={() => this.goToAddCard(id)}
            style={[styles.button, {backgroundColor: '#fff', borderColor: '#000', borderWidth: 1}]}>
              <Text style={[styles.buttonText, {color: '#000'}]}>
                Add Card
              </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.goToQuiz(id)}
            style={[styles.button, {backgroundColor: '#000'}]}>
              <Text style={[styles.buttonText, {color: '#fff'}]}>
                Start Quiz
              </Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'space-around'
  },
  title: {
    fontSize: 50,
    marginTop: 60,
    margin: 20,
    marginBottom: 10,
    textAlign: 'center',
  },
  count: {
    color: '#757575',
    textAlign: 'center',
    fontSize: 30
  },
  button: {
    padding: 15,
    paddingLeft: 30,
    paddingRight: 30,
    backgroundColor: '#000',
    alignSelf: 'center',
    borderRadius: 5,
    margin: 5,
    width: 200,
  },
  buttonText :{
    color: '#fff',
    fontSize: 20,
    textAlign: 'center',
  }
})

export default Deck
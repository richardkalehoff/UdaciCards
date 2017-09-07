import React, { Component } from 'react'
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import { getDecks } from '../utils/api'
import { toArray } from '../utils/helpers'

class DeckList extends Component {
  state = {
    decks: null
  }
  componentDidMount() {
    this.fetchDecks()
  }
  fetchDecks = () => {
    getDecks()
      .then(toArray)
      .then((decks) => this.setState(() => ({
        decks
      })))
  }
  handlePress = (title) => {
    this.props.navigation.navigate(
      'Deck',
      { id: title, fetchDecks: this.fetchDecks }
    )
  }
  render() {
    const { decks } = this.state

    if (decks === null) {
      return (
        <View style={styles.container}>
          <Text style={styles.center}>
            Loading...
          </Text>
        </View>
      )
    }

    if (decks.length === 0) {
      return (
        <View style={styles.container}>
          <Text style={styles.center}>
            You haven't created any decks.
          </Text>
        </View>
      )
    }

    return (
      <ScrollView style={styles.container}>
        {decks.map(({ title, questions }) => (
          <TouchableOpacity style={styles.card} key={title} onPress={() => this.handlePress(title)}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.count}>{questions.length} {questions.length === 1 ? 'card' : 'cards'}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
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
  card: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 50,
    borderBottomColor: '#757575',
    borderBottomWidth: 1,
  },
  title: {
    color: '#333',
    fontSize: 30,
  },
  count: {
    color: '#757575',
    fontSize: 20,
  }
})

export default DeckList
import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { NavigationActions } from 'react-navigation'
import { getDeck } from '../utils/api'

class Quiz extends Component {
  static navigationOptions = () => {
    return {
      title: 'Quiz'
    }
  }
  state = {
    deck: null,
    onQuestion: 0,
    correct: 0,
    showAnswer: false,
  }
  componentDidMount() {
    const { id } = this.props.navigation.state.params

    getDeck(id).then((deck) => this.setState(() => ({
      deck
    })))
  }
  handleCorrect = () => {
    this.setState(({ correct, onQuestion }) => ({
      correct: correct + 1,
      onQuestion: onQuestion + 1,
      showAnswer: false,
    }))
  }
  handleIncorrect = () => {
    this.setState(({ correct, onQuestion }) => ({
      onQuestion: onQuestion + 1,
      showAnswer: false,
    }))
  }
  restart = () => {
    this.props.navigation.goBack()
  }
  toHome = () => {
    this.props.navigation.dispatch(NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: 'Home'})
      ]
    }))
  }
  render() {
    const { deck, onQuestion, correct, showAnswer } = this.state

    if (deck === null) {
      return (
        <Text style={styles.header}>
          Loading...
        </Text>
      )
    }

    if (onQuestion === deck.questions.length) {
      return (
        <View style={[styles.container, { justifyContent: 'space-around' }]}>
          <Text style={[styles.header, {fontSize: 80}]}>
            {Math.floor((correct / deck.questions.length) * 100)}%
          </Text>
          <View>
            <TouchableOpacity
              onPress={this.restart}
              style={[styles.btn, {backgroundColor: '#fff', borderColor: '#000', borderWidth: 1}]}>
                <Text style={[styles.btnText, {color: '#000'}]}>
                  Restart Quiz
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={this.toHome}
              style={[styles.btn, {backgroundColor: '#000'}]}>
                <Text style={styles.btnText}>Home</Text>
            </TouchableOpacity>
          </View>
        </View>
      )
    }

    const question = deck.questions[onQuestion].question
    const answer = deck.questions[onQuestion].answer

    return (
      <View style={styles.container}>
        <Text style={styles.progress}>
          {onQuestion + 1} / {deck.questions.length}
        </Text>
        <View style={{flex: 1, justifyContent: 'space-around'}}>
          <View>
            {showAnswer === true
              ? <Text style={styles.header}>{answer}</Text>
              : <Text style={styles.header}>{question}</Text>}
            <TouchableOpacity onPress={() => this.setState(({ showAnswer }) => ({
              showAnswer: !showAnswer
            }))}>
              <Text style={styles.answerBtn}>
                {showAnswer === true ? 'Question' : 'Answer'}
              </Text>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity
              onPress={this.handleCorrect}
              style={[styles.btn, {backgroundColor: 'green'}]}>
                <Text style={styles.btnText}>Correct</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={this.handleIncorrect}
              style={[styles.btn, {backgroundColor: '#D4271B'}]}>
                <Text style={styles.btnText}>Incorrect</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  progress: {
    padding: 10,
    fontSize: 22,
  },
  header: {
    fontSize: 50,
    marginTop: 60,
    margin: 20,
    marginBottom: 10,
    textAlign: 'center',
  },
  answerBtn: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 20,
    color: '#D4271B',
  },
  btn: {
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    backgroundColor: '#000',
    alignSelf: 'center',
    borderRadius: 5,
    margin: 5,
    width: 200,
  },
  btnText: {
    color: '#fff',
    fontSize: 20,
    textAlign: 'center',
  }
})

export default Quiz
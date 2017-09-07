import { AsyncStorage } from 'react-native'
const DECKS_STORAGE_KEY = 'UdaciCards:DECKS'

export function getDecks () {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then(JSON.parse)
}

export function getDeck (id) {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then(JSON.parse)
    .then((decks) => decks[id] || [])
}

export function saveDeckTitle (title) {
  return getDecks()
    .then((decks) => AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify({
      ...decks,
      [title]: {
        title,
        questions: [],
      }
    })))
}

export function addCardToDeck (title, card) {
  return getDecks()
    .then((decks) => AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify({
      ...decks,
      [title]: {
        ...decks[title],
        questions: decks[title].questions.concat(card)
      }
    })))
}
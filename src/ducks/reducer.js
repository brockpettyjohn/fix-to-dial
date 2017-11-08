// import * as service from './service.js'
import axios from 'axios'


const GET_MESSAGES_BY_CHANNEL = 'GET_MESSAGES_BY_CHANNEL'

const initialState = {
    messages: [],
    channelID: 0,
    channels: []
}

export default function reducer(state = initialState, action) {
    console.log(action)
    switch (action.type) {
        case GET_MESSAGES_BY_CHANNEL + '_FULFILLED':
            return Object.assign({}, state, {messages: action.payload.messages, channelID: action.payload.channelID});
        case GET_MESSAGES_BY_CHANNEL + '_PENDING':
            return Object.assign({}, state);
        case GET_MESSAGES_BY_CHANNEL + '_REJECTED':
            return Object.assign({}, state)
        case GET_MESSAGES_BY_CHANNEL:
            return Object.assign({}, state)

        default:
            return state
    }
}

export function getMessagesByChannel(id) {
   const data =  axios.get('http://localhost:3030/messages/' + id)
    .then(messagesInChannel => {
        console.log(messagesInChannel)
        return {
            messages: messagesInChannel.data,
            channelID: id
    }
      })
    return {
        type: GET_MESSAGES_BY_CHANNEL,
        payload: data
    }
}

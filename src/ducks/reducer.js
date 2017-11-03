import * as service from './service.js'


const GET_MESSAGES_BY_CHANNEL = 'GET_MESSAGES_BY_CHANNEL'

const initialState = {
    messages: [],
    channelID: 0
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_MESSAGES_BY_CHANNEL + '_FULFILLED':
        console.log(action)
            return Object.assign({}, state, { messages: action.payload, channelID: 2 })

        default:
            return state
    }
}

export function getMessagesByChannel(id) {
    console.log(id)
    const messages = service.getMessagesByChannel(id)
    return {
        type: GET_MESSAGES_BY_CHANNEL,
        payload: messages,
        payload2: id
    }
}
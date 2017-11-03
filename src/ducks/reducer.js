import * as service from './service.js'


const GET_MESSAGES_BY_CHANNEL = 'GET_MESSAGES_BY_CHANNEL'

const initialState = {
    messages: [],
    channelID: 0
}

export default function reducer(state = initialState, action) {
    console.log(action)
    switch (action.type) {
        case GET_MESSAGES_BY_CHANNEL + '_FULFILLED':
        console.log(action.payload)
            return Object.assign({}, state, { messages: action.payload })

        default:
            return state
    }
}

export function getMessagesByChannel(id) {
    const messages = service.getMessagesByChannel(id)
    // const data = {
    //     messages: messages,
    //     channelID: id
    // }
    return {
        type: GET_MESSAGES_BY_CHANNEL,
        payload: messages
        // payload: data
    }
}
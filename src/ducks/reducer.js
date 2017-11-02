import * as service from './service.js'
import axios from 'axios'

const GET_MESSAGES_BY_CHANNEL = 'GET_MESSAGES_BY_CHANNEL'

const initialState = {
    messages: []
}


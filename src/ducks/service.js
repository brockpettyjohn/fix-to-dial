import axios from 'axios'

export const getMessagesByChannel = (id) => {
    
    return axios.get('http://localhost:3030/messages/' + id)
    .then(messagesInChannel => {
        return messagesInChannel.data
      })
}
import React, { Component } from 'react';
import AddMessage from './Message_Bar.jsx';
import MessageHeader from './Message_Header.jsx';
import MessageDisplay from './Message_Display.jsx';
import HeaderSearchBlock from './Header_Search_Block.jsx';
import axios from 'axios';
import io from 'socket.io-client'
import Slack1 from './../slack-1.svg'
import { connect } from 'react-redux'
import { scrollToElement } from 'scroll-to-element'
import ReactDOM from 'react-dom'
// import env from '../.env'

const socket = io('http://localhost:3030')
class MainMessageView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: [],
    }

    this.createMessage = this.createMessage.bind(this);
    this.handleUserConnected = this.handleUserConnected.bind(this)
    this.handleChatMessage = this.handleChatMessage.bind(this)
    this.getMessages = this.getMessages.bind(this)
  }

  componentDidMount() {
    if (!this.state.user) {
      // const input = prompt('sockets are working')
      // const user = (input)
      const user = "Brock Pettyjohn"
      this.setState({
        user
      })
      if (!this.state.messages.length) this.getMessages();
    }
    socket.emit('user_connected', this.state.user)
    this.handleUserConnected()
    this.handleChatMessage()

    socket.on('error', data => {
      console.log('this error happened', data)
    })
  }

  handleUserConnected() {
    socket.on('user_connected', data => {
      console.log('this user connected', data)
    })
  }

  handleChatMessage() {
    socket.on('chat_message', data => {
      console.log('fired', data)
      const messages = this.state.messages.concat([data])
      this.setState({
        messages
      })
    })
  }
  //creatMessage is being passed as prop into AddMessages which is later being used in the Message bar jsx
  createMessage(messageText) {
    socket.emit('chat_message', { message_body: messageText, sender_id: this.state.user, conversation_id: this.props.channelID })
  }

  scrollToBottom() {
    var myDiv = document.getElementById("test");
    myDiv.scrollTop = myDiv.scrollHeight;

  }

  getMessages() {
    if (!this.props.match) {
      axios.get('http://localhost:3030/messages')
        .then(resp => {
          console.log(resp.data)
          this.setState({
            messages: resp.data,
          })
          console.log(this.state.messages)
        })
        .catch(err => {
          console.log('why no messages ? ', err.message)
        })
    } else {
      axios.get('http://localhost:3030/messages')
        .then(resp => {
          console.log(resp.data)
          this.setState({
            messages: resp.data,
          })
          console.log(this.state.messages)
        })
        .catch(err => {
          console.log('why no messages ? ', err.message)
        })
    }
  }



  render() {
    // const message = this.state.messages.filter(message => message)
    const message = !this.props.messages ? null : this.props.messages.filter(message => message)
      .map((message, index) => (
        <div className='message-output' key={index}>
          <div className='message-image'>
            <img alt="" src={Slack1} />
          </div>
          <div className='message-words'>
            <div id='sender'>{message.sender_id}</div>
            <div id='message'>{message.message_body}</div>
          </div>
        </div>
      ));


    return (
      <div className='main-message-view'>
        <div className='message-header'>
          <MessageHeader />
          <HeaderSearchBlock />
        </div>
        <MessageDisplay />
        <div id='incoming-messages'>
          {message}
        </div>


        <div className='message-footer'>
          <AddMessage createMessage={this.createMessage} />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    messages: state.messages,
    channelID: state.channelID
  }
}

export default connect(mapStateToProps)(MainMessageView);
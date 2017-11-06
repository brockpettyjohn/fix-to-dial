import React, { Component } from "react";
import { getMessagesByChannel } from '../ducks/reducer.js'
import { connect } from 'react-redux'

 class AddMessage extends Component {
    constructor() {
        super();

        this.state = { input: "" }
        this.handleKeyPress = this.handleKeyPress.bind(this)
    }

    handleInputChange( event ) {
        this.setState( { input: event.target.value });
    }

    handleKeyPress() {
        //the createMessage function from App is being used from the AddMessage component via props
        this.props.createMessage( this.state.input );//<---is coming from the the state set above in the this.state = { input: ""}
        this.props.getMessagesByChannel(this.props.channelID)
    
        this.setState({
            input: ''
        })
    }

    render() {
        console.log( this.props );
        return (
            
            <div className='add-message'>
                <i className="fa fa-plus" aria-hidden="true"></i>
                <input className='message-input'
                    onChange={ ( event ) => this.handleInputChange( event )}
                    type='text'
                    value={ this.state.input }
                    onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                            this.handleKeyPress();
                            }
                        }
                    }
                />
                <i className="fa fa-smile-o" aria-hidden="true"></i>
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

export default connect(mapStateToProps, { getMessagesByChannel })(AddMessage);

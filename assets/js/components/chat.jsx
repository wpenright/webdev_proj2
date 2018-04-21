import React from 'react'
import { connect } from 'react-redux'
import socket from './../socket'

class Chat extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.props = props;
    this.channel = socket.channel("movie:" + props.api_id, {});
    this.init_channel();
  }

  init_channel() {
    this.channel.join()
      .receive("ok", resp => this.props.addMessages(resp.chat))
      .receive("error", resp => { console.log("Unable to join", resp) });
    this.channel.on("response", (resp) => {
      this.props.addMessages([resp.response]);
    });
  }

  send(ev) {
    if (ev.key === "Enter") {
      ev.preventDefault();
      let message = {
        api_id: this.props.api_id,
        user: this.props.user,
        message: ev.target.value,
      };
      this.channel.push("chat", message);
      $(ev.target).val('');
    }
  }

  render() {
    return (
      <div style={{overflowY: "scroll", height: "50ex"}}>
        {_.map(this.props.messages, (mm, ii) => <p key={ii}>{mm.user}: {mm.message}</p>)}
        <form>
          <input type="text" onKeyDown={this.send.bind(this)}/> 
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    messages: state.messages,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addMessages(messages) { 
      dispatch({
        type: 'NEW_MESSAGE',
        data: messages,
      })
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat);

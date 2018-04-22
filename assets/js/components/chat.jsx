import React from 'react'
import { Button } from 'reactstrap'
import { connect } from 'react-redux'
import socket from './../socket'

class Chat extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.props = props;
    this.channel = socket.channel("movie:" + props.movie.api_id, {});
    this.init_channel();
  }

  init_channel() {
    this.channel.join()
      .receive("ok", resp => {
        this.props.setMessages(resp.chat);
        $("#scroll").scrollTop($("#scroll")[0].scrollHeight);
      })
      .receive("error", resp => { 
        console.log("Unable to join", resp) 
      });
    this.channel.on("response", (resp) => {
      this.props.addMessages([resp.response]);
      $("#scroll").scrollTop($("#scroll")[0].scrollHeight);
    });
  }

  send(ev) {
    if (ev.key === "Enter") {
      ev.preventDefault();
      let message = {
        api_id: this.props.movie.api_id,
        user: this.props.user,
        message: ev.target.value,
      };
      this.channel.push("chat", message);
      $(ev.target).val('');
    }
  }

  minimize(ev) {
    chat = $("#chat")[0];
    console.log("BOTTOM", $(chat).css("bottom"));
    if ($(chat).css("bottom") == "0px") {
      $(chat).css("bottom", "-45ex");
    } else {
      $(chat).css("bottom", "0ex");
    }
  }

  render() {
    let chatStyle = {
      width: "35ex",
      right: "20ex",
      bottom: "0ex",
      position: "fixed",
      background: "white",
      border: "1px solid black",
    };
    let scrollStyle = {
      overflowY: "auto",
      height: "40ex",
    };
    return (
      <div id="chat" className="col-12" style={chatStyle}>
        <div className="row">
          <div className="col-10">Chat about {this.props.movie.title}</div>
          <Button className="col-2" onClick={this.minimize}>_</Button>
        </div>
        <div className="row">
          <div id="scroll" className="col-12" style={scrollStyle}>
            {_.map(this.props.messages, (mm, ii) => <p key={ii}>{mm.user}: {mm.message}</p>)}
          </div>
        </div>
        <form className="row">
          <input className="col-12" type="text" onKeyDown={this.send.bind(this)}/> 
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
    setMessages(messages) {
      dispatch({
        type: 'SET_MESSAGES',
        data: messages,
      })
    },
    addMessages(messages) { 
      dispatch({
        type: 'NEW_MESSAGE',
        data: messages,
      })
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat);

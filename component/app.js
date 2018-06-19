import React from "react";
import Self from "./self";

class App extends React.Component {

  constructor(props) {

    super(props);

    this.state = {
      name: window.localStorage.getItem('name')
    };

    this.self = <Self peerId={this.props.peerId} />;
  }

  handleName(event) {

    const value = document.getElementById('nameInput').value;
    event.preventDefault();
    this.setState({ name: value });
    this.self._self.setState({ nameSet: true });
    window.localStorage.setItem('name', value);
  }

  handleClear() {

    this.props.peerId.clearStorage();
    window.location.reload();
  }

  render() {
    return (
      <div className="component-app">
        <button onClick={this.handleClear.bind(this)}>Clear All</button>
        <Self peerId={this.props.peerId} name={this.state.name} />
        {
          /*
          (this.state.name === null) ?
          <form onSubmit={this.handleName.bind(this)}>
            <label>Name <input type="text" id="nameInput" placeholder="Display Name" /></label>
          </form>
          :
          <span>{this.state.name}</span>

        */
        }
      </div>
    );
  }


}

export default App;

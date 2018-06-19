import React from "react";

class Self extends React.Component {

  constructor(props) {

    super(props);

    this.state = {
      keyGenerated: false,
      keyLoaded: false,
      nameSet: false,
      attestSent: window.localStorage.getItem('attestSent') || false,
      attestReceived: false,
      did: {},
      userInfo: null,
      url: null,
      name: null,
      attestation: null,
      serverKeyReceived: false,
      checkSelfAttestation: false,
      selfVerified: false
    };

    this.props.peerId.handleState(this.handlePIState.bind(this));

	(async () => {
      const res = await fetch('http://localhost:8001/jwk');
      const jwk = await res.json();
      await this.props.peerId.setPeer('server', jwk);
      this.setState({ serverKeyReceived: true });
	})();

    (async () => {
      if (this.state.attestSent && !this.attestReceived) {
        const res = await fetch('http://localhost:8001/user');
        const userInfo = await res.json();
        console.log(userInfo);
        this.setState({ userInfo });
        const res2 = await fetch(
        `http://localhost:8001/proof/${this.state.userInfo.id}/${this.props.peerId.session.id}`
        );
        const attestation = await res2.json();
        console.log(attestation);
        this.setState({ attestation });
      }
    })();
  }

  componentWillUpdate(props, state) {

    if (!state.selfVerified && !state.checkSelfAttestation && state.serverKeyReceived && state.attestation !== null) {

      this.props.peerId.verify(state.attestation.proof, 'server', state.attestation.signature).then((validated) => {
        console.log('validated', validated);
        this.setState({ selfVerified: validated.verified });
        this.setState({ checkSelfAttestation: true });
      });
    }
  }

  handlePIState(state, value) {

    if (state === 'loadedKeyPair') {
      this.setState({ 'keyLoaded': value });
    } else if (state === 'generatedKeyPair') {
      this.setState({ keyGenerated: value });
    }
  }

  async handleAttest() {

    const { proof, did } = await this.props.peerId.exportProof();
    this.setState({ url: `http://localhost:8001/pltest@test.com/${did.id}` });
    console.log('proof', proof);
    window.localStorage.setItem('attestSent', true);
    window.location = 'http://localhost:8001/sign2?proof=' + proof + '&next=' + encodeURI('http://localhost:1234');
  }

  // ✔  ✗
  render() {
    return (
      <div className="component-self">
        <ul>
        {
          (this.state.keyLoaded) ?
            <li>Loaded key-pair ... ✔</li> :
            ''
        }
        {
          (this.state.keyGenerated) ?
            <li>Generated key-pair ... ✔</li> :
            ''
        }
        {
          (this.state.attestSent) ?
        <li>Attestation requested ... ✔</li> :
        <li><button onClick={this.handleAttest.bind(this)}>Attest</button></li>
          }
        {
          (this.state.userInfo !== null) ?
            <li>Name: {this.state.userInfo.name}</li> :
            ''
        }
        {
          (this.state.attestation) ?
            <li>Attestation ... ✔</li> :
            ''
        }
        {
          (this.state.checkSelfAttestation && this.state.selfVerified ) ?
            <li>Verified Server Attestation ... ✔</li> :
            <li>Verified Server Attestation ... ✗ </li>

        }
        </ul>
      </div>
    );
  }
}

export default Self;

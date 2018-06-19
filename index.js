const PeerIdentity = require('peer-identity');
import React from "react";
import ReactDOM from "react-dom";
import App from "./component/app";

const peerId = new PeerIdentity();
const appComponent = <App peerId={peerId} />;

ReactDOM.render(appComponent, document.getElementById("root"));


(async function() {

  const loadedId = await peerId.loadOrCreate();

})();



# Peer-Identity Demo

This demonstrates using peer-identity to manage an identity and validate it with an identity provider.

TODO: Validate peers with peer-crdt shared identities.

## Install / Run

Before running this demo, install, update, and run https://github.com/ipfs-shipyard/dapp-identity-api/tree/did-attest (the did-attest branch).

1. Clone the Repo
2. `npm install`
3. `npm start`
4. Load the url listed as a results of `npm start`


## Behind the scenes

1. The client creates or loads the session key pair.
2. The client generates a distributed identity document (DID)
3. The user clicks [Attest]
4. The client redirects to a url on the dapp-identity-api asking for attestation
5. The user must log in and provide their password
6. The dapp-identity-api#did-attest generates a proof and redirects the user back to their app
7. The app reloads, loading it's previous session from localStorage.
9. The app loads the identity of the user from dapp-identity-api.
8. The app checks to see if the attestation exists on the server and retrieves it.
9. The app loads the public key of dapp-identity-api and validates the proof.

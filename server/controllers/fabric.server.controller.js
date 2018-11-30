const Fabric_Client = require('fabric-client');
const Fabric_CA_Client = require('fabric-ca-client');
const path = require('path');
const util = require('util');
const os = require('os');
const FabricUtil = require('../utils/fabric.utils');

const queryTransaction = async function (req, res) {
  const channelName = req.params.channel || FabricUtil.DEFAULT_CHANNEL_NAME;
  const key = rq.params.key || 'a';
  const fabric_client = new Fabric_Client();
  const channel = fabric_client.newChannel(channelName);
  const peer = fabric_client.newPeer(FabricUtil.PEER0_ORG1_URL);
  channel.addPeer(peer);

  let member_user = null;
  const store_path = path.join(__dirname, '../../../fabric-network-setup/crypto-config/peerOrganizations/org1.example.com/peers/peer0.org1.example.com/msp/keystore'); // Need to be corrected.
  const state_store = await Fabric_Client.newDefaultKeyValueStore({
    path: store_path
  });

  fabric_client.setStateStore(state_store);
  const crypto_suite = Fabric_Client.newCryptoSuite();
  const crypto_store = Fabric_Client.newCryptoKeyStore({ path: store_path });
  crypto_suite.setCryptoKeyStore(crypto_store);
  fabric_client.setCryptoSuite(crypto_suite);
  const user_from_store = await fabric_client.getUserContext('user1', true);

  if (user_from_store && user_from_store.isEnrolled()) {
    console.log('Successfully loaded user1 from persistence');
    member_user = user_from_store;
  } else {
    throw new Error('Failed to get user1.... run registerUser.js');
  }

  const request = {
    chaincodeId: 'fabcar',
    fcn: 'queryAllCars',
    args: ['']
  };

  const query_responses = await channel.queryByChaincode(request);
  console.log("Query has completed, checking results");
  if (query_responses && query_responses.length == 1) {
    if (query_responses[0] instanceof Error) {
      console.error("error from query = ", query_responses[0]);
    } else {
      console.log("Response is ", query_responses[0].toString());
    }
  } else {
    console.log("No payloads were returned from query");
  }
};

const enrollAdmin = async function () {
  const fabric_client = new Fabric_Client();
  let fabric_ca_client = null;
  let admin_user = null;
  let member_user = null;

  var store_path = path.join(__dirname, '../../../fabric-network-setup/crypto-config/peerOrganizations/org1.example.com/peers/peer0.org1.example.com/msp/keystore');
  console.log(' Store path:' + store_path);
  const state_store = await Fabric_Client.newDefaultKeyValueStore({
    path: store_path
  });
  fabric_client.setStateStore(state_store);
  var crypto_suite = Fabric_Client.newCryptoSuite();
  var crypto_store = Fabric_Client.newCryptoKeyStore({ path: store_path });
  crypto_suite.setCryptoKeyStore(crypto_store);
  fabric_client.setCryptoSuite(crypto_suite);
  var tlsOptions = {
    trustedRoots: [],
    verify: false
  };
  fabric_ca_client = new Fabric_CA_Client('http://localhost:7054', tlsOptions , 'ca.example.com', crypto_suite);
};

module.exports = {
  queryTransaction,
  enrollAdmin,
  registerUser,
  invokeTransaction
}
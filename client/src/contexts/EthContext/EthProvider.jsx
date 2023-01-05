import React, { useReducer, useCallback, useEffect } from "react";
import Web3 from "web3";
import EthContext from "./EthContext";
import { reducer, actions, initialState } from "./state";

function EthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const init = useCallback(async (artifact) => {
    if (artifact) {
      const web3 = new Web3(Web3.givenProvider);
      const accounts = await web3.eth.requestAccounts();

      const { abi } = artifact;

      let address, contract;
      console.log(abi);
      try {
        address = "0xaa305c77b901a25EfdCDb4fE2c37503dcd42fEC9"; // goerli testnet etherscan
        // address = "0x794C47f223576224D2D76bdd286E281579E5fda9";
        // address = "0x1CB90dc89C1Dc56250f604b9F697BC3091ef4Af7";

        contract = new web3.eth.Contract(abi, address);
        console.log(contract);
      } catch (err) {
        console.error("In Error", err);
      }
      dispatch({
        type: actions.init,
        data: { artifact, web3, accounts, contract },
      });
    }
  }, []);

  useEffect(() => {
    const tryInit = async () => {
      try {
        const artifact = require("./fileShare.json");

        init(artifact);
      } catch (err) {
        console.error(err);
      }
    };

    tryInit();
  }, [init]);

  useEffect(() => {
    const events = ["chainChanged", "accountsChanged"];
    const handleChange = () => {
      init(state.artifact);
    };

    events.forEach((e) => window.ethereum.on(e, handleChange));
    return () => {
      events.forEach((e) => window.ethereum.removeListener(e, handleChange));
    };
  }, [init, state.artifact]);

  return (
    <EthContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </EthContext.Provider>
  );
}

export default EthProvider;

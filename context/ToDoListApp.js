import React, { useState, useEffect } from "react";
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import { toDoListAddress, toDoListABI } from "./constants";

const fetchContract = (signerOrProvider) =>
  new ethers.Contract(toDoListAddress, toDoListABI, signerOrProvider);

export const ToDoListContext = React.createContext();

export const ToDoListProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState("");
  const [error, setError] = useState("");
  const [allToDoList, setAllToDoList] = useState([]);
  const [myList, setMyList] = useState([]);
  const [allAddress, setAllAddress] = useState([]);

  // connect metamask
  const checkIfWalletIsConnected = async () => {
    if (!window.ethereum) return setError("Please set Metamask");
    const account = await window.ethereum.request({ method: "eth_accounts" });
    if (account.length) {
      setCurrentAccount(account[0]);
      console.log(account[0]);
    } else {
      setError("Please install Metamask and reload!");
    }
  };

  // connect wallet
  const connectWallet = async () => {
    if (!window.ethereum) return setError("Please set Metamask");
    const account = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    setCurrentAccount(account[0]);
  };

  // interacting with smart contract
  const toDoList = async (message) => {
    try {
      //CONNECTING SMART CONTRACT
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const contract = await fetchContract(signer);

      const createList = await contract.createList(message);
      createList.wait();
      console.log(createList);
    } catch (error) {
      setError("Error when creating list");
    }
  };

  const getToDoList = async () => {
    try {
      //CONNECTING SMART CONTRACT
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const contract = await fetchContract(signer);
      console.log(contract)

      //GET DATA
      const getAllAddress = await contract.getAddress();
      setAllAddress(getAllAddress);

      getAllAddress.map(async (el) => {
        const getSingleData = await contract.getCreatorData(el);
        allToDoList.push(getSingleData);
      });

      const allMessage = await contract.getMessage();
      setMyList(allMessage);
    } catch (error) {
      setError("Something wrong while getting the data");
    }
  };

  // change state of todolist to false or true
  const change = async (address) => {
    try {
      //CONNECTING SMART CONTRACT
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const contract = await fetchContract(signer);

      const state = await contract.toggle(address);
      state.wait();
      console.log(state);
    } catch (error) {
      setError("Error when changing status.");
    }
  };

  return (
    <ToDoListContext.Provider
      value={{
        checkIfWalletIsConnected,
        connectWallet,
        toDoList,
        getToDoList,
        change,
        currentAccount,
        error,
        allToDoList,
        myList,
        allAddress,
      }}
    >
      {children}
    </ToDoListContext.Provider>
  );
};

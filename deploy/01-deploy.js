
const { getNamedAccounts, deployments, network } = require("hardhat")

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy, log } = deployments
  const { deployer } = await getNamedAccounts()
  log("----------------------------------------------------")
  log("Deploying ToDoList and waiting for confirmations...")
 
  const toDoList = await deploy("ToDoList", {
    from: deployer,
    args: [],
    log: true,
    // we need to wait if on a live network so we can verify properly
    waitConfirmations: 0,
  })
  log(`ToDoList deployed at ${toDoList.address}`)

}

module.exports.tags = ["all", "toDoList"]
# Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a script that deploys that contract.

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat run scripts/deploy.js
```


onst Counter = await ethers.getContractFactory("Counter")
const counter = await Counter.attach("0x5FbDB2315678afecb367f032d93F642f64180aa3")

await counter.getCount()  //0
await counter.addOne()    //1
await counter.addAny(10)  //11


account1: 0x02424bCf139c39163b2E1Be4c95B3C2C9E649b30
account1 private_kay = "209f0cbd2e2590da3238972bb2fbf77dd6cdd1f05eac506440f076b6372c29dd"

# delpoy contract to goerli and quorum
appledeMacBook-Pro:counterDemo kevin$ npx hardhat run scripts/sample-script.js --network goerli
Counter deployed to: 0x425fE414E2915a8bD722ACCF555E6097D1517Ecf

appledeMacBook-Pro:counterDemo kevin$ npx hardhat run scripts/sample-script.js --network quorum
Counter deployed to: 0x32936d2c171c9A40df2fC802949fAd66F4FaAF2D

npx hardhat console --network quorum

const Counter = await ethers.getContractFactory("Counter")
const counter = await Counter.attach("0x32936d2c171c9A40df2fC802949fAd66F4FaAF2D")

const Greeter = await ethers.getContractFactory("Greeter")
const greeter = await Greeter.attach("0x62c810B76066d1f7341DD6BD393C8d4dD82765FE")
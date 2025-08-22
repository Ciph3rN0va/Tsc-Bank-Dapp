TSC Bank - A Full-Stack Dockerized Ethereum DApp
A complete decentralized application that provides a simple banking interface on the Ethereum blockchain. This project includes a Solidity smart contract, a web-based frontend, and a fully containerized development environment using Docker for easy setup and portability.

Features
Dockerized Environment: The entire development stack is encapsulated in Docker containers, ensuring a consistent and hassle-free setup on any machine.

Smart Contract Banking: A secure TSCBank.sol smart contract allows users to deposit, withdraw, and check their Ether balance.

Web3 Frontend: A clean, responsive user interface built with HTML, CSS, and vanilla JavaScript.

MetaMask Integration: Connects seamlessly with the MetaMask browser wallet for user authentication and transaction signing.

Local Blockchain: Utilizes Ganache for a personal, local blockchain instance, perfect for development and testing without real-world costs.

Tech Stack
Blockchain: Solidity, Truffle Suite (Truffle, Ganache)

Frontend: HTML, Tailwind CSS, JavaScript, Web3.js

Environment: Docker, Ubuntu 22.04, Node.js

Editor: VS Code (served via code-server)

Getting Started
Follow these instructions to get the project up and running on your local machine.

Prerequisites
Docker Desktop: Make sure you have Docker Desktop installed and running on your system. Download Docker

Git: Required for cloning the repository. Download Git

Web Browser: A modern web browser like Chrome or Firefox with the MetaMask extension installed.

Installation & Setup
Clone the Repository

git clone https://github.com/Ciph3rN0va/Tsc-Bank-Dapp.git
cd Tsc-Bank-Dapp

Build the Docker Images
This project uses a two-stage build process.

# 1. Build the base image with VS Code and system tools
docker build -t ethereum-dev-base -f Dockerfile.base .

# 2. Build the final DApp environment with Truffle and Ganache
docker build -t ethereum-dapp-env -f Dockerfile.dapp .

Run the Development Container
This command starts the container and maps the necessary ports for VS Code and Ganache.

docker run -it --rm -p 8080:8080 -p 8545:8545 --name tsc-bank-dev ethereum-dapp-env

Note: The terminal will now be occupied by the container's main process. You will interact with the environment through your browser.

Launch the Development Environment

Open your web browser and navigate to http://localhost:8080. You will see a fully functional VS Code editor.

In the VS Code UI, open a new terminal (Terminal > New Terminal).

Start the Local Blockchain
In the new VS Code terminal, start Ganache.

ganache -h 0.0.0.0 &

Keep the list of private keys handy; you'll need one for MetaMask.

Deploy the Smart Contract
In the same terminal, deploy the TSCBank contract.

truffle migrate --reset

Copy the contract address from the output.

Configure the DApp

In the VS Code file explorer, open app.js.

Paste the contract address you just copied into the contractAddress variable.

The contractABI is already included.

Launch the DApp Frontend
Start the web server to serve the DApp.

npx serve

The server will typically be available at http://localhost:3000.

How to Use the DApp
Configure MetaMask

Open MetaMask and add a new custom network with the following details:

Network Name: Ganache Local

New RPC URL: http://127.0.0.1:8545

Chain ID: 1337

Currency Symbol: ETH

Import an account using one of the private keys from the Ganache terminal output.

Connect and Interact

Open a new browser tab and navigate to the DApp URL (e.g., http://localhost:3000).

Click "Connect Wallet" and approve the connection in MetaMask.

You can now deposit and withdraw Ether using the interface. Each transaction will require confirmation in MetaMask.

Project Structure
Tsc-Bank-Dapp/
├── contracts/          # Solidity smart contracts
│   └── TSCBank.sol
├── migrations/         # Truffle deployment scripts
│   └── 2_deploy_contract.js
├── test/               # (Optional) Test files for the contract
├── public/             # Frontend assets
│   ├── index.html      # DApp structure
│   ├── style.css       # Custom styles
│   └── app.js          # DApp logic
├── Dockerfile.base     # Dockerfile for the base environment
├── Dockerfile.dapp     # Dockerfile for the DApp environment
├── truffle-config.js   # Truffle project configuration
└── README.md           # This file

License
This project is licensed under the MIT License. See the LICENSE file for details.

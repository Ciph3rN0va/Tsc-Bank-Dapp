<div align="center">
<br />
<h1>🏦 TSC Bank - A Full-Stack Dockerized Ethereum DApp</h1>
<strong>A complete decentralized application with a containerized development environment for easy setup and portability.</strong>
<br />
<br />

<p align="center">
<a href="https://github.com/Ciph3rN0va/Tsc-Bank-Dapp/blob/main/LICENSE"><img src="https://img.shields.io/badge/License-MIT-blue.svg" alt="License: MIT"></a>
<img src="https://img.shields.io/badge/Solidity-^0.8.19-lightgrey.svg" alt="Solidity">
<img src="https://img.shields.io/badge/Truffle-v5.11.5-green.svg" alt="Truffle">
<img src="https://img.shields.io/badge/Docker-20.10-blue.svg" alt="Docker">
<img src="https://img.shields.io/badge/Node.js-18.x-green.svg" alt="Node.js">
</p>
</div>

<!-- You can add a screenshot of your DApp here! -->

<!--  -->

📖 Table of Contents
About the Project

✨ Features

🛠️ Tech Stack

🚀 Getting Started

Prerequisites

Installation & Setup

Usage

Project Structure

License

🧐 About the Project
This project provides a complete, end-to-end solution for developing and testing Ethereum-based decentralized applications. It solves the common problem of complex environment setup by encapsulating the entire toolchain within Docker. The repository includes a simple banking smart contract and a responsive web interface to demonstrate the full development lifecycle.

✨ Features
🐳 Dockerized Environment: One-command setup for a consistent and portable development environment on any machine.

📄 Smart Contract Banking: A secure TSCBank.sol contract allows users to deposit, withdraw, and check their Ether balance.

💻 Web3 Frontend: A clean and responsive user interface built with HTML, Tailwind CSS, and vanilla JavaScript.

🦊 MetaMask Integration: Connects seamlessly with the MetaMask browser wallet for user authentication and transaction signing.

⛓️ Local Blockchain: Utilizes Ganache for a personal blockchain instance, perfect for rapid development and testing without real-world costs.

🛠️ Tech Stack
Category

Technology

Blockchain

Solidity, Truffle Suite (Truffle, Ganache)

Frontend

HTML, Tailwind CSS, JavaScript, Web3.js

Environment

Docker, Ubuntu 22.04, Node.js

Editor

VS Code (served via code-server)

🚀 Getting Started
Follow these instructions to get the project up and running on your local machine.

Prerequisites
Docker Desktop: Ensure Docker is installed and running. Download Here

Git: Required for cloning the repository. Download Here

Web Browser: A modern browser with the MetaMask extension installed.

Installation & Setup
Clone the Repository

git clone https://github.com/Ciph3rN0va/Tsc-Bank-Dapp.git
cd Tsc-Bank-Dapp

Build the Docker Images
This project uses a two-stage build process for a clean and efficient final image.

# 1. Build the base image with system tools
docker build -t ethereum-dev-base -f Dockerfile.base .

# 2. Build the final DApp environment image
docker build -t ethereum-dapp-env -f Dockerfile.dapp .

Run the Development Container
This command starts the container and maps the necessary ports.

docker run -it --rm -p 8080:8080 -p 8545:8545 --name tsc-bank-dev ethereum-dapp-env

Launch the Dev Environment

Open your browser and go to http://localhost:8080 to access the VS Code editor.

In the VS Code UI, open a new terminal (Terminal > New Terminal).

Start Ganache & Deploy Contract

In the VS Code terminal, start the local blockchain:

ganache -h 0.0.0.0 &

Deploy the smart contract. Copy the contract address from the output.

truffle migrate --reset

Configure and Launch the DApp

In the VS Code file explorer, open app.js and paste the contract address into the contractAddress variable.

Start the frontend server:

npx serve

🖥️ Usage
Configure MetaMask: Add a custom network pointing to your local Ganache instance (http://127.0.0.1:8545, Chain ID 1337) and import an account using a private key from the Ganache output.

Connect and Interact: Navigate to the DApp URL (e.g., http://localhost:3000), connect your wallet, and start depositing and withdrawing Ether.

📁 Project Structure
<details>
<summary>Click to view the folder structure</summary>

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
├── .gitignore          # Files to be ignored by Git
├── truffle-config.js   # Truffle project configuration
└── README.md           # This file

</details>

📜 License
This project is licensed under the MIT License. See the LICENSE file for details.

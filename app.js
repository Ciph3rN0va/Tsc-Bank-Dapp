// --- DApp Configuration ---
// IMPORTANT: Replace this with your contract's address after deployment!
const contractAddress = "0x211F9E6121F3138655497F40cf1Cd2c2c7D20aED";
// IMPORTANT: The correct ABI is now included below.
const contractABI = [
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "account",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "Deposit",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "account",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "Withdrawal",
      "type": "event"
    },
    {
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "deposit",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_amount",
          "type": "uint256"
        }
      ],
      "name": "withdraw",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getBalance",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
];

// --- Global Variables ---
let web3;
let contract;
let userAccount;

// --- DOM Elements ---
const connectButton = document.getElementById('connectButton');
const dappInterface = document.getElementById('dappInterface');
const accountStatus = document.getElementById('accountStatus');
const balanceDisplay = document.getElementById('balanceDisplay');
const refreshBalanceBtn = document.getElementById('refreshBalance');
const depositButton = document.getElementById('depositButton');
const withdrawButton = document.getElementById('withdrawButton');
const depositAmountInput = document.getElementById('depositAmount');
const withdrawAmountInput = document.getElementById('withdrawAmount');
const statusMessage = document.getElementById('statusMessage');
const loader = document.getElementById('loader');

// --- Event Listeners ---
window.addEventListener('load', () => {
    connectButton.addEventListener('click', connectWallet);
    refreshBalanceBtn.addEventListener('click', updateBalance);
    depositButton.addEventListener('click', depositEther);
    withdrawButton.addEventListener('click', withdrawEther);
});


// --- Core Functions ---

async function connectWallet() {
    if (window.ethereum) {
        try {
            web3 = new Web3(window.ethereum);
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            userAccount = accounts[0];
            initializeDApp();
        } catch (error) {
            console.error("User denied account access", error);
            updateStatus("Connection failed. Please approve the request in your wallet.", true);
        }
    } else {
        updateStatus("MetaMask not detected. Please install it to use this DApp.", true);
    }
}

function initializeDApp() {
    connectButton.classList.add('hidden');
    dappInterface.classList.remove('hidden');

    const shortAddress = `${userAccount.substring(0, 6)}...${userAccount.substring(userAccount.length - 4)}`;
    accountStatus.textContent = `Connected: ${shortAddress}`;

    contract = new web3.eth.Contract(contractABI, contractAddress);
    updateBalance();

    window.ethereum.on('accountsChanged', (accounts) => {
        if (accounts.length > 0) {
            userAccount = accounts[0];
            const newShortAddress = `${userAccount.substring(0, 6)}...${userAccount.substring(userAccount.length - 4)}`;
            accountStatus.textContent = `Connected: ${newShortAddress}`;
            updateBalance();
        } else {
            // Handle wallet disconnection
            connectButton.classList.remove('hidden');
            dappInterface.classList.add('hidden');
            accountStatus.textContent = 'Please connect your wallet.';
        }
    });
}

async function updateBalance() {
    if (!contract || !contract.methods.getBalance) {
        updateStatus("Contract not initialized correctly. Check ABI.", true);
        return;
    };
    try {
        showLoader(true);
        updateStatus("Refreshing balance...");
        const balanceWei = await contract.methods.getBalance().call({ from: userAccount });
        const balanceEth = web3.utils.fromWei(balanceWei, 'ether');
        balanceDisplay.textContent = parseFloat(balanceEth).toFixed(4);
        updateStatus("Balance updated successfully.", false);
    } catch (error) {
        console.error("Error fetching balance:", error);
        updateStatus("Error fetching balance.", true);
    } finally {
        showLoader(false);
    }
}

async function depositEther() {
    const amount = depositAmountInput.value;
    if (!amount || isNaN(amount) || amount <= 0) {
        updateStatus("Please enter a valid amount to deposit.", true);
        return;
    }

    setButtonsDisabled(true);
    showLoader(true);
    try {
        updateStatus("Processing deposit... Please confirm in MetaMask.");
        const amountWei = web3.utils.toWei(amount, 'ether');
        await contract.methods.deposit().send({ from: userAccount, value: amountWei });
        updateStatus("Deposit successful! Updating balance...", false);
        depositAmountInput.value = "";
        await updateBalance();
    } catch (error) {
        console.error("Deposit failed:", error);
        updateStatus("Deposit failed. Transaction was rejected.", true);
    } finally {
        setButtonsDisabled(false);
        showLoader(false);
    }
}

async function withdrawEther() {
    const amount = withdrawAmountInput.value;
    if (!amount || isNaN(amount) || amount <= 0) {
        updateStatus("Please enter a valid amount to withdraw.", true);
        return;
    }

    setButtonsDisabled(true);
    showLoader(true);
    try {
        updateStatus("Processing withdrawal... Please confirm in MetaMask.");
        const amountWei = web3.utils.toWei(amount, 'ether');
        await contract.methods.withdraw(amountWei).send({ from: userAccount });
        updateStatus("Withdrawal successful! Updating balance...", false);
        withdrawAmountInput.value = "";
        await updateBalance();
    } catch (error) {
        console.error("Withdrawal failed:", error);
        updateStatus("Withdrawal failed. Check your balance or rejected transaction.", true);
    } finally {
        setButtonsDisabled(false);
        showLoader(false);
    }
}

// --- UI Helper Functions ---

function updateStatus(message, isError) {
    statusMessage.textContent = message;
    statusMessage.style.color = isError ? '#f87171' : '#60a5fa'; // red-400 or blue-400
}

function showLoader(visible) {
    loader.style.display = visible ? 'block' : 'none';
}

function setButtonsDisabled(disabled) {
    depositButton.disabled = disabled;
    withdrawButton.disabled = disabled;
}

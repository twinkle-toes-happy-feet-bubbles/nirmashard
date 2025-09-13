```bash
  _   _ _                       ____  _                       _
 | \ | (_)_ __ _ __ ___   __ _/ ___|| |__    __ _        ___/ |
 |  \| | | '__| '_ ` _ \ / _` \___ \| '_ \ / _`  / \/  /  /   |
 | |\  | | |  | | | | | | (_| |___) | | | | (_| |  /  /  /   /
 |_| \_|_|_|  |_| |_| |_|\__,_|____/|_| |_|\__,_|\___|\___|_/

```
 # NirmaShard 8)  
*A MERN-based Bitcoin Tax & Reporting Dashboard*  

---

## Overview  

NirmaShard is a simple crypto-tax helper for Indian users, built with the MERN stack.  
It connects to public Bitcoin & ETH APIs, fetches wallet transactions, and automatically:  

- Calculates taxable events under Indian rules (30% flat tax, no offsets).  
- Summarizes trades, holdings, and taxable income.  
- Provides a clean dashboard with charts and tables for easy reporting.  

!!! Note: Export (PDF/CSV) is not implemented yet, but dashboard analytics and tax summaries are complete.  

---

## Features  

- [x] User Authentication with JWT (sign up, login, protected routes).  
- [x] Fetch Bitcoin transactions via public APIs (e.g., Blockstream, Mempool.space).  
- [x] Auto-categorize transactions: buys, sells, transfers.  
- [x] Compute estimated tax liability (India rules).  
- [x] Interactive dashboard (holdings graph, tax summary table).  
- [ ] Secure backend with Express & MongoDB.  

---

## Tech Stack  

- MongoDB – Store user accounts, wallet addresses, cached transactions.  
- Express.js – Backend API for auth, wallet sync, tax calculations.  
- React.js – Frontend dashboard with charts, login, wallet input.  
- Node.js – Core server runtime.  
- JWT – Secure user authentication.  

---

## Project Structure  

```
NirmaShard/
├── backend/ # Express API + MongoDB models
│ ├── models/ # User, Wallet, Transaction schemas
│ ├── routes/ # Auth, Wallet, Tax routes
│ └── utils/ # BTC API integration + tax logic
├── frontend/ # React dashboard
│ ├── src/components/ # UI components
│ ├── src/pages/ # Auth + Dashboard pages
│ └── src/services/ # API calls
└── README.md
```

---

## Quick Start  

### 1) Backend Setup  
```bash
cd backend
npm install
cp .env.example .env   # add MONGO_URI, JWT_SECRET, BTC_API_URL
npm run dev
```

### 2) Backend Setup  
```bash
cd frontend
npm install
npm start
```
## Screenshot
<img width="1600" height="898" alt="image" src="https://github.com/user-attachments/assets/23979786-f429-44a2-b28c-ee6e8ed340ce" />

### Disclaimer

This tool is for educational purposes only.
It does not provide financial advice. Always consult a professional for tax reporting.


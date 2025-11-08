# Angular + Express Chatbot

A minimal full-stack demo showing how to connect an Angular front-end to an Express + Socket.io backend.  
The backend serves static files, provides live data updates via WebSockets, and reads from a local `positions.json` file.

---
!alt text[](https://ss-1.png)

## 🔧 Project Structure

angular-chatbot/
│
├── client/ # Angular app
│ ├── src/app/ # Components, routes, services
│ ├── angular.json
│ └── package.json
│
├── server/ # Node + Express + Socket.io backend
│ ├── index.js # Main server file
│ ├── positions.json # Example data file
│ ├── public/ # Static files served by Express
│ └── package.json
│
└── README.md


---

## ⚙️ Installation

1. **Clone**
   ```bash
   git clone git@github.com:CasCtrl/angular-chatbot.git
   cd angular-chatbot

2. **Install server packages**
cd server
npm install

3. **Install client packages**
cd ../client
npm install

Running the App

In two terminals:

**Terminal 1 – Server**
cd server
node index.js

Server starts on http://localhost:8081

**Terminal 2 – Client**
cd client
ng serve --port 4200

Client builds on http://localhost:4200

**Socket Events**
| Event Name      | Direction       | Description                     |
| --------------- | --------------- | ------------------------------- |
| `get_positions` | client → server | Requests positions data         |
| `positions`     | server → client | Returns parsed `positions.json` |
| `disconnect`    | both            | Fired when a socket disconnects |

**Server Details (server/index.js)**

Uses Express 5, Socket.io 4, and CORS

Serves static files from /server/public

**Fallback route:**
app.use((_req, res) => {
  res.sendFile(path.join(clientPath, 'index.html'));
});

Runs on port 8081 by default

**Notes**

Compatible with Node 18 – 22

Tested with Angular 17+

If ng serve shows a prerender error, disable SSR or remove "prerender" from angular.json

All communication between Angular and Express happens via Socket.io

**License**

MIT © 2025 Casandra Cain
## Prisma Client Generation & Node Compatibility Issue

### Issue
Encountered repeated Prisma runtime errors when starting the backend server:

Error:
Cannot find module '.prisma/client/default'

Later errors also showed:
Cannot find module '../generated/prisma'

### Root Cause
The project was initially running on Node.js v25 with Prisma v7.

Prisma 7 introduced a newer TypeScript/ESM-based client generation system that generated files like:
- client.ts
- browser.ts
- models.ts

instead of the classic runtime-ready JavaScript Prisma client.

This conflicted with the current backend architecture which uses:
- Express.js
- CommonJS (`require`)
- standard Node.js runtime imports

Additionally, Node.js v25 is a very new runtime version and introduced compatibility instability with parts of the Prisma ecosystem.

### Solution
Resolved the issue by:

1. Downgrading Node.js from v25 → v20 LTS using NVM
2. Reinstalling project dependencies
3. Downgrading Prisma from v7 → v5
4. Switching Prisma generator to:
   generator client {
     provider = "prisma-client-js"
   }
5. Regenerating the Prisma client using:
   npx prisma generate

### Outcome
Backend server and Prisma client initialized successfully using a stable and tutorial-compatible stack:
- Node.js 20 LTS
- Prisma 5
- PostgreSQL
- Express.js (CommonJS)
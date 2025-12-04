backend/
│
├── server.js               (Sirf main setup)
└── src/
    ├── config/
    │   └── db.js           (Database connection)
    ├── models/
    │   ├── User.js
    │   └── Timesheet.js
    └── apps/
        ├── auth/
        │   └── authRoutes.js
        ├── employee/
        │   └── employeeRoutes.js
        └── manager/
            └── managerRoutes.js
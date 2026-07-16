// import { betterAuth } from "better-auth";
// import { MongoClient } from "mongodb";
// import { mongodbAdapter } from "better-auth/adapters/mongodb";
// import { jwt } from "better-auth/plugins/jwt";

// const client = new MongoClient(process.env.MONGODB_URI as string);
// const db = client.db("GadgetsStore");

// export const auth = betterAuth({
//   database: mongodbAdapter(db, {
//     // Optional: if you don't provide a client, database transactions won't be enabled.
//     client
//   }),
//   emailAndPassword: {
//     enabled: true,
//   },
//   user: {
//     additionalFields: {
//       role: {
//         type: "string",
//         defaultValue: "user",
//       }, status: {
//         type: "string",
//         defaultValue: "active", // active, blocked
//       },

//     },
//   },session: {
//     cookieCache: {
//       enabled: true,
//       strategy: "jwt",
//       maxAge: 60 * 24 * 30,
//     },
//   },
//   plugins: [jwt()],
// });

import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { jwt } from "better-auth/plugins/jwt";

const client = new MongoClient(process.env.MONGODB_URI as string);

const db = client.db("GadgetsStore");

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client,
  }),

  // Fix: Invalid origin error
  trustedOrigins: [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    process.env.BETTER_AUTH_URL as string,
  ],

  emailAndPassword: {
    enabled: true,
  },

  user: {
    additionalFields: {
      role: {
        type: "string",
        defaultValue: "user",
      },

      status: {
        type: "string",
        defaultValue: "active",
      },
    },
  },

  session: {
    cookieCache: {
      enabled: true,
      strategy: "jwt",
      maxAge: 60 * 24 * 30,
    },
  },

  plugins: [jwt()],
});

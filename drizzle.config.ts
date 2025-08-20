// import { defineConfig } from "drizzle-kit";

// if (!process.env.DATABASE_URL) {
//   throw new Error("DATABASE_URL, ensure the database is provisioned");
// }

// export default defineConfig({
//   out: "./migrations",
//   schema: "./shared/schema.ts",
//   dialect: "postgresql",
//   dbCredentials: {
//     url: process.env.DATABASE_URL as string,
//   },
// });


import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
 schema: "./shared/schema.ts",   // adjust to your schema path
  out: "./drizzle",
  dbCredentials: {
    url: "postgresql://techinnovator_user:lF4b8MQySXPrXGnJxtQWOluF9X7Fo6px@dpg-d2ie30mmcj7s738dboog-a.oregon-postgres.render.com/techinnovator?sslmode=require",
  },
});

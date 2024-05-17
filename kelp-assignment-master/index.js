const express = require("express");
require("dotenv").config();
const cors = require("cors");
const { PORT } = process.env;

const app = express();

app.use(cors(), express.json());

app.listen(PORT, async () => {
  console.log("server started at port :", PORT);
});

// chat gpt code here
const fs = require("fs");
const readline = require("readline");
const { Client } = require("pg");

const connectionString = process.env.POSTGRES_URI;

function parseCSV(filePath) {
  return new Promise((resolve, reject) => {
    const fileStream = fs.createReadStream(filePath);
    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity,
    });

    const headers = [];
    const records = [];

    rl.on("line", (line) => {
      if (headers.length === 0) {
        headers.push(...line.split(","));
      } else {
        const values = line.split(",");
        const record = {};
        values.forEach((value, index) => {
          const header = headers[index];
          setNestedProperty(record, header, value);
        });
        records.push(record);
      }
    });

    rl.on("close", () => {
      resolve(records);
    });

    rl.on("error", (err) => {
      reject(err);
    });
  });
}

function setNestedProperty(obj, path, value) {
  const keys = path.split(".");
  let current = obj;

  while (keys.length > 1) {
    const key = keys.shift();
    if (!current[key]) {
      current[key] = {};
    }
    current = current[key];
  }

  current[keys[0]] = value;
}

async function insertData(records) {
    console.log(connectionString)
  const client = new Client({
    connectionString,
  });
  await client.connect();

  for (const record of records) {
    const { name, age, address, ...additional_info } = record;
    const fullName = `${name.firstName} ${name.lastName}`;
    const addressJson = JSON.stringify(address);
    const additionalInfoJson = JSON.stringify(additional_info);

    await client.query(
      `INSERT INTO public.users (name, age, address, additional_info) VALUES ($1, $2, $3, $4)`,
      [fullName, age, addressJson, additionalInfoJson]
    );
  }

  await client.end();
}

async function calculateAndPrintAgeDistribution() {
    console.log(connectionString)
  const client = new Client({
    connectionString,
  });
  await client.connect(()=>console.log("closely-generous-tetra-iad.a1.pgedge.io"));
  const res = await client.query("SELECT age FROM public.users");

  const ageGroups = {
    "< 20": 0,
    "20 to 40": 0,
    "40 to 60": 0,
    "> 60": 0,
  };

  res.rows.forEach((row) => {
    const age = row.age;
    if (age < 20) {
      ageGroups["< 20"]++;
    } else if (age <= 40) {
      ageGroups["20 to 40"]++;
    } else if (age <= 60) {
      ageGroups["40 to 60"]++;
    } else {
      ageGroups["> 60"]++;
    }
  });

  const totalUsers = res.rows.length;
  for (const group in ageGroups) {
    const percentage = ((ageGroups[group] / totalUsers) * 100).toFixed(2);
    console.log(`${group}: ${percentage}%`);
  }

  await client.end();
}

async function main() {
  try {
    const records = await parseCSV("./app/resources/rawData.csv");
    await createTableIfNotExists();
    await insertData(records);
    await calculateAndPrintAgeDistribution();
  } catch (error) {
    console.error("Error:", error);
  }
}

async function createTableIfNotExists() {
    const client = new Client({
        connectionString,
    });
    await client.connect();

    const tableExistsQuery = `
        SELECT EXISTS (
            SELECT 1
            FROM information_schema.tables
            WHERE table_schema = 'public'
            AND table_name = 'users'
        );
    `;

    const res = await client.query(tableExistsQuery);

    if (!res.rows[0].exists) {
        const createTableQuery = `
            CREATE TABLE public.users (
                id SERIAL PRIMARY KEY,
                name VARCHAR NOT NULL,
                age INT NOT NULL,
                address JSONB,
                additional_info JSONB
            );
        `;

        await client.query(createTableQuery);
        console.log('Table "public.users" created.');
    } else {
        console.log('Table "public.users" already exists.');
    }

    await client.end();
}

main();

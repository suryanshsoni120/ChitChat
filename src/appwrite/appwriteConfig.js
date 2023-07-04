import { Client, Databases, Account } from "appwrite";

export const PROJECT_ID = process.env.REACT_APP_PROJECT_ID;
export const DATABASE_ID = process.env.REACT_APP_DATABASE_ID;
export const COLLECTION_ID = process.env.REACT_APP_COLLECTION_ID;

const client = new Client();
const databases = new Databases(client);
const account = new Account(client);

client.setEndpoint("https://cloud.appwrite.io/v1").setProject(PROJECT_ID);

const promise = databases.listDocuments(DATABASE_ID, COLLECTION_ID);

promise.then(
  function (response) {
    console.log(response); // Success
  },
  function (error) {
    console.log(error); // Failure
  }
);

export { client, databases, account };

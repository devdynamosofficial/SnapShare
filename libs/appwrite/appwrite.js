import { Client } from 'appwrite';
const client = new Client();

client
  .setEndpoint('https://cloud.appwrite.io/v1')
  .setProject('6484b64f8a8f3fa14c4c');

export default client;
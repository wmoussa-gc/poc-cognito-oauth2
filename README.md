# Proof of Concept: Client Grant Flow + JWT Verification + AWS Cognito

## Create Cognito User Pool

Save the user pool id and the region in your .env file

## Running the Server and the save the client secrets (assymteric keys and metadata)

1. Set your AWS keys.
2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the server:

   ```bash
   node_modules/.bin/nodemon .
   ```

4. In your browser call: http://localhost:3000/api/createAppClient 

5. Save the page/json as client_secret_store.json

## Client Simulator in Node

Run the client test:

```bash
node client_test.js
```

## References

- [Create and Verify JWTs with Node](https://developer.okta.com/blog/2018/11/13/create-and-verify-jwts-with-node)
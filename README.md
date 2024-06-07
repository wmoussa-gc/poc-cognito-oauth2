Here’s an improved version:

# Proof of Concept: Client Grant Flow + JWT Verification + AWS Cognito

## Create an AWS Cognito User Pool

1. Go to [AWS Cognito User Pools](https://ca-central-1.console.aws.amazon.com/cognito/v2/idp/user-pools?region=ca-central-1).

2. Specifics:
   - For machine-to-machine, disable MFA enforcement.
   - Enable the Cognito Hosted UI to obtain a Cognito Domain (necessary for communicating with `/auth2/token`).
   - Create a resource server with the scope `read` and Resource Server Identifier `forms`.

3. Save the User Pool ID, Cognito Domain and the region in your `.env` file.

## Running the Server and Saving Client Secrets (Asymmetric Keys and Metadata)

1. Set your AWS keys.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the server:
   ```bash
   node_modules/.bin/nodemon .
   ```
4. In your browser, call: `http://localhost:3000/api/createAppClient`. This will create the asymmetric keys for signing the JWT and the client ID/secret metadata, which the client will need to store securely.

## Client Simulator in Node

Run the client test:
```bash
node client_test.js
```

## References

- [Create and Verify JWTs with Node](https://developer.okta.com/blog/2018/11/13/create-and-verify-jwts-with-node)
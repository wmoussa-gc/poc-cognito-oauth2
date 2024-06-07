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

![image](https://github.com/wmoussa-gc/poc-cognito-oauth2/assets/70960477/b0915d60-19a1-4a27-91c4-19ff80f40408)


## Client Simulator in Node

Run the client test:
```bash
node client_test.js
```

![image](https://github.com/wmoussa-gc/poc-cognito-oauth2/assets/70960477/f7d9149a-69e7-49e6-90b5-166baf3a3e78)


## References

- [Create and Verify JWTs with Node](https://developer.okta.com/blog/2018/11/13/create-and-verify-jwts-with-node)
- [Node AWS Cognito API Example](https://github.com/luizcalaca/node-aws-cognito-api)
- [YouTube Tutorial on AWS Cognito](https://www.youtube.com/watch?v=XJ9H72IcxbA)
- [RFC 7523: JSON Web Token (JWT) Profile for OAuth 2.0 Client Authentication and Authorization Grants](https://datatracker.ietf.org/doc/html/rfc7523)
- [Protect Public Clients for Amazon Cognito Using an Amazon CloudFront Proxy](https://aws.amazon.com/blogs/security/protect-public-clients-for-amazon-cognito-by-using-an-amazon-cloudfront-proxy/)
- [AWS Cognito Token Endpoint Documentation](https://docs.aws.amazon.com/cognito/latest/developerguide/token-endpoint.html)

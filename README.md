EventSense
==========

Real time event feedback system for event organizers. Created during APIcon 2014's hackathon. The public-facing component is a Twitter feed, which it monitors for mentions. Event organizers can interact with the system using SMS messaging, with a natural language processor translating their texts into machine-understandable requests.

To test out the Twitter features, tweet at [@APIRXR](https://twitter.com/apirxr). If it likes what you say, it'll retweet it. If it doesn't, it'll let you know.

Uses the [Twitter](https://dev.twitter.com/), [Nexmo](https://www.nexmo.com/), and [Wit.AI](https://wit.ai/) APIs.

Authors
-------
- Drew Cuthbertson: [GitHub](https://github.com/syeoryn), [Twitter](https://twitter.com/drewcuth1)
- Andrew Krause: [GitHub](https://github.com/ackrause), [Twitter](https://twitter.com/ackrause)
- Omkar Vedpathak: [GitHub](https://github.com/omkarv), [Twitter](https://twitter.com/ovedpathak)
- Nick Wei: [GitHub](https://github.com/nickwei84), [Twitter](https://twitter.com/nickolaswei)

Branches
--------
- master: full hackathon code (SMS + Twitter)
- demo: modified live demo (Twitter)

Setup
------
Requires the following environment variables for the Node server to run as is:
- PORT: port that server is attached to (defaults to 9000)
- URL: url of server (defaults to http://localhost)
- CONSUMER_KEY: Twitter API consumer key
- CONSUMER_SECRET: Twitter API consumer secret
- ACCESS_TOKEN_KEY: Twitter API access token key
- ACCESS_TOKEN_SECRET: Twitter API access token secret
- NEXMO_KEY: Nexmo API key
- NEXMO_SECRET: Nexmo API secret
- NEXMO_PHONE: Nexmo phone number (phone number you send and recieve texts from when interacting with EventSense)
- TEST_PHONE: Phone number to recieve texts from Nexmo (your personal phone number)
- WITAI_KEY: Wit.AI API key

Once you have all of the environment variables set up, you will have to train Wit.AI to understand your commands. The code is currently expecting the following intents (from Wit.AI's processing of incoming texts):
- eventSummary
- scheduleTweet
with scheduleTweet containing a message_body and possibly datetime.

Otherwise, run `npm install` from the root directory and then `node server.js` to start the node server. For incoming SMS features, server will have to be accessible via a URL other than `localhost`, but other features should work.

Disclaimer
----------
Currently this is hackathon-level code. It works with our deployment and dev environments, but
has not been tested otherwise, and may contain extraneous code. For informational purposes only.


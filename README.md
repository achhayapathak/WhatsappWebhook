# WhatsApp Bot Using WhatsApp Cloud API

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation and Setup](#installation)
- [Contact](#contact)

## Introduction

This is a WhatsApp bot program that integrates with WhatsApp using webhooks. The bot allows you to receive incoming WhatsApp messages, process them, and send automated responses based on the received messages. The program demonstrates how to interact with the WhatsApp API, process incoming webhook events, and send messages using the `axios` library.

## Features

- Receive incoming WhatsApp messages via webhooks.
- Process incoming message data and extract relevant information.
- Send automated responses to users based on the received messages.
- Handle webhook verification to ensure the bot's integration with WhatsApp.


## Installation and Setup

1. Clone this repository to your local machine using the following command:

   ```bash
   git clone https://github.com/your_username/whatsapp-bot-webhook.git
   ```

2. Navigate to project directory and install dependencies

  ```bash
  cd WhatsappWebhook
  npm install
  ```

3. Configure the environment variables:

  - Create .env file.
  - Add TOKEN=<your_token>
  - Add MYTOKEN=<string_used_for_verification>

4. Start the bot server using the following command:

   ```bash
   npm start
   ```

5. Deploy the application on a server and start using it.

## Contact

For any further questions or issues, please contact me at [achhayapathak11@gmail.com](mailto:achhayapathak11@gmail.com).

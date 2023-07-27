# Custom Error Handling, Middleware, and Event Library

This repository contains a custom error handling, middleware, and event library for Node.js applications, designed to simplify error management, authentication handling, and event-driven architecture in your projects.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
  - [Error Classes](#error-classes)
  - [Middlewares](#middlewares)
  - [Publisher and Listener](#publisher-and-listener)
- [Contributing](#contributing)
- [License](#license)

## Installation

To install the library, run:

```
npm install --save @v1nnyc/commons
```

## Usage

Import the error classes, middlewares, and event classes you need from the library.

### Error Classes

The library provides the following custom error classes:

- BadRequestError: For handling bad request errors.
- CustomError: A base class for creating custom errors.
- DatabaseConnectionError: For handling database connection errors.
- NotAuthorizedError: For handling authorization errors.
- NotFoundError: For handling not found errors.
- RequestValidationError: For handling request validation errors.

Example usage:

```js
const { BadRequestError } = require("@v1nnyc/commons");

// Throw a bad request error
throw new BadRequestError("Invalid input");
```

### Middlewares

The library provides the following middlewares:

- currentUser: To get the current user from the JWT token.
- errorHandler: To handle errors in a standardized manner.
- requireAuth: To ensure the user is authenticated before accessing a route.
- validateRequest: To validate incoming requests using provided validation schemas.

Example usage:

```js
const {
  currentUser,
  errorHandler,
  requireAuth,
  validateRequest,
} = require("@v1nnyc/commons");
const express = require("express");
const app = express();

app.use(currentUser());
app.use(errorHandler);
app.get("/protected", requireAuth, (req, res) => {
  res.send("You are authenticated!");
});
app.post("/validate", validateRequest(validationSchema), (req, res) => {
  res.send("Request is valid!");
});
```

### Publisher and Listener

The library includes abstract Publisher and Listener classes for implementing event-driven architecture using Node.js and NATS Streaming.

- Publisher: An abstract class for publishing events.
- Listener: An abstract class for listening to events and processing them.

Example usage:

```js
const { Publisher, Listener } = require("@v1nnyc/commons");
const { Stan } = require("node-nats-streaming");

// Create a NATS Streaming client
const stan = Stan.connect("cluster-id", "client-id", {
  url: "http://localhost:4222",
});

// Extend the Publisher class to create a custom publisher
class MyEventPublisher extends Publisher {
  subject = "my-event";
}

// Extend the Listener class to create a custom listener
class MyEventListener extends Listener {
  subject = "my-event";
  queueGroupName = "my-queue-group";

  onMessage(data, msg) {
    console.log("Message received:", data);
    msg.ack();
  }
}

// Create a publisher and listener instance
const publisher = new MyEventPublisher(stan);
const listener = new MyEventListener(stan);

// Publish an event
publisher.publish({ data: "event-data" });

// Start listening for events
listener.listen();
```

## Contributing

Contributions are welcome. Please submit a pull request or open an issue to discuss your ideas or report bugs.

## License

This library is released under the [ISC License](https://opensource.org/licenses/ISC).

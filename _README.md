# Project Name

>Gather. The place to share your hobbies. If you have a hobby that needs a few friends, try our free service. Start making events today and find new friends who share your interests!

## Team

  - __Product Owner__: Pyschonauts
  - __Development Team Members__: Alexa Welch, Michael LeMaire, Christopher Skladzien

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)
    1. [Installing Dependencies](#installing-dependencies)
    1. [Tasks](#tasks)
1. [Team](#team)
1. [Contributing](#contributing)

## Usage

> Some usage instructions

## Requirements

- Node 8.1x.x
- Postgresql 10.x.x

neccessary database .env configs
```sh
DB_HOST=<URL to database>
DB_USER=<username associated with db>
DB_PASS=<password>
```
.env variables for email mailer (not yet implemented) 
```sh
EMAIL_SENDER=
EMAIL_PASS=
```

## Development
```sh
npm run react-dev
npm run server-dev
```

### Installing Dependencies

From within the root directory:

```sh
npm install
```

### Roadmap

The endpoints for editting and deleting events and comments have been set up on the back end. We envision a delete button appearing on the Events Dashboard that lets a logged in user delete or edit their events.

There is room for an automatically mailer that send out invitations to a specific event or sends email to a specific rsvp event.

Public and Private events. Private events would require invitation or a list of users that are notified.

Notifications for RSVP statuses and amounts for a user's events. 

We envisioned a reply button on each of the comments that would allow a user to attached a comment to a comment 

View the project roadmap [here](https://github.com/psychonauts/Gather/issues)


## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.

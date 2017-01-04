# Trail Angel

> Break new trails and share with your friends.  The holy grail of trail apps.

## Team

  - __Product Owner__: [Andrew Cookro](https://github.com/orgs/hrr20-nebula/people/galaxode)
  - __Scrum Master__: [Wyatt Lindsey](https://github.com/orgs/hrr20-nebula/people/wyattlindsey)
  - __Development Team Members__: [Prithvi Anantharaj](https://github.com/orgs/hrr20-nebula/people/Prithvi-A), [Johanna Tchon](https://github.com/orgs/hrr20-nebula/people/JotheElephant)

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

- Node 0.12.x
- XCode 7.0 or greater

## Development

### Building the project for the iOS simulator

Setting up the database server:

```sh
mysql.server start
mysql -u root -p
```
When prompted for a password, press enter.  In the MySQL command line, enter the command ```create database trailangel; ```.

From within the root directory:

```sh
npm install
nodemon server/server.js
```

From within the client directory:

```sh
npm install
sudo gem install cocoapods
rnpm link react-native-lock
react-native run-ios
```



### Roadmap

View the project roadmap [here](https://trello.com/b/H5WO0MyA/mvp)


## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.

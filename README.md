# Trail Angel

> Break new trails and share with your friends.  The holy grail of trail apps.

| | | | |
| ------------ | ------------ | ------------ |
| ![screenshot1](http://res.cloudinary.com/dayskokep/image/upload/v1485065345/iphone6plus_gold_portrait_scdijp.png) | ![screenshot2](http://res.cloudinary.com/dayskokep/image/upload/v1485065345/iphone6plus_gold_side2_lpnlqw.png) | ![screenshot3](http://res.cloudinary.com/dayskokep/image/upload/v1485065345/iphone6plus_gold_portrait_1_mcgbij.png) |

## Team

  - __Development Team Members__: [Prithvi Anantharaj](https://github.com/orgs/hrr20-nebula/people/Prithvi-A), [Johanna Tchon](https://github.com/orgs/hrr20-nebula/people/JotheElephant), [Wyatt Lindsey](https://github.com/orgs/hrr20-nebula/people/wyattlindsey), [Andrew Cookro](https://github.com/orgs/hrr20-nebula/people/galaxode)

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)
    1. [Installing Dependencies](#installing-dependencies)
    1. [Tasks](#tasks)
1. [Team](#team)
1. [Contributing](#contributing)

## Usage

> Running the application in your iOS simulator requires the dependencies listed below.  After launching the application, explore the Home and Search views to discover trails in your area and around the world.  Use the star icon to add any trail to your Favorites collection.  Press the yellow map icon where available to launch an interactive path creation utility, complete with distance, elevation gain and hike time estimates.

## Requirements

- Node 6.x
- XCode 7.0 or greater
- Ruby 2.0.0
- CocoaPods 1.x
- MySQL
- Redis

Go through React-Native Getting Started Instructions [here](https://facebook.github.io/react-native/docs/getting-started.html)

## Development

### Building the project for the iOS simulator

Setting up MySQL database server:

```sh
mysql.server start
mysql -u root -p
```
When prompted for a password, press enter.  In the MySQL command line, enter the command ```create database trailangel; ```.

Setting up Redis database server:

Download Redis stable version and follow instructions under installation [here](https://redis.io/download)

From within the client directory:

```sh
npm install
sudo gem install cocoapods
react-native link
react-native unlink react-native-maps
cd ios
pod install
cd ..
```

From within the root directory:

```sh
npm install
npm start
```

To run backend and frontend tests
```sh
npm test
```

### Roadmap

View the project roadmap [here](https://wireframepro.mockflow.com/view/Dd1fbd2768b3b14ee38b89e8f11f05f90)


## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.
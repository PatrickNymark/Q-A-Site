# Dockerized MERN application

Question and answer site build with node with express backend and react with redux frontend. 

## Installation

Clone repository: 
```bash
git clone https://github.com/PatrickNymark/Q-A-Site.git
```

Create file for local enviroment variables:
```bash
cd /server/config
touch keys_dev.js
```
Fill out local enviroment variables. The application needs a sendgrid key, mongodb uri, and a secretOrKey for jwt.
Example:
```bash
module.exports = {
  mongoURI: 'mongodb://<username>:<password@ds129265.mlab.com:12795/database',
  secretOrKey: '!30fgbae24',
  sendGrid: 'TP.bdt_21BbT1u2_RAPdhVrag.G-lr1vCdtLA-HaKJ2AHKyga_vql1T12e6sxa2XzI98Nw'
}
```

Make sure you have docker and docker-compose CLI installed, and then run:
```bash
docker-compose up
```

## Installation without docker

```bash
git clone https://github.com/PatrickNymark/Q-A-Site.git
```

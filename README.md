[![Build Status](https://travis-ci.org/mKomorowski/corlysis-js.svg?branch=master)](https://travis-ci.org/mKomorowski/corlysis-js)

# Corlysis JS
Javascript [Corlysis](https://corlysis.com/) client

[![NPM](https://nodei.co/npm/corlysis-js.png?downloads=true)](https://nodei.co/npm/corlysis-js/)

## Installation
```bash
npm install corlysis-js --save
```

## Usage
```javascript
const Corlysis = require('corlysis-js');

const corlysis = new Corlysis('dbname', 'username', 'password');
```

#### Create new record

Send single point value
```javascript
corlysis.writeSimple('key', 1.27);
```

You can optionally pass callback to retrieve insert results
```javascript
corlysis.writeSimple('key', 1.27, (err, statusCode) => {
  console.log(err, statusCode);
});
```
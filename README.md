# HopeIT-frontend

## Technologies used

 - [React](https://reactjs.org/) - frontend library
 - [Redux](https://redux.js.org/) - state management
 - [Redux Saga](https://redux-saga.js.org/) - async state management
 - [Redux Form](https://redux-form.com/) - forms
 - [Webpack](https://webpack.js.org/) - bundler
 - [Yarn](https://yarnpkg.com) - package manager
 - [SASS](http://sass-lang.com/) - CSS extension language

## Installation

### Development

1. Install Node.js ([NVM](https://github.com/creationix/nvm) recommended).
 - `curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.8/install.sh | bash`
 - `nvm install node && nvm use node`
2. Install `yarn` package manager.
 - `curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -`
 - `echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list`
3. Install dependencies with `yarn`.
 - `yarn`
3. Run development server.
 - `yarn run dev`

### Production
1. Install Node.js.
2. Install `yarn` & dependencies with `yarn`.
3. Build solution.
 - `API_URL=<URL_TO_API> yarn run build`
4. Start Node.js server (`bin/server.js`).
 - `yarn start`

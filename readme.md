# Code-Challenge

This repository contains react-redux application which shows organizations projects and their branches.

# install

- run `npm i`

# dev

- command `npm run dev` starts webpack-dev-server

# build

- command `npm run build` starts building the application
- application files will be placed in `./out` directory

# test

- mocha tests: `npm run test`
- eslint: `npm run eslint`

# docker

- build the image: `npm run docker/build`
- run the app: `npm run docker/run`
- test it: `npm run docker/test`

# project structure

- `src` - source of the app
	- `api` - AJAX
	- `components` - React components, dump & smart
	- `redux` - Everything about selectors, action-creators, actions-types, reducers, etc.
	- `tools` - Some additional helpers
	- `static` - Several static files like `favicon.ico`
	- `styles` - SCSS styles
	- `app.js` - init point of the app
- `tests/app` - tests
- `webpack/*` - custom webpack configuration

# notes

- I used `react`, `redux`, `react-thunk`, `reselect` because I have big experience with the,
- Also I used `react-router-dom`, but I didn't use it before :) I hope I used it properly. There wasn't anything about routing in the task description, yes. I wanted to have some practice with it.
- There are 1 end-to-end test and 1 unit-test for a dump component. I hope they're enough, because I don't have too much time to cover all the code :) End-To-End test handles routing, redux-store, pagination.
- I used `antd-design` UI library, because I used it on my previous project.
- I didn't use `react-create-app` because I prefer to control the workflow by myself
- `prop-types` aren't used because of [14159](https://github.com/facebook/react/issues/14159)
- I hope I haven't forgotten any requirement
- I haven't made anything about an incorrect organization or a branch name string. I mean %,#,&,^, etc. I hope it wasn't needed. But I can :) So I decided to just to write that it can be implemented too.

# links

- [Linkedin profile](https://linkedin.com/in/faiwer/)
- [GitHub profile](https://github.com/faiwer) - nothing interesting
- [Blog](https://faiwer.ru/) - my IT blog, but on russian
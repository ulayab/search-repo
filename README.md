# Github Search Engine
Search the repos in Github community!

## Getting Started

```
npm install
npm start
```

open [http://localhost:8000/](http://localhost:3000/) for running locally

## Architecture

- [Create React App](https://github.com/facebook/create-react-app)
- React Hooks
- [react-router](https://github.com/remix-run/react-router)
- [styled-component](https://github.com/styled-components)
- [styled-icons](https://github.com/styled-icons/styled-icons)
- [lodash.debounce](https://www.npmjs.com/package/lodash.debounce)

## Feature

- Real-time searching
  - Debounce search: handle frequently search of onChange event 
- Infinite scroll for paging
- Url changing depends on searching keyword
- Api error hints

## Directory Structure
```
search-repo
├── App.css
├── App.js
├── App.test.js
├── Components
│   ├── RepoList.js
│   └── SearchBar.js
├── index.css
├── index.js
├── loading.gif
├── logo.svg
├── reportWebVitals.js
└── setupTests.js
```
It's a one-page application.

`App.js`: The whole page entry, contains `SearchBar`, `ErrorBox` and `RepoList` 3 main components.

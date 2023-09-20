# Getting Started

## Set up the Development Environment

    You need to set up your development environment before you can do anything.

## Recommended Versions

- Node: v14.20.0
- npm: v6.14.17
- yarn: v1.22.18

#### Install [Node.js and NPM](https://nodejs.org/en/download/)

- on OSX use [homebrew](http://brew.sh) `brew install node`
- on Windows use [chocolatey](https://chocolatey.org/) `choco install nodejs`

#### Install [Yarn](https://yarnpkg.com/getting-started)

It is recommended to install Yarn through the npm package manager, which comes bundled with Node.js when you install it on your system.

```shell
npm install --global yarn
```

### Install dependencies

Installs project dependencies.

```shell
npm install or yarn  install
```

### Compilation and reloads for development

Runs the app in development mode.
Open http://localhost:3000 to view it in the browser.

The page will automatically reload if you make changes to the code.
You will see the build errors and lint warnings in the console.

```shell
yarn start
```

### Build

Builds the qs-owl for production to the `build` folder.
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.

```shell
yarn build
```

## Prettier

| S.No | key           | type    | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| :--: | :------------ | :------ | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|  1   | printWidth    | string  | Specify the line length that the printer will wrap on.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
|  2   | tabWidth      | string  | Specify the number of spaces per indentation-level.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
|  3   | semi          | boolean | **true**: Print semicolons at the ends of statements. <br>**false:** Only add semicolons at the beginning of lines that may introduce ASI failures.                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
|  4   | singleQuote   | boolean | Use single quotes instead of double quotes.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
|  5   | trailingComma | string  | Default value changed from none to es5 in v2.0.0 <br> ### Valid Options <br> **"es5"** - Trailing commas where valid in ES5 (objects, arrays, etc.). No trailing commas in type parameters in TypeScript. <br> **"none"** - No trailing commas. <br> **"all"** - Trailing commas wherever possible (including function parameters and calls). To run, JavaScript code formatted this way needs an engine that supports ES2017 (Node.js 8+ or a modern browser) or downlevel compilation. This also enables trailing commas in type parameters in TypeScript (supported since TypeScript 2.7 released in January 2018). |
|  6   | useTabs       | boolean | Setting indent_style in an .editorconfig file will configure Prettier’s tab usage, unless overridden.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |

## eslintrc

Linting preferences for Javascript

### Unit Testing

```shell
npm run test
```

### Linting

```shell
npm lint
```

Lints your typescript

```shell
npm lint:fix
```

Lints your code and tries to fix any errors it finds.

### Typescript

```
npm checkTs
```

Checks for TypeScript errors.

# Tech Stack

Here's a curated list of packages that you should be at least familiar with before starting your awesome project. However, the best way to see a complete list of the dependencies is to check package.json.

## Core

- React
- React Router
- Redux
- Redux Toolkit
- Reselect
- Styled Components
- Typescript

## Unit Testing

- Jest
- react-testing-library

## Linting

- eslint
- prettier
- airbnb
- airbnb-typescript

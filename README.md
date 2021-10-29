
# Gilded Cockpit

## Setup

Clone this repository then run `npm install`

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.


## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--aot --prod` flag for ahead of time compilation and production mode. 

The title of that issue suggests an issue with AOT but in my testing `--prod` seems to be the problem. 

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

## Source Code Documentation

This project uses the compodoc project : https://github.com/compodoc/compodoc

Run `npm install -g @compodoc/compodoc` to install compodoc globally
Run `compodoc -p tsconfig.json -n 'NGX Dynamic Dashboard Framework'` to generate the documentation. It will be placed in the documentation folder
Run `compodoc -s` to serve up the documentation site at http://localhost:8080

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).


# CarlesherveraGestio

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.1.0.





## Arquitecture

### Explicación de capas y organización de código
![estructura de carpetas](readme-assets/estructura-carpetas.jpg?raw=true "Estructura de carpetas")

#### carpeta core
En el módulo core se pondrá todo lo que vayan a usar la mayoría de modulos. Es un módulo que será cargado en el componente main, por lo que siempre estará disponible y será cargado al arranque de la aplicación.

#### carpeta main
Es el módulo principal, aquí es donde distribuiremos todos los modulos del negocio de la aplicación.

#### carpeta shared
Aquí irán incluídos todos los módulos que no serán cargados automaticamente con la aplicación. Són modulos o herramientas que los modulos de la carpeta main importaran si los necesitan.

### Traducciones y i18n
https://github.com/ngx-translate/core


## TODO:


1. - The JWT authentication - Done
  1. - Fer que guardi el token en una cookie un ratet
1. - A HTML layout
  1. - Bootstrap 4
  1. - Icon font
1. - Validacions i formularis
  1. - Crear component de show errors genèric. - Done
  1. - Handle errors.
    1. - Server side
    1. - Generals
1. - Export xls service. 
  1. - Make the service - Done
  1. - Improve the service.
1. - Convert state into inmutable state
1. - Finish and add the module generation schematics.
1. - Example test
1. - i18n - Done



## Based on:

https://dev.to/avatsaev/simple-state-management-in-angular-with-only-services-and-rxjs-41p8

https://material.angular.io/

https://angular-academy.com/angular-jwt/

https://github.com/ngx-translate/core


## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
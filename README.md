# CarlesherveraGestio

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.1.0.





## Arquitecture

### capas y organización de código
![estructura de carpetas](readme-assets/estructura-carpetas.jpg?raw=true "Estructura de carpetas")

#### carpeta core
En el módulo core se pondrá todo lo que vayan a usar la mayoría de modulos. Es un módulo que será cargado en el componente main, por lo que siempre estará disponible y será cargado al arranque de la aplicación.

#### carpeta shared
Aquí irán incluídos todos los módulos que no serán cargados automaticamente con la aplicación. Són modulos o herramientas que los modulos de la carpeta main importaran si los necesitan.

#### carpeta main
Es el módulo principal, aquí es donde distribuiremos todos los modulos del negocio de la aplicación.

##### modulos negocio
Los módulos de negocio estarán compuestos de las siguientes carpetas:

1. api
En esta carpeta se encontrarán los servicios de acceso a la api si el modulo en cuestión acceda a alguna api.


### Traducciones y i18n
El modulo de traducciones no es necesario importarlo ya que esta inicializado en el modulo Core que todos los modulos importan.

Las traducciones estan en formato JSON en la raiz del proyecto.
https://github.com/ngx-translate/core

### Error handler

En el modulo core, hay una carpeta error-handler con los servicios necesarios para tratar los errores:
  1. - ErrorService -> sirve para tratar el error del navegador
  2. - GlobalErrorHandler -> es el que sobreescribe el handler por defecto de angular, se definie en los providers del modulo.
  [Alerta] - Si los errores de peticiones http son controlados en la suscripción de obserbables, no serán tratados por el handler, si se quiere que los trate el handler, despues de hacer lo que sea necesario hay que propagar el error con el throw error.
  3. - LoggingService -> se encarga de registrar los errores, hay que hacer una petición al servicio rest de log de errores, falta definir y hacer.
  4. - NotificationService -> sen encarga de notificar mediante algun tipo de alert al usuario del error. 


https://medium.com/@michael.karen/esperando-lo-inesperado-buenas-pr%C3%A1cticas-para-el-manejo-de-errores-en-angular-dc578da68ef9

## TODO:


1. - The JWT authentication - Done
  1. - Fer que guardi el token en una cookie un ratet
1. - A HTML layout
  1. - Bootstrap 4
  1. - Icon font
1. - Validacions i formularis
  1. - Crear component de show errors genèric. - Done
  1. - Handle errors.
    1. - Falta fer el loggin service, però s'ha de definir un "back" on cridar.
1. - Export xls service. 
  1. - Make the service - Done
  1. - Improve the service.
1. - Convert state into inmutable state
1. - Finish and add the module generation schematics.
1. - Example test
1. - i18n - Done



## Based on:

https://dev.to/avatsaev/simple-state-management-in-angular-with-only-services-and-rxjs-41p8

https://medium.com/fincura-engineering/front-end-architecture-for-angular-applications-d6840b78706c

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
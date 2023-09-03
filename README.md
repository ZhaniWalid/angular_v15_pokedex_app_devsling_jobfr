# ABOUT:

This project is dedicated to DEVSLING Consulting in France. It is a project to develop an Angular front-end application called "POKEDEX", using the "PokeApi" as a source of RESTful API web services data: [PokeApi](https://pokeapi.co/).

The codes of the app are well documented and have some unit tests cases.

# AngularPokedexApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.2.7.

#### Live preview link of the app: [Pokedex Demo Angular App](https://pokedex-demo-angular.netlify.app) [ https://pokedex-demo-angular.netlify.app ]

# How do I launch the app (as Development server)?:

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. 
OR, run `ng serve --open` to open a tab automatically in the navigator.

The application will automatically reload if you change any of the source files.

# How to launch the tests (Running unit tests)?:

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## Solving refreshing welcome page after the deployment on Netlify (Angular app issue):

When refreshing the welcome page that is automatically redirected from this path "/" to this path "/pokedex-welcome-search-page", will have a message like that "Page not found". So, to solve this problem we need to create a "_redirects" file (without extension, like its written to you) especially for "Netlify" and add this object {
  "glob": "_redirects",
  "input": "src",
  "output": "/"
}, in the "angular.json" file to solve the problem.

Thanks to the answer in this link: [angular-routing-not-working-on-netlify-on-refresh-welcome-page](https://stackoverflow.com/questions/51887581/angular-routing-not-working-on-netlify-on-page-refresh)

# Would you like more information?

Contact me (WALID ZHANI) via these links on:
- My LinkedIn: https://www.linkedin.com/in/walid-zhani-54705612a/
- My Github: https://github.com/ZhaniWalid
- My Emails: walid.zhani24@gmail.com || walid.zhani@esprit.tn

## BIG GREETINGS FROM "WALID ZHANI", FROM "TUNISIA".
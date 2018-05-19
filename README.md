# Paris Culture Analyze

## Présentation

**Paris Culture Analyse** est un projet universitaire développé par quatre apprentis ingénieurs en informatique en dernière année (2017/2018) à [Polytech' Paris-Sud](http://www.polytech.u-psud.fr/fr/index.html) dans le cadre de la matière "Données semi-structurées".

Nous proposons d'analyser la répartition des lieux et évènements culturels repartis sur la ville de Paris (intramuros) en se basant sur les données fournies librement par la Mairie de Paris : les évènements, les salles de cinémas et les musées.

S'il est difficile de prétendre couvrir l'intégralité des manifestations culturelles avec si peu de données, nous proposons de les manipuler afin d'apporter des angles de lecture différents et d'en tirer, pourquoi pas, des informations peu évidentes aux premiers abords.

Le sujet initial requiert la manipulation des données et leur traitement mais également l'uniformisation de leur format pour finalement proposer leur export au format XML. C'est également une fonctionnalité que nous avons implémenté facilitant ainsi la réutilisation potentielle des données par des utilisateurs.

## Tester le projet

Le projet est disponible [à cette adresse](https://paris-culture-analyse.firebaseapp.com).

## Sources

Nous utilisons les sources de données suivantes :

*   [Les cinémas de Paris](https://opendata.paris.fr/explore/dataset/cinemas-a-paris/)
*   [Les musées de Paris](https://opendata.paris.fr/explore/dataset/liste-musees-de-france-a-paris/information/)
*   [Les évènements à Paris (en 2018)](https://opendata.paris.fr/explore/dataset/evenements-a-paris/information)

Toutes les données utilisées sont issues de l'[API mise à disposition par la Mairie de Paris](https://opendata.paris.fr/). Un export des données est présent dans le dossier [data du projet](https://github.com/MielPoPSCrew/ParisCultureAnalyze/tree/dev/src/data).

## Ressources

* [Schéma XSD des données exportées](https://github.com/MielPoPSCrew/ParisCultureAnalyze/blob/dev/src/assets/xsd/paris-culture-analyse.xsd)
* [Exemple d'export](https://github.com/MielPoPSCrew/ParisCultureAnalyze/blob/dev/src/examples/XML_ParisCultureAnalyse1526635464391.xml)

![](https://i.imgur.com/KqFGoQe.png)

## Fonctionnalités

Quatre visualisations différentes sont proposées par XML Project.

### Analyze

ANALYZE propose de visualiser les données de façon globale. En sélectionnant de centrer l'analyse sur les différents types de manifestation culturelle il est possible de comparer leur quantité en fonction des différents arrondissements. Des outils comme le filtrage des données, le tri ou encore le changement de type de graph permettent d'affiner la recherche selon l'utilisation ou les préférences.

![](https://i.imgur.com/1oo6qfG.png)

### Map

MAP permet de visualiser les différentes manifestations culturelles réparties géographiquement sur une carte de Paris.

![](https://i.imgur.com/8S8JPeK.jpg)

### Compare

COMPARE offre des outils de comparaison prenant pour cible deux arrondissements précis de Paris afin de comparer leur données entre elles. Il est encore une fois possible de modifier le type de graphs utilisés ainsi que d'éliminer les données non importantes à l'analyse désirée.

![](https://i.imgur.com/0CmmTr7.png)

### Array

ARRAY est un outil très classique de visualisation des données mais néanmoins utile lorsque le besoin se rapproche d'une recherche ou d'une sélection précise dans l'ensemble de données. ARRAY propose une représentation des données sous forme de tableau ainsi qu'un lot incontournable d'outils : le filtrage, la recherche ou encore le tri.

Afin de répondre pleinement aux exigences initiales du sujet, XML Project propose également l'export des données sous le format XML ainsi qu'un schema XSD les validant.

![](https://i.imgur.com/ftqVdgo.png)

### Auteurs

*   [Thomas Cottin](https://twitter.com/ThomasCottin)
*   [Clément Garin](https://twitter.com/omnisnash)
*   [Léo Donny](https://twitter.com/LeoDonny_)
*   Romain Laneuville

Le GitHub du projet est à disosition pour toute remarque ou question !

### Technologies

[Angular :)](https://angular.io/) ainsi que la librairie [Chart.js](https://www.chartjs.org/) adaptée à Angular via [ng2-charts](https://valor-software.com/ng2-charts/).

## Mise en place du projet

_Documentation générée automatiquement via [Angular CLI](https://github.com/angular/angular-cli) version 1.7.3._

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

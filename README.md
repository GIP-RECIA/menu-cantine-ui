# Menu Cantine UI

- [Menu Cantine UI](#menu-cantine-ui)
  - [Installation](#installation)
  - [Paramètres](#paramètres)

## Installation

1. Installation via npm :

```sh
npm install @gip-recia/menu-cantine
```

2. Importation du composant :

Dans un module JavaScript :

```js
import '@gip-recia/menu-cantine';
```

Dans une page HTML :

```html
<script src="./path/to/menu-cantine.min.js"></script>
```

3. Ajout du composant sur une page HTML :

```js
const menuCantine = document.createElement('menu-cantine');
document.body.appendChild(menuCantine);
```

## Paramètres

Propriétés disponibles :

| Nom                     |   Type    | Obligatoire | Default | Description                                                           |
| ----------------------- | :-------: | :---------: | :-----: | --------------------------------------------------------------------- |
| `is-demo`               | `boolean` |    `non`    | `false` | True pour lancer en mode de test local (affichage de la page "admin") |
| `app-user-info-uri`     | `string`  |    `oui`    |         | URL de l'API pour récupérer les infos sur les users                   |
| `app-url-img`           | `string`  |    `oui`    |         | URL des images                                                        |
| `app-url-rest-api`      | `string`  |    `oui`    |         | URL du back pour récupérer les menus                                  |
| `app-url-api-etab`      | `string`  |    `oui`    |         | URL de l'API pour récupérer les infos sur les structures              |
| `app-url-rest-api-demo` | `string`  |    `non`    |         | URL du back pour récupérer les menus en mode test local               |

<br/>

```html
<menu-cantine-menu-semaine
  is-demo
  app-user-info-uri=""
  app-url-img=""
  app-url-rest-api=""
  app-url-api-etab=""
  app-url-rest-api-demo=""
/>
```

# Menu Cantine UI

Ce projet vue est la partie **front-end** du service Menu Cantine.

- [Menu Cantine UI](#menu-cantine-ui)
  - [Prérequis](#prérequis)
  - [Initialisation](#initialisation)
  - [Development](#development)
  - [Compilation](#compilation)
    - [Mode de test](#mode-de-test)
  - [Composant Web](#composant-web)
    - [Utilisation](#utilisation)
    - [Paramètres](#paramètres)

## Prérequis

- [nvm](https://github.com/nvm-sh/nvm) ou node 14
- webpack

## Initialisation

```bash
nvm install
npm i -g webpack
npm i
```

## Development

```bash
npm run serve
```

## Compilation

```bash
npm run build
```

### Mode de test

Fonctionnement avec le back en local :

  1. Remplacer `https://unpkg.com/vue` par `https://unpkg.com/vue@2.7.16/dist/vue.js` dans `dist/demo.html` (ou se servir directement du demo.html dans le back)
  2. Copier les fichiers js dans le dossier `static/demo` du projet `menu-cantine-web-service`
  3. Lancer le back et accéder à l'URL de démo (voir dans le README du projet back)

```bash
npm run buildDev
```

## Composant Web

### Utilisation

```html
<menu-cantine-menu-semaine
        is-demo
        app-portal-context=""
        app-user-info-uri=""
        app-url-img=""
        app-url-rest-api=""
        app-url-api-etab=""
        app-url-rest-api-demo="">
</menu-cantine-menu-semaine>
```

### Paramètres

| Propriété              | Signification                                                         |
|------------------------|-----------------------------------------------------------------------|
| is-demo                | True pour lancer en mode de test local (affichage de la page "admin") |
| app-portal-context     | URL du portail                                                        |
| app-user-info-uri      | URL de l'API pour récupérer les infos sur les users                   |
| app-url-img            | URL des images                                                        |
| app-url-rest-api       | URL du back pour récupérer les menus                                  |
| app-url-api-etab       | URL de l'API pour récupérer les infos sur les structures              |
| app-url-rest-api-demo  | URL du back pour récupérer les menus en mode test local               |
# Menu Cantine UI

Ce projet vue est la partie **front-end** du service Menu Cantine.

- [Menu Cantine UI](#menu-cantine-ui)
  - [Prérequis](#prérequis)
  - [Initialisation](#initialisation)
  - [Development](#development)
  - [Compilation](#compilation)
    - [Mode de test](#mode-de-test)

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

  1. Remplacer `https://unpkg.com/vue` par `https://unpkg.com/vue@2.7.16/dist/vue.js` dans `dist/demo.html`
  2. Copier les fichiers js dans le dossier `static/demo` du projet `menu-cantine-web-service`

```bash
npm run buildDev
```

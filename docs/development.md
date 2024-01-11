# Développement

- [Développement](#développement)
  - [Prérequis](#prérequis)
    - [Initialisation](#initialisation)
    - [Serveur de Développement](#serveur-de-développement)
    - [Compilation](#compilation)
      - [Mode de test](#mode-de-test)

## Prérequis

- [nvm](https://github.com/nvm-sh/nvm) ou node 14
- webpack

### Initialisation

```bash
nvm install
npm i -g webpack
npm i
```

### Serveur de Développement

```bash
npm run serve
```

### Compilation

```bash
npm run build
```

#### Mode de test

Fonctionnement avec le back en local :

  1. Remplacer `https://unpkg.com/vue` par `https://unpkg.com/vue@2.7.16/dist/vue.js` dans `dist/demo.html` (ou se servir directement du demo.html dans le back)
  2. Copier les fichiers js dans le dossier `static/demo` du projet `menu-cantine-web-service`
  3. Lancer le back et accéder à l'URL de démo (voir dans le README du projet back)

```bash
npm run buildDev
```

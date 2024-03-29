# Développement

- [Développement](#développement)
  - [Prérequis](#prérequis)
  - [Initialisation](#initialisation)
  - [Serveur de Développement](#serveur-de-développement)
  - [Compilation](#compilation)
    - [Mode de test](#mode-de-test)
  - [Release](#release)

## Prérequis

- [nvm](https://github.com/nvm-sh/nvm) ou node 14
- webpack

## Initialisation

```bash
nvm install
npm i -g webpack
npm i
```

## Serveur de Développement

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

## Release

  1. Mettre à jour la version et le changelog (création du commit et du tag automatique) : `release:patch` **OU** `release:minor` **OU** `release:major`
  2. Compiler
  3. Publier sur npmjs
  4. Push les modifications et le tag sur git

```bash
npm run release:patch
npm run build
npm publish
git push origin master
git push origin --tags
```

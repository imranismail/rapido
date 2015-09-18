# Features
- Webpack
- Gulp
- Bootstrap
- [Timber + Twig](https://github.com/jarednova/timber)
- [Polylang Compatibility](https://polylang.wordpress.com/)
- Browser-sync
- ES6 (Babel)
- Package Managers (Bower, Composer, NPM)
- Sourcemapping

# Installation

```
cd /wordpress/wp-content/theme/
git clone git@github.com:imranismail/rapido.git
npm install && bower install && composer install
```

Edit `gulpfile.babel.js` and change `rapido.dev` to your wordpress installation host in your local machine.

for ease of setup I myself prefer to use bedrock as the development environment.

now run `gulp` and your assets should be compiled, served and synced to your browser.

# Gulp Tasks

```
├─┬ default
│ └── serve
├─┬ build (Preferred for production cycle, serves assets without sourcemaps and minified)
│ └── webpack:production
├─┬ serve (Preferred for development cycle, serves assets with sourcemaps and browser-sync)
│ ├── webpack:development
│ └── browser-sync
├── webpack:production
├── webpack:development
└── browser-sync
```

# Credits
 - Jared Novack for [Timber](https://github.com/jarednova/timber) and [Timber Starter Theme](https://github.com/Upstatement/timber-starter-theme)
 - All other FOSS contributors that are being utilized in this repository

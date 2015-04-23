# Features
- CoffeeScript
- Sass
- Bootstrap
- Wiredep
- [Timber + Twig](https://github.com/jarednova/timber)
- [Polylang Compatibility](https://polylang.wordpress.com/)
- Livereload
- Package Managers (Bower, Composer, NPM)

# Gulp Tasks

```
├── clean
├── styles
├── lint
├── coffee
├── wiredep
├── watch ( Watches *.twig, *.sass, *.coffee and livereload when any changes are detected )
├─┬ serve
│ ├── wiredep
│ ├── styles
│ ├── coffee
│ └── watch
├─┬ build
│ ├── wiredep
│ ├── styles
│ ├── lint
│ └── coffee
└─┬ default
  └── clean
```

# Installation

```
cd /wordpress/wp-content/theme/
git clone git@github.com:imranismail/rapido.git
npm install && bower install
```

# Usage

- ## CoffeeScript
Write your `*.coffee` in `scripts/coffee/*.coffee` which in turn compiles to `scripts/js/*.js`

- ## Sass
All your sass files are stored in the `styles` directory. Do take note that only the `style.scss` is compiled to `style.css` since the `style.scss` is requiring the `main.scss` file that is stored in the `styles` directory. Manage your sass files using `main.scss`, refer [here](http://thesassway.com/beginner/how-to-structure-a-sass-project) to learn more about manifesting sass and managing sass libs

- ## Twig
Using timber we avoid abtracting too much of the [default template hierarcy](http://wphierarchy.com/) all your *.php template should be at their default location. However each of this template file is rendering a *.twig view. Refer [here](https://github.com/jarednova/timber/wiki) for more information

- ## Gulp Tasks
 - there are multiple gulp tasks that you can use, but ultimately `gulp serve` is going to be used to serve the files which and watches the files for any changes that will in turn serve the files and trigger a reload/refresh.
 - use `gulp wiredep` to wire up packages installed using bower/NPM

# Credits
 - Jared Novack for [Timber](https://github.com/jarednova/timber) and [Timber Starter Theme](https://github.com/Upstatement/timber-starter-theme)
 - All other FOSS contributors that are being utilized in this repository

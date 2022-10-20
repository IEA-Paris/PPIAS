# PIAS - Proceedings of Paris Institute for Advanced Study

## For editors

You can use Forestry.io or any kind of headless markdown based CMS to update, or you can directly create and commit the articles files.

Things to be noted before you go ahead:
- Articles are the only required items for a Publio Website. During the website generation, media and authors documents will be created, interpolated and indexed.
- Never use special characters for a content file name (it if does not work in a URL, don't use it). While it works with Publio, some third party elements will break with special chars in the file names
- Once an author document (or media) is created, feel free to update it: all your changes will be preserved during the next article generation. Please avoid conflict between identical positions or institution names (e.g. PARIS IAS DIRECTOR vs PARIS INSTITUTE FOR ADVANCED STUDY DIRECTOR). Both will be kept but the original phrasing of an author position in the article document should match the one from the author document (so please edit both at the same time if you want to change it)
- If you don't tick "published" to true, your article PDF won't be generated. If you picked a custom PDF, it will not be generated as well.
- PDF generation is automatic and during the article build. Please note that we can't avoid some unexpected results in terms of editing. Use a custom PDF or wait for improvements to the system if the result is not satisfying.
- Regarding the third party API tokens (Zenodo, Orcid, ROR, Wikipedia, AWS, Github etc.), they will all be required eventually (i.e. alpha releases) in the config.js file at the root of this project. Note that you should use the sandbox versions (at least Zenodo's) while you are still putting things together. That will avoid to generate real DOIs and disseminate test content.
- Third party api secret token should never be commited to your repository. It should be added to your repo secrets.
- We work with Ackee for analytics. No other analytics is supported but you can easily add yours as you would to any Nuxt website.
- The Deepl key in the config is originaly used to automatically translate abstracts. Note that it is not active anymore. Also, a developer API key is the type of key required.

## Build Setup

```bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn dev

# build for production and launch server
$ yarn build
$ yarn start

# generate static project
$ yarn generate
```

For detailed explanation on how things work, check out the [documentation](https://nuxtjs.org).

## Special Directories

You can create the following extra directories, some of which have special behaviors. Only `pages` is required; you can delete them if you don't want to use their functionality.

### `assets`

The assets directory contains your uncompiled assets such as Stylus or Sass files, images, or fonts.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/assets).

### `components`

The components directory contains your Vue.js components. Components make up the different parts of your page and can be reused and imported into your pages, layouts and even other components.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/components).

### `layouts`

Layouts are a great help when you want to change the look and feel of your Nuxt app, whether you want to include a sidebar or have distinct layouts for mobile and desktop.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/layouts).

### `pages`

This directory contains your application views and routes. Nuxt will read all the `*.vue` files inside this directory and setup Vue Router automatically.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/get-started/routing).

### `plugins`

The plugins directory contains JavaScript plugins that you want to run before instantiating the root Vue.js Application. This is the place to add Vue plugins and to inject functions or constants. Every time you need to use `Vue.use()`, you should create a file in `plugins/` and add its path to plugins in `nuxt.config.js`.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/plugins).

### `static`

This directory contains your static files. Each file inside this directory is mapped to `/`.

Example: `/static/robots.txt` is mapped as `/robots.txt`.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/static).

### `store`

This directory contains your Vuex store files. Creating a file in this directory automatically activates Vuex.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/store).

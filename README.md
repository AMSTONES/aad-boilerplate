# WordPress Boilerplate

This boilerplate is designed to make working locally and deploying WordPress to our DigitalOcean stack easy and consistent.

## What does it come with?

### Composer for managing dependencies
 - This means we don't need to commit plugins or WordPress core to the repo
 - We can speed up the update of new plugins and core
 - These dependencies are installed on Deploy so you can sit back and have a cup of tea

### Gulp
This boilerplate comes bundled with an empty these designed to get you started really quickly. In this case we:
 - have included gulp to compile JS and SASS for you
 - this also contains a simple `functions.php` file to enqueue the files - so you can just get to coding

## Installation

### Composer
1. To install plugins, go to: https://wpackagist.org/ to get the version of the plugin and add it to the `composer.json`
2. After adding the plugins to the `composer.json` you will need to run `composer update` to update the lock file (this is important for deployments)

> **Note:** If you do not need to make any changes to the `composer.json` file, you can just run `composer install`.
>
> For more information on Composer, take a look at the docs: https://getcomposer.org/

### Gulp
1. Run `npm install` to install the dependencies defined in the `package.json`
2. Run `gulp` to start watching your files

### Site URL's
1. When setting the WP_HOME_CUSTOM we will NOT need to include the protocol. View .env.example for reference
2. Be sure to set the WP_ENV to the correct environment. This variable will deal with what protocol is used depending on whether its a local http:// or production https://
3. Please note that setting these values in the .env means the database settings are no longer supported. 

> **Note:** These changes NEED to be added to DeployHQ and it MUST have the correct WP_ENV set
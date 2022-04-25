<?php

use Dotenv\Dotenv;
use Env\Env;
use Roots\WPConfig\Config;

/** @var string Directory containing all of the site's files */
$root_dir = dirname(__DIR__, 1);

/** @var string Document Root */
$webroot_dir = $root_dir . '/public_html';

Env::$default = false;

/**
 * Use Dotenv to set required environment variables and load .env file in root
 */
$dotenv = Dotenv::createUnsafeImmutable($root_dir);
if (file_exists($root_dir.'/.env')) {
  $dotenv->load();
}

/**
 * Set up our global environment constant and load its config first
 * Default: production
 */
Config::define('WP_ENV', getenv('WP_ENV') ? getenv('WP_ENV') : 'production');

/** Cache */
Config::define('WP_CACHE', (bool) getenv('WP_CACHE'));

/** URLs */
$protocol = getenv('WP_ENV') === 'local' ? 'http://' : 'https://';

$wp_home = $protocol.getenv('WP_HOME_CUSTOM');
$wp_siteurl = $protocol.getenv('WP_SITEURL_CUSTOM');

if ($_SERVER['HTTP_HOST'] === getenv('WP_HOME_CUSTOM')) {
    Config::define('WP_HOME', $wp_home);
    Config::define('WP_SITEURL', $wp_siteurl);
} else {
    Config::define('WP_HOME', "{$protocol}{$_SERVER['HTTP_HOST']}");
    Config::define('WP_SITEURL', "{$protocol}{$_SERVER['HTTP_HOST']}/admin");
}

/** Custom Content Directory */
Config::define('CONTENT_DIR', '/app');
Config::define('WP_CONTENT_DIR', $webroot_dir . Config::get('CONTENT_DIR'));
Config::define('WP_CONTENT_URL', Config::get('WP_HOME') . Config::get('CONTENT_DIR'));

/** Database */
Config::define('DB_NAME', getenv('DB_NAME'));
Config::define('DB_USER', getenv('DB_USER'));
Config::define('DB_PASSWORD', getenv('DB_PASSWORD'));
Config::define('DB_HOST', getenv('DB_HOST') ?: 'localhost');
Config::define('DB_CHARSET', 'utf8mb4');
Config::define('DB_COLLATE', '');

/** MySQL database table prefix. */
$table_prefix = getenv('DB_PREFIX') ?: 'wp_';

/** Authentication Unique Keys and Salts */
Config::define('AUTH_KEY', getenv('AUTH_KEY'));
Config::define('SECURE_AUTH_KEY', getenv('SECURE_AUTH_KEY'));
Config::define('LOGGED_IN_KEY', getenv('LOGGED_IN_KEY'));
Config::define('NONCE_KEY', getenv('NONCE_KEY'));
Config::define('AUTH_SALT', getenv('AUTH_SALT'));
Config::define('SECURE_AUTH_SALT', getenv('SECURE_AUTH_SALT'));
Config::define('LOGGED_IN_SALT', getenv('LOGGED_IN_SALT'));
Config::define('NONCE_SALT', getenv('NONCE_SALT'));

/** Custom Settings */
Config::define('AUTOMATIC_UPDATER_DISABLED', true);
Config::define('DISABLE_WP_CRON', getenv('DISABLE_WP_CRON') ?: false);
// Disable the plugin and theme file editor in the admin
Config::define('DISALLOW_FILE_EDIT', getenv('DISALLOW_FILE_EDIT') ?: false);
// Disable plugin and theme updates and installation from the admin
Config::define('DISALLOW_FILE_MODS', getenv('DISALLOW_FILE_MODS') ?: false);


/** Debugging Settings */
if (getenv('WP_DEBUG') && getenv('WP_DEBUG') == 'true') {
    $debug = true;
} else {
    $debug = false;
}

Config::define('SAVEQUERIES', $debug);
Config::define('WP_DEBUG', $debug);
Config::define('WP_DEBUG_DISPLAY', $debug);
Config::define('SCRIPT_DEBUG', $debug);
ini_set('display_errors', (int) $debug);

/** Apply the config */
Config::apply();

/** Bootstrap WordPress */
if (!defined('ABSPATH')) {
    define('ABSPATH', $webroot_dir . '/admin/');
}

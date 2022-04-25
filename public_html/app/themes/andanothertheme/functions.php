<?php

$dirs = [
  'funcs'
];

/** Load files */
foreach ($dirs as $directory) {
  $dirname = trailingslashit(get_stylesheet_directory())."{$directory}/";
  $dir = opendir($dirname);
  
  while ($filename = readdir($dir)) {
    if (($filename !== "index.php") && substr($filename, -4) === ".php") {            
      include_once "{$dirname}{$filename}";
    }
  }
}

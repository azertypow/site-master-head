<?php
/**
 * Created by PhpStorm.
 * User: azertypow
 * Date: 05/11/2018
 * Time: 16:05
 */

class VUEApplication
{
    public static function getApp() {
        return "
        <!doctype html>
        <html lang='en'>
            <head>
                <meta charset='UTF-8'>
                <meta name='viewport'
                      content='width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0'>
                <meta http-equiv='X-UA-Compatible' content='ie=edge'>
                <title>head media design</title>
                <link rel='stylesheet' href='./style.css'>
            </head>
            <body>
                <div id='app'></div>
            </body>
            <script type='text/javascript' src='./build.js'></script>
        </html>
        ";
    }
}
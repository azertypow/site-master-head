<?php
include("api/Projects.php");
include("api/Thesis.php");
include("api/Alumnis.php");
include("api/Contact.php");
include("api/Other.php");
include("api/Home.php");
include("api/VUEApplication.php");

c::set('license', 'put your license key here');
c::set('debug', true);

c::set('mmd.image.folderName', 'generated');
c::set('mmd.image.parameters', [
    'icon'  => ['config' => ['width' => 100,    'height' => 100,    'quality' => 50,   'blur' => true],     'extensionName' => '@mmd-icon'],
    'small' => ['config' => ['width' => 150,                        'quality' => 100],                      'extensionName' => '@mmd-small'],
    'regular' => ['config' => ['width' => 1050,   'height' => 500,    'quality' => 80],                      'extensionName' => '@mmd-regular'],
    'large' => ['config' => ['width' => 1280,   'height' => 800,    'quality' => 100],                      'extensionName' => '@mmd-large'],
]);

c::set('routes', array(

    // ------------------------------------
    // ----------- PROJECTS ---------------
    // ------------------------------------

    array(
        'pattern' => 'api/projects',
        'action' => function () {
            echo Projects::getAllProjects();
        }
    ),
    array(
        'pattern' => 'api/projects/appearhome',
        'action' => function () {
            echo Projects::getAllProjectsAppearHome();
        }
    ),
    array(
        'pattern' => 'api/projects/appearbandeau',
        'action' => function () {
            echo Projects::getAllProjectsAppearBandeau();
        }
    ),
    array(
        'pattern' => 'api/projects/tag=(:any)',
        'action' => function ($tag) {
            echo Projects::getAllProjectsByTag($tag);
        }
    ),
    array(
        'pattern' => 'api/projects/tag=(:any)/(:num)/(:num)',
        'action' => function ($tag, $from, $to) {
            echo Projects::getAllProjectsByTagYear($tag, $from, $to);
        }
    ),
    array(
        'pattern' => 'api/projects/uri=(:any)',
        'action' => function ($uri) {
            $uriDecode = urldecode($uri);
            echo Projects::getJsonDataForProjectByUri($uriDecode);
        }
    ),
    array(
        'pattern' => 'api/projects/alltags',
        'action' => function () {
            echo Projects::getAllTags();
        }
    ),

    // ------------------------------------
    // ----------- THESIS -----------------
    // ------------------------------------

    array(
        'pattern' => 'api/thesis',
        'action' => function () {
            echo Thesis::getAllThesis();
        }
    ),

    array(
        'pattern' => 'api/thesis/alltags',
        'action' => function () {
            echo Thesis::getAllTags();
        }
    ),

    // ------------------------------------
    // ----------- ALUMNIS ----------------
    // ------------------------------------

    array(
        'pattern' => 'api/alumnis',
        'action' => function () {
            echo Alumnis::getAllAlumnis();
        }
    ),

    // ------------------------------------
    // ----------- CONTACT ----------------
    // ------------------------------------

    array(
        'pattern' => 'api/contact/about',
        'action' => function () {
            echo Contact::getAllAbout();
        }
    ),

    // ------------------------------------
    // ----------- OTHER ----------------
    // ------------------------------------

    array(
        'pattern' => 'api/other/minmaxdates',
        'action' => function () {
            echo Other::getMinMaxDates();
        }
    ),

    // ------------------------------------
    // ----------- HOME ----------------
    // ------------------------------------

    array(
        'pattern' => 'api/home',
        'action' => function () {
            echo Home::getHome();
        }
    ),


    /*
     * front routes
     * */
    array(
        'pattern' => array('/', 'alumni', 'contact', 'home', 'project', 'thesis', 'other'),
        'action' => function () {
            echo VUEApplication::getApp();
        }
    ),

    array(
        'pattern' => '(:any)',
        'action' => function () {
            echo VUEApplication::getApp();
        }
    ),
));
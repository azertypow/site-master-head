<?php

/**
 * Created by PhpStorm.
 * User: yann
 * Date: 25.09.18
 * Time: 17:41
 */
class Home
{

    public static function getHome()
    {
        $data = page('home');
        $json = array(
            'url' => (string)$data->url(),
            'project_to_show_in_home'=> Home::getArrayOfProjectsInHome((string)$data->project_to_show_in_home())
        );
        return response::json($json);
    }

    public static function getArrayOfProjectsInHome($stringProjectUri) {

        $arrayOfProjectsInHome = [];

        $arrayOfProjectsInHomeUri = explode(", ", $stringProjectUri);

        foreach ($arrayOfProjectsInHomeUri as $uriProject) {
            array_push($arrayOfProjectsInHome, Projects::getProjectByUri($uriProject));
        }

        return $arrayOfProjectsInHome;
    }
}
<?php

/**
 * Created by PhpStorm.
 * User: yann
 * Date: 25.09.18
 * Time: 17:41
 */
class Contact
{

    public static function getAllAbout()
    {
        $data   = page('about');
        $team   = page('about')->children()->visible();
        $links  = page('about/links')->children();

        $json['about'] = array(
            'url' => (string)$data->url(),
            'general_presentation_french'   => (string)$data->general_presentation_french()->kirbytext(),
            'general_presentation_english'  => (string)$data->general_presentation_english()->kirbytext(),
//            'etude_plan_french'             => (string)$data->etude_plan_french()->kirbytext(),
//            'etude_plan_english'            => (string)$data->etude_plan_english()->kirbytext(),
//            'general_informations_french'   => (string)$data->general_informations_french()->kirbytext(),
//            'general_informations_english'  => (string)$data->general_informations_english()->kirbytext(),
            'external_link_about'           => (string)$data->external_link_about()->kirbytext(),
        );
        $json['team'] = array();
        foreach ($team as $onemember) {
            $json['team'][] = array(
                'name_team' => (string)$onemember->name_team(),
                'position_team' => (string)$onemember->position_team(),
                'about_team' => (string)$onemember->about_team(),
                'external_link_team' => (string)$onemember->external_link_team(),
                'email_team' => (string)$onemember->email_team()
            );
        }

        $json["links"] = [];
        foreach ($links as $link) {
            $json['links'][] = array(
                'title' => (string)$link->title(),
                'link_value' => (string)$link->link_value(),

//                'name_team' => (string)$onemember->name_team(),
//                'position_team' => (string)$onemember->position_team(),
//                'about_team' => (string)$onemember->about_team(),
//                'external_link_team' => (string)$onemember->external_link_team(),
//                'email_team' => (string)$onemember->email_team()
            );
        }

        return response::json($json);
    }
}
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
        $json['home'] = array(
            'url' => (string)$data->url(),
            'title' => (string)$data->title(),
            'text_introduction_french' => (string)$data->text_introduction_french(),
            'text_introduction_english' => (string)$data->text_introduction_english(),
            'text_events_french' => (string)$data->text_events_french(),
            'text_events_english' => (string)$data->text_events_english(),
            'text_workshop_french' => (string)$data->text_workshop_french(),
            'text_workshop_english' => (string)$data->text_workshop_english(),
            'text_seminaire_french' => (string)$data->text_seminaire_french(),
            'text_seminaire_english' => (string)$data->text_seminaire_english(),
        );
        return response::json($json);
    }
}
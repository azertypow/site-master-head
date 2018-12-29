<?php

/**
 * Created by PhpStorm.
 * User: yann
 * Date: 25.09.18
 * Time: 17:41
 */
class Alumnis
{

    public static function getAllAlumnis()
    {
        $dataalumnis = page('alumnis');
        $data = page('alumnis')->children()->visible();


        $json['info'] = array(
            'url' => (string)$dataalumnis->url(),
            'title' => (string)$dataalumnis->title(),
//            'text_description_french' => (string)$dataalumnis->text_description_francais(),
//            'text_description_english' => (string)$dataalumnis->text_description_anglais()
        );


        foreach ($data->sortBy('date_end_alumni', 'desc') as $oneproject) {
            $json['alumnis'][] = array(
                'url'                   => (string)$oneproject->url(),
                'prenom_alumni'         => (string)$oneproject->prenom_alumni(),
                'nom_alumni'            => (string)$oneproject->nom_alumni(),
                'year'                  => (string)$oneproject->date_end_alumni(),
                'actual_post_alumni'    => (string)$oneproject->actual_post_alumni(),
                'related_pp_alumni'     => (string)$oneproject->related_pp_alumni(),
                'related_thesis_alumni' => (string)$oneproject->related_thesis_alumni(),
                'website_perso_alumni'  => (string)$oneproject->website_alumni(),
                'email_perso_alumni'    => (string)$oneproject->email_alumni(),
                'external_link_alumni'  => (string)$oneproject->external_link_alumni()->kirbytext(),
            );
        }
        return response::json($json);
    }
}
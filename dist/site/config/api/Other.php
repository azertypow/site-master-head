<?php

/**
 * Created by PhpStorm.
 * User: yann
 * Date: 25.09.18
 * Time: 17:41
 */
class Other
{

    public static function getMinMaxDates()
    {


        $dataprojects = page('projects')->children()->visible()->sortBy('year', 'asc');
        $dataalumnis = page('alumnis')->children()->visible()->sortBy('date_end_alumni', 'asc');
        $datathesis = page('thesis')->children()->visible()->sortBy('year_thesis', 'asc');
        $json['minmaxdate']['projects'] = array(
            'min' => (string)$dataprojects->first()->year(),
            'max' => (string)$dataprojects->last()->year()
        );
        $json['minmaxdate']['alumnis'] = array(
            'min' => (string)$dataalumnis->first()->date_end_alumni(),
            'max' => (string)$dataalumnis->last()->date_end_alumni()
        );
        $json['minmaxdate']['thesis'] = array(
            'min' => (string)$datathesis->first()->year_thesis(),
            'max' => (string)$datathesis->last()->year_thesis()
        );

        return response::json($json);
    }
}
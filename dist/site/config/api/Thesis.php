<?php

/**
 * Created by PhpStorm.
 * User: yann
 * Date: 25.09.18
 * Time: 17:41
 */
class Thesis
{

    public static function getAllThesis()
    {
        $info = page('thesis');
        $data = page('thesis')->children()->visible()->paginate(10);

        $json['info'] = array(
            'title' => (string)$info->title(),
//            'text_description_french' => (string)$info->text_description_francais(),
//            'text_description_english' => (string)$info->text_description_anglais()
        );

        $json['thesis'] = array();
        $json['pages'] = $data->pagination()->countPages();
        $json['page'] = $data->pagination()->page();
        foreach ($data->sortBy('year', 'desc') as $oneproject) {
            $json['thesis'][] = array(
                'url' => (string)$oneproject->url(),
                'title_thesis_french' => (string)$oneproject->title_thesis_french(),
                'title_thesis_english' => (string)$oneproject->title_thesis_english(),
                'year' => (string)$oneproject->year_thesis(),
                'description_thesis_french' => (string)$oneproject->description_thesis_french(),
                'description_thesis_english' => (string)$oneproject->description_thesis_english(),
                'students_thesis' => (string)$oneproject->students_thesis(),
                'tuteurs_thesis' => (string)$oneproject->tuteurs_thesis(),
                'tags_thesis' => (string)$oneproject->tags_thesis(),
                'media' => $oneproject->files()->toArray($callback = null)
            );
        }
        return response::json($json);
    }


    public static function getAllTags()
    {
        $alltags = page('thesis')->children()->visible()->pluck('tags', '/', true);
        return response::json($alltags);
    }


}
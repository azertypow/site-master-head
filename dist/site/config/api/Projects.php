<?php

/**
 * Created by PhpStorm.
 * User: yann
 * Date: 25.09.18
 * Time: 17:41
 */
class Projects
{
    public static function getAllProjects()
    {
        $info = page('projects');
        $data = page('projects')->children()->visible();
        //->paginate(10) au cas ou : système de pagination


        $json['info'] = array(
            'title' => (string)$info->title(),
//            'text_description_french' => (string)$info->text_description_francais(),
//            'text_description_english' => (string)$info->text_description_anglais()
        );

        $json['project'] = array();
        //$json['pages'] = $data->pagination()->countPages();
        //$json['page'] = $data->pagination()->page();
        foreach ($data->sortBy('year', 'desc') as $oneproject) {

            $arrayOfImagesInProject = $oneproject->files()->filter(function($file) {
                return $file->type() == 'image';
            })->toArray();

            $json['project'][] = array(
                'url' => (string)$oneproject->url(),
                'title' => (string)$oneproject->title(),
                'year' => (string)$oneproject->year(),
                'description_french' => (string)$oneproject->description_french(),
                'description_english' => (string)$oneproject->description_english(),
                'students' => $oneproject->students()->yaml(),
                'tags' => (string)$oneproject->tags(),
                'appear_homepage' => (string)$oneproject->appears_homepage(),
                'event_pertinence' => (string)$oneproject->event_pertinence(),
                'workshop_pertinence' => (string)$oneproject->workshop_pertinence(),
                'seminar_pertinence' => (string)$oneproject->seminar_pertinence(),
                'appear_bandeau' => (string)$oneproject->appears_bandeau(),
                'text_bandeau_french'   => (string)$oneproject->text_bandeau_french()->kirbytext(),
                'text_bandeau_english'  => (string)$oneproject->text_bandeau_english()->kirbytext(),
                'appears_projects' => (string)$oneproject->appears_projects(),
                'media' => $oneproject->files()->toArray($callback = null),
                'media_generated' => Projects::getImagesGeneratedInProject($arrayOfImagesInProject),
            );
        }
        return response::json($json);
    }

    public static function getAllProjectsAppearHome()
    {
        $data = page('projects')->children()->visible()->filterBy('appears_homepage', 'true');
        $datatagedjson['project'] = array();
        foreach ($data->sortBy('year', 'desc') as $oneproject) {
            $datatagedjson['project'][] = array(
                'url' => (string)$oneproject->url(),
                'title' => (string)$oneproject->title(),
                'year' => (string)$oneproject->year(),
                'description_french' => (string)$oneproject->description_french(),
                'description_english' => (string)$oneproject->description_english(),
                'students' => $oneproject->students()->yaml(),
                'tags' => (string)$oneproject->tags(),
                'appear_homepage' => (string)$oneproject->appears_homepage(),
                'event_pertinence' => (string)$oneproject->event_pertinence(),
                'workshop_pertinence' => (string)$oneproject->workshop_pertinence(),
                'seminar_pertinence' => (string)$oneproject->seminar_pertinence(),
                'appear_bandeau' => (string)$oneproject->appears_bandeau(),
                'text_bandeau_french'   => (string)$oneproject->text_bandeau_french()->kirbytext(),
                'text_bandeau_english'  => (string)$oneproject->text_bandeau_english()->kirbytext(),
                'appears_projects' => (string)$oneproject->appears_projects(),
                'media' => $oneproject->files()->toArray($callback = null)
            );
        }
        return response::json($datatagedjson);
    }

    public static function getAllProjectsAppearBandeau()
    {
        $data = page('projects')->children()->visible()->filterBy('appears_bandeau', 'true');
        $datatagedjson['project'] = array();
        foreach ($data->sortBy('year', 'desc') as $oneproject) {
            $datatagedjson['project'][] = array(
                'url' => (string)$oneproject->url(),
                'title' => (string)$oneproject->title(),
                'year' => (string)$oneproject->year(),
                'description_french' => (string)$oneproject->description_french(),
                'description_english' => (string)$oneproject->description_english(),
                'students' => $oneproject->students()->yaml(),
                'tags' => (string)$oneproject->tags(),
                'appear_homepage' => (string)$oneproject->appears_homepage(),
                'event_pertinence' => (string)$oneproject->event_pertinence(),
                'workshop_pertinence' => (string)$oneproject->workshop_pertinence(),
                'seminar_pertinence' => (string)$oneproject->seminar_pertinence(),
                'appear_bandeau' => (string)$oneproject->appears_bandeau(),
                'text_bandeau_french'   => (string)$oneproject->text_bandeau_french()->kirbytext(),
                'text_bandeau_english'  => (string)$oneproject->text_bandeau_english()->kirbytext(),
                'appears_projects' => (string)$oneproject->appears_projects(),
                'media' => $oneproject->files()->toArray($callback = null)
            );
        }
        return response::json($datatagedjson);
    }

    public static function getAllProjectsByTag($letag)
    {
        /*$callback = function ($p) {
            $tags = $p->tags()->split('/');
            if (in_array('design fiction', $tags)) {
                return 'ok';
            }
            return 'not ok';
        };*/
        //$data = page('projects')->children()->visible()->group($callback);
        $info = page('projects');
        $data = page('projects')->children()->visible()->filterBy('tags', urldecode($letag), '/');


        $datatagedjson['info'] = array(
            'title' => (string)$info->title(),
//            'text_description_french' => (string)$info->text_description_francais(),
//            'text_description_english' => (string)$info->text_description_anglais()
        );


        $datatagedjson['project'] = array();
        foreach ($data->sortBy('year', 'desc') as $oneproject) {
            $datatagedjson['project'][] = array(
                'url' => (string)$oneproject->url(),
                'title' => (string)$oneproject->title(),
                'year' => (string)$oneproject->year(),
                'description_french' => (string)$oneproject->description_french(),
                'description_english' => (string)$oneproject->description_english(),
                'students' => $oneproject->students()->yaml(),
                'tags' => (string)$oneproject->tags(),
                'appear_homepage' => (string)$oneproject->appears_homepage(),
                'event_pertinence' => (string)$oneproject->event_pertinence(),
                'workshop_pertinence' => (string)$oneproject->workshop_pertinence(),
                'seminar_pertinence' => (string)$oneproject->seminar_pertinence(),
                'appear_bandeau' => (string)$oneproject->appears_bandeau(),
                'text_bandeau_french'   => (string)$oneproject->text_bandeau_french()->kirbytext(),
                'text_bandeau_english'  => (string)$oneproject->text_bandeau_english()->kirbytext(),
                'appears_projects' => (string)$oneproject->appears_projects(),
                'media' => $oneproject->files()->toArray($callback = null)
            );
        }
        return response::json($datatagedjson);

        /*   foreach ($data as $tagName => $projects) {
               if ($tagName === 'ok') {
                   $collectiontagedprojects->add($projects);
                   foreach ($projects->sortBy('year', 'desc') as $onegoodproject) {
                       //echo $tagName . ' : ';
                       //echo $onetagedproject->description_french() . '<br>';
                       $datatagedjson['project'][] = array(
                           'url' => (string)$onegoodproject->url(),
                           'title' => (string)$onegoodproject->title(),
                           'date' => (string)$onegoodproject->year(),
                           'tags' => (string)$onegoodproject->tags()
                       );
                   }
               } elseif ($tagName === 'not ok') {
                   foreach ($projects->sortBy('title') as $onebadproject) {
                       //echo $tagName . ' : ';
                       //echo $onebadproject->title() . '<br>';
                   }
               }
           }*/
        //$data = page('projects')->children()->visible()->paginate(10);
        //$json['project'] = array();
        //$json['pages'] = $data->pagination()->countPages();
        //$json['page'] = $data->pagination()->page();
        //return response::json($collectiontagedprojects);
        //return response::json($data);
    }

    public static function getAllProjectsByTagYear($letag, $from, $to)
    {
        $info = page('projects');
        $data = page('projects')->children()->visible()->filterBy('tags', urldecode($letag), '/')->filterBy('appears_projects', 'true');
        $collection = $data->filterBy('year', '>=', $from)->filterBy('year', '<=', $to);


        $datatagedjson['info'] = array(
            'title' => (string)$info->title(),
//            'text_description_french' => (string)$info->text_description_francais(),
//            'text_description_english' => (string)$info->text_description_anglais()
        );


        $datatagedjson['project'] = array();
        foreach ($collection->sortBy('year', 'desc') as $oneproject) {
            $datatagedjson['project'][] = array(
                'url' => (string)$oneproject->url(),
                'title' => (string)$oneproject->title(),
                'year' => (string)$oneproject->year(),
                'description_french' => (string)$oneproject->description_french(),
                'description_english' => (string)$oneproject->description_english(),
                'students' => $oneproject->students()->yaml(),
                'tags' => (string)$oneproject->tags(),
                'appear_homepage' => (string)$oneproject->appears_homepage(),
                'event_pertinence' => (string)$oneproject->event_pertinence(),
                'workshop_pertinence' => (string)$oneproject->workshop_pertinence(),
                'seminar_pertinence' => (string)$oneproject->seminar_pertinence(),
                'appear_bandeau' => (string)$oneproject->appears_bandeau(),
                'text_bandeau_french'   => (string)$oneproject->text_bandeau_french()->kirbytext(),
                'text_bandeau_english'  => (string)$oneproject->text_bandeau_english()->kirbytext(),
                'appears_projects'      => (string)$oneproject->appears_projects(),
                'media'                 => $oneproject->files()->toArray($callback = null)
            );
        }
        return response::json($datatagedjson);
    }


    public static function getAllTags()
    {
        $alltags = page('projects')->children()->visible()->pluck('tags', '/', true);
        return response::json($alltags);
    }


    public static function getContent()
    {
        //example multilang
        site()->visit('blog', 'en');
        $data = page()->children()->visible()->paginate(10);
        $json['project'] = array();
        $json['pages'] = $data->pagination()->countPages();
        $json['page'] = $data->pagination()->page();
        foreach ($data as $oneproject) {
            $json['project'][] = array(
                'url' => (string)$oneproject->url(),
                'title' => (string)$oneproject->title(),
                'date' => (string)$oneproject->date(),
                'text' => (string)$oneproject->text(),
                'media' => json_decode($oneproject->files()->toJson()),
            );
        }
        return response::json($json);
    }

    public static function getImagesGeneratedInProject($arrayOfImageInProject) {
        $arrayOfImagesGenerated = array();

        foreach ($arrayOfImageInProject as $imageInProject) {

            array_push($arrayOfImagesGenerated, [
                'origin'    => $imageInProject,
                'generated' => Projects::getImagesGeneratedOfImageInProject($imageInProject),
            ]);
        }

        return $arrayOfImagesGenerated;
    }

    public static function getImagesGeneratedOfImageInProject($imageInProject) {
        $folderNameOfGeneratedImages   = c::get('mmd.image.folderName', 'generated');
        $arrayOfImageParameters         = c::get('mmd.image.parameters', array());

        $folderPathForGeneratedImages = $imageInProject['diruri'] . '/'. $folderNameOfGeneratedImages .'/';

        $arrayOfImagesGeneratedUrl = array();

        foreach ($arrayOfImageParameters as $imageParametersName => $imageParameter) {
            $urlOfImageGenerated = Projects::getUrlOfImageGenerated($imageInProject, $folderPathForGeneratedImages, $imageParameter);
            $arrayOfImagesGeneratedUrl[$imageParametersName] = $urlOfImageGenerated;
        }

        return [
            'origin'    => $imageInProject,
            'generated' => $arrayOfImagesGeneratedUrl,
        ];
    }

    public static function getUrlOfImageGenerated($imageInProject, $folderPathForGeneratedImages, $imageParameter) {
        $url = pathinfo($imageInProject['url'])['dirname'];

        $pathForFinalGeneratedImage = $folderPathForGeneratedImages . $imageInProject['name'] . $imageParameter['extensionName'] . "." .$imageInProject['extension'];

        return $url . $pathForFinalGeneratedImage;
    }
}
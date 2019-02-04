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
                'max-size'              => Projects::getMaximumFileUploadSize(),
                'version'              => phpversion(),
                'uri'                   => $oneproject->uri(),
                'url'                   => (string)$oneproject->url(),
                'title'                 => (string)$oneproject->title(),
                'year'                  => (string)$oneproject->year(),
                'description_french'    => (string)$oneproject->description_french()->kirbytext(),
                'description_english'   => (string)$oneproject->description_english()->kirbytext(),
                'students'              => $oneproject->students()->yaml(),
                'tags'                  => (string)$oneproject->tags(),
                'appear_homepage'       => (string)$oneproject->appears_homepage(),
                'event_pertinence'      => (string)$oneproject->event_pertinence(),
                'workshop_pertinence'   => (string)$oneproject->workshop_pertinence(),
                'seminar_pertinence'    => (string)$oneproject->seminar_pertinence(),
                'appear_bandeau'        => (string)$oneproject->appears_bandeau(),
                'text_bandeau_french'   => (string)$oneproject->text_bandeau_french()->kirbytext(),
                'text_bandeau_english'  => (string)$oneproject->text_bandeau_english()->kirbytext(),
                'appears_projects'      => (string)$oneproject->appears_projects(),
                'media'                 => $oneproject->files()->toArray($callback = null),
                'media_generated'       => Projects::getImagesGeneratedInProject($arrayOfImagesInProject),
            );
        }
        return response::json($json);
    }

    public static function getProjectByUri($uri) {
        $data = page("$uri");

        if($data) {

            $arrayOfImagesInProject = $data->files()->filter(function($file) {
                return $file->type() == 'image';
            })->toArray();

            $datatagedjson = array(
                'uri'                   => $data->uri(),
                'url'                   => (string)$data->url(),
                'title'                 => (string)$data->title(),
                'year'                  => (string)$data->year(),
                'description_french'    => (string)$data->description_french()->kirbytext(),
                'description_english'   => (string)$data->description_english()->kirbytext(),
                'students'              => $data->students()->yaml(),
                'tags'                  => (string)$data->tags(),
                'appear_homepage'       => (string)$data->appears_homepage(),
                'event_pertinence'      => (string)$data->event_pertinence(),
                'workshop_pertinence'   => (string)$data->workshop_pertinence(),
                'seminar_pertinence'    => (string)$data->seminar_pertinence(),
                'appear_bandeau'        => (string)$data->appears_bandeau(),
                'text_bandeau_french'   => (string)$data->text_bandeau_french()->kirbytext(),
                'text_bandeau_english'  => (string)$data->text_bandeau_english()->kirbytext(),
                'appears_projects'      => (string)$data->appears_projects(),
                'media'                 => $data->files()->toArray($callback = null),
                'media_generated'       => Projects::getImagesGeneratedInProject($arrayOfImagesInProject),
            );
        } else {
            $datatagedjson = null;
        }

        return response::json($datatagedjson);
    }

    public static function getAllProjectsAppearHome()
    {
        $data = page('projects')->children()->visible()->filterBy('appears_homepage', 'true');
        $datatagedjson['project'] = array();

        foreach ($data->sortBy('year', 'desc') as $oneproject) {

            $arrayOfImagesInProject = $oneproject->files()->filter(function($file) {
                return $file->type() == 'image';
            })->toArray();

            $datatagedjson['project'][] = array(
                'uri'                   => $oneproject->uri(),
                'url'                   => (string)$oneproject->url(),
                'title'                 => (string)$oneproject->title(),
                'year'                  => (string)$oneproject->year(),
                'description_french'    => (string)$oneproject->description_french()->kirbytext(),
                'description_english'   => (string)$oneproject->description_english()->kirbytext(),
                'students'              => $oneproject->students()->yaml(),
                'tags'                  => (string)$oneproject->tags(),
                'appear_homepage'       => (string)$oneproject->appears_homepage(),
                'event_pertinence'      => (string)$oneproject->event_pertinence(),
                'workshop_pertinence'   => (string)$oneproject->workshop_pertinence(),
                'seminar_pertinence'    => (string)$oneproject->seminar_pertinence(),
                'appear_bandeau'        => (string)$oneproject->appears_bandeau(),
                'text_bandeau_french'   => (string)$oneproject->text_bandeau_french()->kirbytext(),
                'text_bandeau_english'  => (string)$oneproject->text_bandeau_english()->kirbytext(),
                'appears_projects'      => (string)$oneproject->appears_projects(),
                'media'                 => $oneproject->files()->toArray($callback = null),
                'media_generated'       => Projects::getImagesGeneratedInProject($arrayOfImagesInProject),
            );
        }
        return response::json($datatagedjson);
    }

    public static function getAllProjectsAppearBandeau()
    {
        $data = page('projects')->children()->visible()->filterBy('appears_bandeau', 'true');
        $datatagedjson['project'] = array();

        foreach ($data->sortBy('year', 'desc') as $oneproject) {

            $arrayOfImagesInProject = $oneproject->files()->filter(function($file) {
                return $file->type() == 'image';
            })->toArray();

            $datatagedjson['project'][] = array(
                'uri'                   => $oneproject->uri(),
                'url'                   => (string)$oneproject->url(),
                'title'                 => (string)$oneproject->title(),
                'year'                  => (string)$oneproject->year(),
                'description_french'    => (string)$oneproject->description_french()->kirbytext(),
                'description_english'   => (string)$oneproject->description_english()->kirbytext(),
                'students'              => $oneproject->students()->yaml(),
                'tags'                  => (string)$oneproject->tags(),
                'appear_homepage'       => (string)$oneproject->appears_homepage(),
                'event_pertinence'      => (string)$oneproject->event_pertinence(),
                'workshop_pertinence'   => (string)$oneproject->workshop_pertinence(),
                'seminar_pertinence'    => (string)$oneproject->seminar_pertinence(),
                'appear_bandeau'        => (string)$oneproject->appears_bandeau(),
                'text_bandeau_french'   => (string)$oneproject->text_bandeau_french()->kirbytext(),
                'text_bandeau_english'  => (string)$oneproject->text_bandeau_english()->kirbytext(),
                'appears_projects'      => (string)$oneproject->appears_projects(),
                'media'                 => $oneproject->files()->toArray($callback = null),
                'media_generated'       => Projects::getImagesGeneratedInProject($arrayOfImagesInProject),
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

            $arrayOfImagesInProject = $oneproject->files()->filter(function($file) {
                return $file->type() == 'image';
            })->toArray();

            $datatagedjson['project'][] = array(
                'uri'                   => $oneproject->uri(),
                'url'                   => (string)$oneproject->url(),
                'title'                 => (string)$oneproject->title(),
                'year'                  => (string)$oneproject->year(),
                'description_french'    => (string)$oneproject->description_french()->kirbytext(),
                'description_english'   => (string)$oneproject->description_english()->kirbytext(),
                'students'              => $oneproject->students()->yaml(),
                'tags'                  => (string)$oneproject->tags(),
                'appear_homepage'       => (string)$oneproject->appears_homepage(),
                'event_pertinence'      => (string)$oneproject->event_pertinence(),
                'workshop_pertinence'   => (string)$oneproject->workshop_pertinence(),
                'seminar_pertinence'    => (string)$oneproject->seminar_pertinence(),
                'appear_bandeau'        => (string)$oneproject->appears_bandeau(),
                'text_bandeau_french'   => (string)$oneproject->text_bandeau_french()->kirbytext(),
                'text_bandeau_english'  => (string)$oneproject->text_bandeau_english()->kirbytext(),
                'appears_projects'      => (string)$oneproject->appears_projects(),
                'media'                 => $oneproject->files()->toArray($callback = null),
                'media_generated'       => Projects::getImagesGeneratedInProject($arrayOfImagesInProject),
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

            $arrayOfImagesInProject = $oneproject->files()->filter(function($file) {
                return $file->type() == 'image';
            })->toArray();

            $datatagedjson['project'][] = array(
                'uri'                   => $oneproject->uri(),
                'url'                   => (string)$oneproject->url(),
                'title'                 => (string)$oneproject->title(),
                'year'                  => (string)$oneproject->year(),
                'description_french'    => (string)$oneproject->description_french()->kirbytext(),
                'description_english'   => (string)$oneproject->description_english()->kirbytext(),
                'students'              => $oneproject->students()->yaml(),
                'tags'                  => (string)$oneproject->tags(),
                'appear_homepage'       => (string)$oneproject->appears_homepage(),
                'event_pertinence'      => (string)$oneproject->event_pertinence(),
                'workshop_pertinence'   => (string)$oneproject->workshop_pertinence(),
                'seminar_pertinence'    => (string)$oneproject->seminar_pertinence(),
                'appear_bandeau'        => (string)$oneproject->appears_bandeau(),
                'text_bandeau_french'   => (string)$oneproject->text_bandeau_french()->kirbytext(),
                'text_bandeau_english'  => (string)$oneproject->text_bandeau_english()->kirbytext(),
                'appears_projects'      => (string)$oneproject->appears_projects(),
                'media'                 => $oneproject->files()->toArray($callback = null),
                'media_generated'       => Projects::getImagesGeneratedInProject($arrayOfImagesInProject),
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
        $folderNameOfGeneratedImages    = c::get('mmd.image.folderName', 'generated');
        $arrayOfImageParameters         = c::get('mmd.image.parameters', array());

        $folderPathForGeneratedImages = $imageInProject['diruri'] . '/'. $folderNameOfGeneratedImages .'/';

        $arrayOfImagesGeneratedUrl = array();

        foreach ($arrayOfImageParameters as $imageParametersName => $imageParameter) {
            $urlOfImageGenerated = Projects::getUrlOfImageGenerated($imageInProject, $folderPathForGeneratedImages, $imageParameter);
            $arrayOfImagesGeneratedUrl[$imageParametersName] = $urlOfImageGenerated;
        }

        return $arrayOfImagesGeneratedUrl;
    }

    public static function getUrlOfImageGenerated($imageInProject, $folderPathForGeneratedImages, $imageParameter) {
        $url = pathinfo($imageInProject['url'])['dirname'];

        $pathForFinalGeneratedImage = $folderPathForGeneratedImages . $imageInProject['name'] . $imageParameter['extensionName'] . "." .$imageInProject['extension'];

        return $url . $pathForFinalGeneratedImage;
    }

    /**
     * This function returns the maximum files size that can be uploaded
     * in PHP
     * @returns int File size in bytes
     **/
    public static function getMaximumFileUploadSize()
    {
        return min(Projects::convertPHPSizeToBytes(ini_get('post_max_size')), Projects::convertPHPSizeToBytes(ini_get('upload_max_filesize')));
    }

    /**
     * This function transforms the php.ini notation for numbers (like '2M') to an integer (2*1024*1024 in this case)
     *
     * @param string $sSize
     * @return integer The value in bytes
     */
    public static function convertPHPSizeToBytes($sSize)
    {
        //
        $sSuffix = strtoupper(substr($sSize, -1));
        if (!in_array($sSuffix,array('P','T','G','M','K'))){
            return (int)$sSize;
        }
        $iValue = substr($sSize, 0, -1);
        switch ($sSuffix) {
            case 'P':
                $iValue *= 1024;
                break;
            // Fallthrough intended
            case 'T':
                $iValue *= 1024;
                break;
            // Fallthrough intended
            case 'G':
                $iValue *= 1024;
                break;
            // Fallthrough intended
            case 'M':
                $iValue *= 1024;
                break;
            // Fallthrough intended
            case 'K':
                $iValue *= 1024;
                break;
        }
        return (int)$iValue;
    }
}
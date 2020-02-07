<?php

class GlobalData
{
    public static function getGlobalData() {
        return response::json(array(
            'projects'  => self::_getPageData('projects'),
            'thesis'    => self::_getPageData('thesis'),
            'alumni'    => self::_getPageData('alumnis'),
            'contact'   => self::_getPageData('about'),
        ));
    }

    /**
     * @param $pageName string
     * @return array
     */
    private static function _getPageData($pageName) {

        $pageInfo = page($pageName);

        return array(
            'url'       => (string)$pageInfo->url(),
            'title_fr'  => (string)$pageInfo->title_fr(),
            'title_en'  => (string)$pageInfo->title_en(),
        );
    }
}

<?php

// Shrink large images on upload
kirby()->hook([
        'panel.file.upload',
        'panel.file.replace',
        'panel.file.rename',
        'panel.file.update',
    ],
    function($file) {
        $folderNameForGeneratedImages = c::get('mmd.image.folderName', 'generated');
        $arrayOfImageParameters = c::get('mmd.image.parameters', array());

        try {
            if($file->type() == 'image') {
//                foreach ($arrayOfImageParameters as $imageParameter) {
//                    generatedImageSize($file, $imageParameter, $folderNameForGeneratedImages);
//                }

//                $file->copy($file->dir() . '/'. $folderNameForGeneratedImages .'/' . $file->name() . "." .$file->extension());

                resizeOriginalImageAndSaveIt($file, $folderNameForGeneratedImages);

            }
        } catch (Exception $e) {
            return response::error($e->getMessage());
        }
});

function putImageGeneratedToGeneratedImageFolder($tempImageGeneratedPath, $pathForFinalGeneratedImage) {
    copy($tempImageGeneratedPath, $pathForFinalGeneratedImage);
    unlink($tempImageGeneratedPath);
}

function generatedImageSize($file, $imageParameter, $folderNameForGeneratedImages) {
    $tempImageGenerated = $file->thumb($imageParameter['config']);

    $tempImageGeneratedPath = $tempImageGenerated->dir() . '/' . $tempImageGenerated->filename();

    $folderPathForGeneratedImages = $file->dir() . '/'. $folderNameForGeneratedImages .'/';

    if(! is_dir($folderPathForGeneratedImages)) {
        mkdir($folderPathForGeneratedImages);
    }

    $pathForFinalGeneratedImage = $folderPathForGeneratedImages . $file->name() . $imageParameter['extensionName'] . "." .$file->extension();

    putImageGeneratedToGeneratedImageFolder($tempImageGeneratedPath, $pathForFinalGeneratedImage);
}

function resizeOriginalImageAndSaveIt($file, $folderNameForGeneratedImages) {
    $folderPathForGeneratedImages = $file->dir() . '/'. $folderNameForGeneratedImages .'/';

    if(! is_dir($folderPathForGeneratedImages)) {
        mkdir($folderPathForGeneratedImages);
    }

    // save originalImage
    $file->copy($folderPathForGeneratedImages . $file->name() . "." .$file->extension());




    $regularParams = c::get('mmd.image.parameters', array())['regular'];

    $tempImageGenerated = $file->thumb($regularParams['config']);

    $tempImageGeneratedPath = $tempImageGenerated->dir() . '/' . $tempImageGenerated->filename();

    $pathForFinalGeneratedImage = $file->dir() . '/' . $file->name() . "." .$file->extension();

    putImageGeneratedToGeneratedImageFolder($tempImageGeneratedPath, $pathForFinalGeneratedImage);
}
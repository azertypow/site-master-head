<?php
namespace Tools {

    use Kirby\Panel\Collections\Files;
    use Kirby\Panel\Models\File;

    /**
     * @param Files $files
     * @return \Collection
     */
    function filterImagesFiles(Files $files ) {

        /**
         * @param File $file
         * @return bool
         * @var \func $kirbyFuncFilter
         */
        $kirbyFuncFilter = function( File $file ) {
            return $file->type() === "image";
        };

        return $files->filter( $kirbyFuncFilter );

    }

    /**
     * @param \Files $files
     * @return ImageMultiSizeData[]
     */
    function getImageMultiSizeDataFromArray(\Files $files) {
        /** @var ImageMultiSizeData[] $arrayToReturn */
        $arrayToReturn = [];

        foreach( $files as $file ) {
            array_push( $arrayToReturn, new ImageMultiSizeData( $file ) );
        }

        return $arrayToReturn;
    }

    class ImageMultiSizeData {
        /** @var array $origin */
        public $origin;
        /** @var array $icon */
        public $icon;
        /** @var array $small */
        public $small;
        /** @var array $large */
        public $large;

        public function __construct(\File $file)
        {

            $sizeIcon   = new ImageSize(50, 50);
            $sizeSmall  = new ImageSize(500, 500);
            $sizeLarge  = new ImageSize(2200, 2200);

            $this->origin    = $file->toArray();
            $this->icon      = $file->resize($sizeIcon  ->  width, $sizeIcon   -> height)->toArray();
            $this->small     = $file->resize($sizeSmall ->  width, $sizeSmall  -> height)->toArray();
            $this->large     = $file->resize($sizeLarge ->  width, $sizeLarge  -> height)->toArray();
        }

    }

    class ImageSize {

        public $width;
        public $height;

        public function __construct(int $width, int $height)
        {
            $this->width  =   $width;
            $this->height =  $height;
        }
    }
}

<?php snippet('header') ?>

<h1><?php echo $page->title_thesis_french()->html() ?></h1>
<h1><?php echo $page->title_thesis_english()->html() ?></h1>
<p><?php echo $page->year_thesis()->html() ?></p>
<p><?php echo $page->description_thesis_french()->html() ?></p>
<p><?php echo $page->description_thesis_english()->html() ?></p>
<p><?php echo $page->students_thesis()->html() ?></p>
<p><?php echo $page->tuteurs_thesis()->html() ?></p>
<p><?php echo $page->tags_thesis()->html() ?></p>

<?php snippet('footer') ?>
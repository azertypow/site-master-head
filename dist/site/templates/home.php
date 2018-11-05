<?php snippet('header') ?>

<h1><?php echo $page->title()->html() ?></h1>
<p><?php echo $page->text()->html() ?></p>

<p>

    MENU
<?php foreach($pages->visible() as $item): ?>
    <p><?= $item->title()->html() ?></p>
<?php endforeach ?>

</p>

<?php snippet('footer') ?>
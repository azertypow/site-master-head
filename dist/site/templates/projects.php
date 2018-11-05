<?php snippet('header') ?>

  <main class="main" role="main">

    <header class="wrap">
      <h1><?= $page->title()->html() ?></h1>
      <div class="intro text">
        <?= $page->text()->kirbytext() ?>
      </div>


    </header>

  </main>

<?php snippet('footer') ?>
<script src="assets/js/jquery.min.js"></script>
<script src="assets/js/myscript-test.js"></script>

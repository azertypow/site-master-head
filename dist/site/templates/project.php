<?php snippet('header') ?>

  <main class="main" role="main">

    <header class="wrap">
      <h1><?= $page->title()->html() ?></h1>
      <p><?= $page->year()->html() ?></p>
      <p><?= $page->description_french()->html() ?></p>
      <p><?= $page->description_english()->html() ?></p>
      <p><?= $page->students()->html() ?></p>
      <p><?= $page->tags()->html() ?></p>
        <h5>event_pertinence : <?= $page->event_pertinence()->html() ?></h5>
        <h5>workshop_pertinence : <?= $page->workshop_pertinence()->html() ?></h5>
        <h5>seminar_pertinence : <?= $page->seminar_pertinence()->html() ?></h5>
        <h2>appears_bandeau : <?= $page->appears_bandeau()->html() ?></h2>
        <h5>text_bandeau : <?= $page->text_bandeau()->html() ?></h5>
        <h2>appears_projects : <?= $page->appears_projects()->html() ?></h2>


    </header>

  </main>

<?php snippet('footer') ?>
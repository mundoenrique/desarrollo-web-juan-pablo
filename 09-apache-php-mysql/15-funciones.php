<?php

declare(strict_types=1);
include 'includes/header.php';

function sumar(array $numero2, int $numero1 = 0)
{
  echo $numero1 + $numero2;
}

sumar([], 10);

include 'includes/footer.php';

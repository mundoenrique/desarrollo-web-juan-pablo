<?php
include_once 'includes/header.php';

$nombre = 'Juan <br>';
$_nombre = 'Enrique <br>';
$nombre_ = 'Yajaira <br>';

echo $nombre;
var_dump($nombre);

echo $_nombre;
var_dump($_nombre);

echo $nombre_;
var_dump($nombre_);

$nombre = 'María <br>';
echo $nombre;
var_dump($nombre);

define('CONSTANTE', '<br>valor de la constante <br>');
echo CONSTANTE;

const CONSTANTE2 = 'otra constante<br>';
echo CONSTANTE2;

$nombreLCiente = 'Jesús';
$nombre_cliente = 'Teresa';

include_once 'includes/footer.php';

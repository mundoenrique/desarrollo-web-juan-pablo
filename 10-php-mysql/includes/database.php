<?php

$db = mysqli_connect('localhost:3301', 'admin_user', '123456', 'appsalon');

if (!$db) {
  echo "Hubo un error";
  exit;
}

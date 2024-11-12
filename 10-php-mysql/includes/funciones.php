<?php

function obtenerServicios()
{
  try {
    // Importar las credenciales
    require_once 'database.php';

    // Consulta SQL
    $sql = "SELECT * FROM servicios;";

    // Realizar la consulta
    $consulta = mysqli_query($db, $sql);

    if (!$consulta) {
      exit;
    }

    return $consulta;
  } catch (\Throwable $th) {
    var_dump($th);
  }
}

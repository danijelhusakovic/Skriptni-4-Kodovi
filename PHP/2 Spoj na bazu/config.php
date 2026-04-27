<?php
mysqli_report(MYSQLI_REPORT_OFF);
error_reporting(0);
$conn = mysqli_connect('localhost', 'root', '', 'ispit');

if(!$conn)
    {
        die("Greška pri spajanju: " . mysqli_connect_error());
    }
    else {
        echo "Uspješno si spojen na bazu";
    }
?>
<?php

mysqli_report(MYSQLI_REPORT_OFF);
$conn = mysqli_connect('localhost', 'root', '', 'ispit');

if(!$conn)
    {
        die("Greška: " . mysqli_connect_error());
    }

    $sql = "SELECT * FROM ucenici";
    $result = mysqli_query($conn, $sql);

    echo "<table border = '1'
    <tr>
    <th><ID></th>
    <th>Ime</th>
    <th>Prezime</th>
    </tr>";

    while($row = mysqli_fetch_assoc($result))
        {
            echo "<tr>";
            echo "<td>" . $row['id'] . "</td>";
            echo "<td>" . $row['ime'] . "</td>";
            echo "<td>" . $row['prezime'] . "</td>";
            echo "</tr>";
        }

        echo "</table>";

?>
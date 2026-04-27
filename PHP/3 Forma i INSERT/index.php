<form method = "post">
    Ime: <input type = "text" name = "ime"><br>
    Prezime: <input type = "text" name = "prezime"><br>
    <input type = "submit" value = "Spremi">
</form>

<?php

mysqli_report(MYSQLI_REPORT_OFF);
$conn = mysqli_connect('localhost', 'root', '', 'ispit');

if(!$conn)
    {
        die("Greška: " . mysqli_connect_error());
    }

if($_POST)
    {
        $ime = $_POST['ime'];
        $prezime = $_POST['prezime'];

        $sql = "INSERT INTO ucenici (ime, prezime) VALUES ('$ime', '$prezime')";

        if(mysqli_query($conn, $sql))
            {
                echo "Podaci su spremljeni!";
            }
            else {
                echo "Greška: " . mysqli_error($conn);
            }
    }
?>
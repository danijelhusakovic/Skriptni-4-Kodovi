<form method = "post">
    Korisničko ime: <input type = "text" name = "username"><br>
    <input type = "submit" value = "Login">
</form>

<a href = "?logout=1">Logout </a>

<?php

session_start();
if($_POST)
    {
        $_SESSION['user'] = $_POST['username'];
    }

    if(isset($_SESSION['user'])) {
        echo "Pozdrav, " . $_SESSION['user'];
    }
    else {
        echo "Nisi prijavljen";
    }

    if(isset($_GET['logout']))
        {
            session_destroy();
        }
?>
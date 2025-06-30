<?php
// Simple dummy login logic (without database)

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = $_POST['email'];
    $password = $_POST['password'];

    // Dummy credentials (तुझं स्वतःचं लॉजिक इथे वापर)
    $dummy_email = "test@example.com";
    $dummy_password = "123456";

    if ($email === $dummy_email && $password === $dummy_password) {
        echo "<h2>Login Successful</h2>";
    } else {
        echo "<h2>Invalid Email or Password</h2>";
    }
} else {
    echo "Access Denied.";
}
?>

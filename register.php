<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $fullname = $_POST["fullname"];
    $email = $_POST["email"];
    $phone = $_POST["phone"];
    $password = $_POST["password"];
    $confirm = $_POST["confirm"];

    if ($password !== $confirm) {
        echo "❌ Passwords do not match!";
        exit();
    }

    $hashed = password_hash($password, PASSWORD_DEFAULT);

    $conn = new mysqli("localhost", "root", "Manmath@12345", "cleankart");
    if ($conn->connect_error) {
        die("❌ Connection failed: " . $conn->connect_error);
    }

    $check = $conn->prepare("SELECT id FROM users WHERE email = ? OR phone = ?");
    $check->bind_param("ss", $email, $phone);
    $check->execute();
    $check->store_result();

    if ($check->num_rows > 0) {
        echo "❌ Email or Phone already registered.";
        $check->close();
        $conn->close();
        exit();
    }
    $check->close();

    $stmt = $conn->prepare("INSERT INTO users (fullname, email, phone, password) VALUES (?, ?, ?, ?)");
    $stmt->bind_param("ssss", $fullname, $email, $phone, $hashed);

    if ($stmt->execute()) {
        // ✅ Auto-login and redirect
        session_start();
        $_SESSION["email"] = $email;
        $_SESSION["fullname"] = $fullname;

        header("Location: index.html?login=success");
        exit();
    } else {
        echo "❌ Error: " . $stmt->error;
    }

    $stmt->close();
    $conn->close();
} else {
    echo "Form not submitted correctly.";
}
?>

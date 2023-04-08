<?php
// Connect to the database
$servername = "localhost";
$username = "yourusername";
$password = "yourpassword";
$dbname = "yourdatabasename";

$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get the form data
$account_name = $_POST["account_name"];
$username = $_POST["username"];
$password = $_POST["password"];

// Prepare the SQL statement
$sql = "INSERT INTO passwords (account_name, username, password) VALUES ('$account_name', '$username', '$password')";

// Execute the SQL statement
if ($conn->query($sql) === TRUE) {
    echo "Password saved successfully!";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

// Close the database connection
$conn->close();
?>

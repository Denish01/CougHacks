<?php
// Connect to MongoDB
$mongo = new MongoDB\Driver\Manager("mongodb://localhost:27017");
$dbname = "password_manager";
$collection = "users";

// Get the form data
$username = $_POST["username"];
$password = $_POST["password"];
$confirm_password = $_POST["confirm_password"];

// Validate the input
if ($password != $confirm_password) {
  echo "Passwords do not match!";
} else {
  // Hash the password
  $hashed_password = password_hash($password, PASSWORD_DEFAULT);

  // Check if the username already exists in the database
  $filter = ["username" => $username];
  $query = new MongoDB\Driver\Query($filter);
  $result = $mongo->executeQuery("$dbname.$collection", $query)->toArray();

  if (count($result) > 0) {
    echo "Username already exists!";
  } else {
    // Insert the new user into the database
    $document = ["username" => $username, "password" => $hashed_password];
    $bulk = new MongoDB\Driver\BulkWrite();
    $bulk->insert($document);
    $mongo->executeBulkWrite("$dbname.$collection", $bulk);

    echo "User created successfully!";
  }
}
?>

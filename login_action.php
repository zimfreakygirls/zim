<?php
session_start();

$url = "https://script.google.com/macros/s/AKfycbzaLrAy1xMQrtThyAZCxwuQ85A0XWFeRgG1ZQK8YqCMnHxyHOfEpk7_fAZb8ldCEZGNnA/exec";
$postData = [
   "action" => "login",
   "email" => $_POST['email'],
   "password" => $_POST['password']
];

$ch = curl_init($url);
curl_setopt_array($ch, [
   CURLOPT_FOLLOWLOCATION => true,
   CURLOPT_RETURNTRANSFER => true,
   CURLOPT_POSTFIELDS => $postData
]);

$result = curl_exec($ch);
$result = json_decode($result, 1);

if($result['status'] == "success"){
   $_SESSION['user'] = $result['data'];
   header("location: https://zimfreakygirls.com/26!`10/");
}else{
   $_SESSION['error'] = $result['message'];
   header("location: https://zimfreakygirls.epizy.com/");
}


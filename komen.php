<?php
$mysqli = new mysqli("sql206.infinityfree.com", "if0_39284290_ASP", "myIF@2042", "if0_39284290_ASP");

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $artikel_id = $_POST['artikel_id'];
    $nama = $_POST['nama'];
    $komen = $_POST['komen'];
    $stmt = $mysqli->prepare('INSERT INTO komen (artikel_id, nama, komen, tarikh) VALUES (?, ?, ?, NOW())');
    $stmt->bind_param('sss', $artikel_id, $nama, $komen);
    $stmt->execute();
    echo json_encode(["status" => "ok"]);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $artikel_id = $_GET['artikel_id'];
    $result = $mysqli->query("SELECT nama, komen, tarikh FROM komen WHERE artikel_id='$artikel_id' ORDER BY tarikh DESC");
    $komen = $result->fetch_all(MYSQLI_ASSOC);
    echo json_encode($komen);
    exit;
}
?>

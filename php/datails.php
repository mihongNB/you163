<?php
header('content-type:text/html;charset=utf-8');
//header('location:http://10.31.162.113/skz/fifthweek/9.13/ak/xiangqing.html');

$id = $_GET['id'];

include "conn.php";

mysql_select_db('wy163');
mysql_query('set names utf8');
$result = mysql_query("select * from goodlist where id = $id");
echo json_encode(mysql_fetch_array($result, MYSQLI_ASSOC));

?>
<?php
header('content-type:text/html;charset=utf-8');
include "conn.php";

mysql_select_db('wy163');
mysql_query("set names utf8");
$result = mysql_query('select * from goodlist');
$goodarr = array();
for ($i = 0; $i < mysql_num_rows($result); $i++) {
    $goodarr[$i] = mysql_fetch_array($result, MYSQLI_ASSOC);
}
echo json_encode($goodarr);

?>
<?php
include "conn.php";
mysql_select_db('wy163');
mysql_query("set names utf8");
$result = mysql_query('select * from lunbo');
$picarr = array();
for ($i = 0; $i < mysql_num_rows($result); $i++) {
    $picarr[$i] = mysql_fetch_array($result, MYSQLI_ASSOC);
}
echo json_encode($picarr);

?>
<?php
include "conn.php";//引入数据库连接的文件

mysql_select_db('wy163');
mysql_query('SET NAMES UTF8');
if (isset($_POST['name'])) {//前端ajax传输过来的额
	$username = $_POST['name'];
	$password = md5($_POST['pass']);
} else {
	exit('非法操作');
}

$query = "select * from loginreg where username='$username' and password='$password'";
$result = mysql_query($query);

if (mysql_fetch_array($result)) {
	echo true;
} else {
	echo false;
}






	
	

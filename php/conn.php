<?php  
	//1.连接数据库--mysql_connect(主机名,用户名,密码);
	header('content-type:text/html;charset=utf-8');
	header("Access-Control-Allow-Origin: *");//解决跨域
	define('HOST','localhost');
	define('USERNAME','root');
	define('PASSWORD','');//密码是自己数据库的密码。
	$conn=@mysql_connect(HOST,USERNAME,PASSWORD);//@:简单的容错处理。
	if(!$conn){
		die('数据库连接失败'.mysql_error());
		//退出并返回括号里面的内容  mysql_error():报错信息。
	}



?>
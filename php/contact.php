<?php

	$array = array("firstname" => "", "name" => "", "email" => "", "phone" => "", "message" => "",
	"firstnameError" => "", "nameError" => "", "emailError" => "", "phoneError" => "", "messageError" => "", 
	"isSucces" => false);
	
	$emailTo = "adrianmonteil@gmail.com";

	if ($_SERVER["REQUEST_METHOD"] == "POST")
	{
		$array["firstname"] = verifyInput($_POST["firstname"]);
		$array["name"] = verifyInput($_POST["name"]);
		$array["email"] = verifyInput($_POST["email"]);
		$array["phone"] = verifyInput($_POST["phone"]);
		$array["message"] = verifyInput($_POST["message"]);
		$array["isSucces"] = true;
		$emailText = "";


		if(empty($array["firstname"]))
		{
			$array["firstnameError"] = "je veux connaitre ton prenom";
			$array["isSucces"] = false;
		}
		else
		{	
			$emailText .= "firstname: {$array["firstname"]}\n";
		}

		if(empty($array["name"]))
		{
			$array["nameError"] = "je veux connaitre ton nom";
			$array["isSucces"] = false;
		}
		else
		{
			$emailText .= "name: {$array["name"]}\n";
		}

		if(!isEmail($array["email"]))
		{
			$array["emailError"] = "je veux connaitre ton email";
			$array["isSucces"] = false;
		}
		else
		{
			$emailText .= "email: {$array["email"]}\n";
		}

		if(!isPhone($array["phone"]))
		{
			$array["phoneError"] = "rentre un vrai numero";
			$array["isSucces"] = false;
		}
		else
		{
			$emailText .= "phone: {$array["phone"]}\n";
		}
		

		if(empty($array["message"]))
		{
			$array["messageError"] = "je ne comprends pas";
			$array["isSucces"] = false;
		}
		else
		{
			$emailText .= "message: {$array["message"]}\n";
		}

		if($array["isSucces"])
		{
			$headers = "from: {$array["firstname"]} {$array["name"]} <{$array["email"]}>\r\nReply-To: {$array["email"]}";
			mail($emailTo, "Un message de votre site", $emailText, $headers);
		}

		echo json_encode($array);
	}


	function isPhone($var)
	{
		return preg_match("/^[0-9 ]*$/", $var);
	}

	function isEmail($var)
	{
		return filter_var($var, FILTER_VALIDATE_EMAIL);
	}

	function verifyInput($var)
	{
		$var = trim($var);
		$var = stripcslashes($var);
		$var = htmlspecialchars($var);

		return $var;
	}
 ?>
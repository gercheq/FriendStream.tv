<?php

    $user_email = $_REQUEST['email'];   // data from jQuery.post
    $user_ip = $_SERVER['REMOTE_ADDR'];
    $user_date = date('Y-m-d H:i:s');
    $subject = "New user - FriendStream.TV";
    $to = 'gercekk@gmail.com';
    $headers = 'MIME-Version: 1.0' . "\r\n";
    $headers .= 'Content-type: text/html; charset=utf-8' . "\r\n";

    $message = "New user signed up for the waiting list: " . $user_email . " Yay!";

    if ( mail( $to, $subject, $message ) ) {
        echo( '<h3>Thank You!</h3><p>We will send you an invite as soon as possible.</p>');
        /*
        echo (  "<br />DATE: " . $user_date .
                "<br />FROM: " . $user_email .
                "<br />IP: " . $user_ip );
        */
    }

    //
    // Connect To Database
    //
    $hostname='friendstream.db.3490720.hostedresource.com';
    $username='friendstream';
    $password='Buf9erbo@!q';
    $dbname='friendstream';
    $usertable='waiting_list';

    mysql_connect($hostname,$username, $password) OR DIE ('Unable to connect to database! Please try again later.');
    mysql_select_db($dbname);


    $con = mysql_connect($hostname,$username,$password);
    if (!$con) {
        die('Could not connect: ' . mysql_error());
    }

    mysql_select_db($usertable, $con);

    mysql_query("INSERT INTO waiting_list (email, ip, date) VALUES ('$user_email', '$user_ip', '$user_date')");

    mysql_close($con);
?>
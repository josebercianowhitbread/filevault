<%@include file="/libs/foundation/global.jsp"%>
<%@page session="false" 
        contentType="text/html; charset=utf-8" %>



<!DOCTYPE html>
<!--[if lt IE 7]> <html lang="en" class="no-js ie6 oldie"> <![endif]-->
<!--[if IE 7]>    <html lang="en" class="no-js ie7 oldie"> <![endif]-->
<!--[if IE 8]>    <html lang="en" class="no-js ie8 oldie"> <![endif]-->
<!--[if gt IE 8]><!-->
<html class='no-js' lang='en'>
  <!--<![endif]-->
  <cq:include script="head.jsp"/>
  <body>
    <div id='container'>
      <cq:include script="body.jsp"/>
      <div id='main' role='main'></div>
    </div>

    <cq:includeClientLib js="filevault.clientlib" />    

  </body>
</html>
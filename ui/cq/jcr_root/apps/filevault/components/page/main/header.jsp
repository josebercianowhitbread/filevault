<%@include file="/apps/filevault/global.jsp"%>
<%@page session="false"%>
<c:set var="currentDesign" value="<%= currentDesign.getPath() %>"/>

<header class="header-wrapper">
    <img class="header-logo" src="${currentDesign}/images/header.png" />
	<h1 class="header-text">Filevault Demo</h1>
</header>
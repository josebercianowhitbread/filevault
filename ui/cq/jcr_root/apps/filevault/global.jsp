<%@page session="false"
        import="com.day.cq.wcm.api.WCMMode"%>
<%@include file="/libs/foundation/global.jsp"%>
<c:set var="wcmMode"><%= WCMMode.fromRequest(request) != WCMMode.DISABLED %></c:set>
<c:set var="wcmModeEdit"><%= WCMMode.fromRequest(request) == WCMMode.EDIT %></c:set>
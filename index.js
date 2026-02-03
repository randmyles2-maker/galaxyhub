function doGet(e) {
  var targetUrl = e.parameter.url;
  
  // If no URL is provided, show a simple welcome message
  if (!targetUrl) {
    return HtmlService.createHtmlOutput("<h1>GalaxyHub Proxy Active</h1><p>Send a URL parameter to begin.</p>");
  }

  try {
    // Fetches the website you want to see
    var response = UrlFetchApp.fetch(targetUrl, {
      followRedirects: true,
      muteHttpExceptions: true
    });
    
    var content = response.getContentText();
    
    // This allows the content to be shown inside your driverspermit-edu.shop iframe
    return HtmlService.createHtmlOutput(content)
      .setTitle("Drivers Permit Resource")
      .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
  } catch (err) {
    return HtmlService.createHtmlOutput("<h1>Proxy Error</h1><p>" + err.toString() + "</p>");
  }
}

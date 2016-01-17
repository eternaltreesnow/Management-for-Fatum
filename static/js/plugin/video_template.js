function youkuTemplate(url) {
  if (!url) {
    return '';
  }
  var id;
  var match = url.match(/id_(.*)\.html/);
  if (!match) {
    return '';
  }
  id = match[1];
  return '<iframe height="498" src="http://player.youku.com/embed/' +
    id + '" frameborder=0 allowfullscreen style="width:100%;"></iframe>';
}

function qqTemplate(url) {
  if (!url) {
    return '';
  }
  var id;
  var match = url.match(/vid=([^&#]*)/);
  if (!match) {
    match = url.match(/\/([^\/]+)\.html/);
  }
  if (!match) {
    return '';
  }
  id = match[1];
  return '<iframe frameborder="0" height="498" src="http://v.qq.com/iframe/player.html?vid=' +
    id + '&tiny=0&auto=0" allowfullscreen="" style="width:100%;"></iframe>';
}

function getVideoHtmlTemplate(url) {
  var patterns = [{
    p: 'youku.com',
    t: 'youku'
  }, {
    p: 'v.qq.com',
    t: 'qq'
  }];
  var typeHandlers = {
    'youku': youkuTemplate,
    'qq': qqTemplate
  };
  var type;

  for (var i = 0, len = patterns.length; i < len; i++) {
    var pattern = patterns[i];
    if (url.indexOf(pattern.p) !== -1) {
      type = pattern.t;
      break;
    }
  }
  if (!typeHandlers[type]) {
    return '';
  }
  return typeHandlers[type](url);
}


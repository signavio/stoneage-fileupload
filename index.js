var uploadIndex = 0;

module.exports = function stoneAgeUpload(elements, url, formData, callback) {
  formData = formData || {};

  var iframeName = ['stoneage-fileupload', uploadIndex].join('-');
  uploadIndex++;

  // create iframe
  var iframe = document.createElement('iframe');
  iframe.id = iframeName;
  iframe.name = iframeName;
  iframe.style.display = 'none';
  iframe.src = 'javascript:false;'; // to prevent warning in IE6
  document.body.appendChild(iframe);

  // create form
  var form = document.createElement('form');
  form.method = 'POST';
  form.action = url;
  form.target = iframeName;
  form.encoding = form.enctype = 'multipart/form-data';
  form.style.display = 'none';

  // submit additional formData in hidden inputs
  for (name in formData) {
    var input = document.createElement('input');
    input.type = 'hidden';
    input.name = name;
    input.value = formData[name];
    form.appendChild(input);
  }

  document.body.appendChild(form);

  // move elements into the form, submit, move element back to original position,
  // and remove form
  var i;
  var l = elements.length;
  var nextSiblings = [];
  var unnamedInputs = [];
  var parents = [];
  for (i = 0; i < l; ++i) {
    // set 'files[]' as default name for inputs without name
    if (!elements[i].name) {
      unnamedInputs.push(elements[i]);
      elements[i].name = 'files[]';
    }
    nextSiblings.push(elements[i].nextSibling);
    parents.push(elements[i].parentNode);
    form.appendChild(elements[i]);
  }

  form.submit();

  iframe.onerror = iframe.onload = function() {
    // try to parse response, remove iframe, and pass response to callback
    var response;
    try {
      var responseStr = iframe.contentWindow.document.body.innerHTML;
      response = JSON.parse(responseStr);
    } catch(e) {
      response = responseStr;
    }
    iframe.parentNode.removeChild(iframe);
    callback(response);
  };

  for (i = l - 1; i >= 0; --i) {
    // unset default name attributes
    if (unnamedInputs.indexOf(elements[i]) >= 0) {
      elements[i].removeAttribute('name');
    }
    parents[i].insertBefore(elements[i], nextSiblings[i]);
  }
  form.parentNode.removeChild(form);
};

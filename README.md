# stoneage-fileupload

Internet Explorer <=9 does not support file upload via XHR (AJAX). This module provides a fallback mechanism using a `multipart/form-data` post to a hidden iframe.

It does nothing more than that, has zero dependencies, and is a plain CommonJS module.


## Installation

```
npm install --save stoneage-fileupload
```

## Example

```javascript
import fileupload from 'stoneage-fileupload'

const myFileInput = document.getElementById('myFileInput')

const handleUploaded = (response) => {
	console.log(`${myFileInput.value} has been succesfully uploaded.`)
	console.log(response)
}

myFileInput.onchange = () => {
	fileupload([myFileInput], '/upload', { authorization: 'foo' }, handleUploaded)
}
```

## API

```
fileupload(elements, url, params, callback)
```

- `elements` (*Array\<HTMLElement\>*) An array of file input elements. The files selected with these inputs will be uploaded.
- `url` (*string*) The URL of the upload endpoint.
- `params` (*Object*) Additional parameters which will be submitted as part of the form data.
- `callback` (*Function*) The callback function to be invoked when the upload finished. It will receive the parsed post response as an argument.

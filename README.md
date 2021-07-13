# Parvus

Parvus is an accessible, open-source image lightbox with no dependencies.

![Screenshot of Parvus. It shows the first picture of a gallery.](https://rqrauhvmra.com/parvus/parvus.png)

[Open in CodePen](https://codepen.io/collection/DwLBpz)

## Table of contents

- [Installation](#installation)
  - [Download](#download)
  - [Package managers](#package-managers)
- [Usage](#usage)
  - [Caption](#caption)
  - [Gallery](#gallery)
  - [scrset](#scrset)
- [Options](#options)
- [API](#api)
- [Events](#events)
- [Browser support](#browser-support)

## Installation

### Download

CSS: `dist/css/parvus.min.css` minified, or `dist/css/parvus.css` un-minified

JavaScript: `dist/js/parvus.min.js` minified, or `dist/js/parvus.js` un-minified

Linking the `.css` and `.js` files to your HTML file. The HTML code may look like this:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Page title</title>

  <!-- CSS -->
  <link href="path/to/parvus.min.css" rel="stylesheet">
</head>
<body>
  <!-- HTML content -->

  <!-- JS -->
  <script src="path/to/parvus.min.js"></script>
</body>
</html>
```

### Package managers

You can install Parvus through npm or yarn like any other dependency:

```
npm install parvus --save
```

```
yarn add parvus
```

Then you can import Parvus in your JavaScript codebase:

```js
import Parvus from 'parvus'
```

## Usage

The standard way of using Parvus is a linked thumbnail image with the class `lightbox` to a larger image:

```html
<a href="path/to/image.jpg" class="lightbox">
  <img src="path/to/thumbnail.jpg" alt="">
</a>
```

Initialize the script by running:

```js
const prvs = new Parvus()
```

### Caption

```html
<a href="path/to/image.jpg" class="lightbox" data-caption="I'm a caption">
  <img src="path/to/thumbnail.jpg" alt="">
</a>
```

### Gallery

If you have a group of related images that you would like to combine into a set, add the `data-group` attribute:

```html
<a href="path/to/image.jpg" class="lightbox" data-group="Berlin">
  <img src="path/to/thumbnail.jpg" alt="">
</a>

<a href="path/to/image_2.jpg" class="lightbox" data-group="Berlin">
  <img src="path/to/thumbnail_2.jpg" alt="">
</a>

//...

<a href="path/to/image_8.jpg" class="lightbox" data-group="Kassel">
  <img src="path/to/thumbnail_8.jpg" alt="">
</a>
```

Instead of `data-group`, you can also set the option `gallerySelector` to combine all images with the `selector` class within this selector into a group.

```html
<div class="gallery">
  <a href="path/to/image.jpg" class="lightbox">
    <img src="path/to/thumbnail.jpg" alt="">
  </a>

  <a href="path/to/image_2.jpg" class="lightbox">
    <img src="path/to/thumbnail_2.jpg" alt="">
  </a>

  // ...
</div>
```

```js
const prvs = new Parvus({
  gallerySelector: '.gallery',
})
```

### scrset

```html
<a href="path/to/image.jpg" class="lightbox" data-srcset="path/to/large.jpg 1200w, path/to/medium.jpg 1000w, path/to/small.jpg 700w">
  <img src="path/to/thumbnail.jpg" alt="">
</a>
```

## Options

You can pass an object with custom options as an argument.

```js
const prvs = new Parvus({
  lang: 'de',
  i18n: {
    en: {
      lightboxLabel: 'This is a dialog window which overlays the main content of the page. The modal shows the enlarged image. Pressing the Escape key will close the modal and bring you back to where you were on the page.',
      lightboxLoadingIndicatorLabel: 'Image loading',
      closeButtonLabel: 'Close dialog window'
    },
    de: {
      lightboxLabel: 'Dies ist ein Dialogfenster, das den Hauptinhalt der Seite überlagert. Das Modal zeigt das vergrößerte Bild. Durch Drücken der Escape-Taste wird das Modal geschlossen und Sie kehren an die Stelle zurück, an der Sie sich auf der Seite befanden.',
      lightboxLoadingIndicatorLabel: 'Bild wird geladen',
      closeButtonLabel: 'Dialogfenster schließen'
    }
  }
})
```

The following options are available:

```js
{
  // All elements with this class triggers Parvus
  selector: '.lightbox',

  // All `selector` in this `gallerySelector` are combined as a gallery. Overwrites the `data-group` attribute
  gallerySelector: null,

  // Click outside to close Parvus
  docClose: true,

  // Scroll to close Parvus
  scrollClose: false,

  // Swipe up to close Parvus
  swipeClose: true,

  // Touch dragging threshold (in px)
  threshold: 100,

  // Focus thumbnail from the last active slide after closing instead focus last active element before opening
  backFocus: true,

  // Specifies how many milliseconds (ms) the transition effects takes to complete
  transitionDuration: 300,

  // Specifies the speed curve of the transition effects
  transitionTimingFunction: 'cubic-bezier(0.2, 0, 0.2, 1)',

  // Icons
  lightboxIndicatorIcon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M8 3H5a2 2 0 00-2 2v3m18 0V5a2 2 0 00-2-2h-3m0 18h3a2 2 0 002-2v-3M3 16v3a2 2 0 002 2h3"/></svg>',
  previousButtonIcon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path stroke="none" d="M0 0h24v24H0z"/><polyline points="15 6 9 12 15 18" /></svg>',
  nextButtonIcon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path stroke="none" d="M0 0h24v24H0z"/><polyline points="9 6 15 12 9 18" /></svg>',
  closeButtonIcon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M18 6L6 18M6 6l12 12"/></svg>',

  // Internationalization
  lang: 'en',
  i18n: {
    en: {
      lightboxLabel: 'This is a dialog window which overlays the main content of the page. The modal shows the enlarged image. Pressing the Escape key will close the modal and bring you back to where you were on the page.',
      lightboxLoadingIndicatorLabel: 'Image loading',
      previousButtonLabel: 'Previous image',
      nextButtonLabel: 'Next image',
      closeButtonLabel: 'Close dialog window'
    }
  },

  // Regular expression for supported image file types
  fileTypes: /\.(png|jpe?g|webp|avif|svg)(\?.*)?$/i
}
```

## API

| Function | Description |
| --- | --- |
| `open(element)` | Open `element` (DOM element) |
| `close()` | Close Parvus |
| `previous()` | Show previous image |
| `next()` | Show next image |
| `select(index)` | Select a slide with `index` (Integer), zero-based index of the slide to select |
| `add(element)` | Add `element` (DOM element) |
| `remove(element)` | Remove `element` (DOM element) |
| `destroy()` | Destroy Parvus |
| `isOpen()` | Check if Parvus is open |
| `currentIndex()` | Return the current slide index |

## Events

Bind events with the `.on()` and `.off()` methods.

```js
const prvs = new Parvus()

const listener = function listener () {
  console.log('eventName happened')
}

// bind event listener
prvs.on(eventName, listener)

// unbind event listener
prvs.off(eventName, listener)
```

| eventName | Description |
| --- | --- |
| `open` | Triggered after Parvus has been opened |
| `select` | Triggered when a slide is selected |
| `close` | Triggered after Parvus has been closed |
| `destroy` | Triggered after Parvus has been destroyed |

Except for the `destroy` event, you can get the current source element:

```js
prvs.on('open', function (event) {
  console.log(event.detail.source);
})
```

## Browser support

Parvus supports the following browser (all the latest versions):

- Chrome
- Edge
- Firefox
- Safari

Use the [`:focus-visible` polyfill](https://github.com/WICG/focus-visible) to support Safari and other Browsers.

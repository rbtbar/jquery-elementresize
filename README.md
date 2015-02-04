# jQuery Element Resize Plugin

A [jQuery](http://jquery.com/) plugin that adds cross-browser element resize support.

In order to use the plugin, simply bind the `elementResize` event to a positioned element.

It also provides two helper methods called `elementResize` and `unelementResize`
that act just like other event helper methods in jQuery.

```js
// using on
$('#my_elem').on('elementResize', function(event) {
    var elem = $(this),
        width = elem.width(), 
        height = elem.height();
    console.log(width, height);
});

// using the event helper
$('#my_elem').elementResize(function(event) {
   var elem = $(this),
        width = elem.width(), 
        height = elem.height();
    console.log(width, height);
});
```

## Support for UMD modules

Support for AMD, Node/CommonJS, Browser globals is baked in.
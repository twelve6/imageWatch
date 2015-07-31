# imageWatch
Watch Images on a page and run callback onload.

```javascript
$('.coupon-images').imageWatch({
    callback : function() {
        $('.loading-gif').hide();
    }
}).run();
```

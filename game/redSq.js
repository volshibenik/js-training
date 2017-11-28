(function name() {
  var start = null;
  var element = document.getElementById('kkk');
  element.style.position = 'absolute';

  function step(timestamp) {
    if (!start) start = timestamp;
    var progress = timestamp - start;
    element.style.left = Math.min(progress / 10, 200) + 'px';
    if (progress < 1000) {
      window.requestAnimationFrame(step);
    }
  }

  window.requestAnimationFrame(step);
})()
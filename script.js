(function () {
  var total = 7;
  var idx = 0;
  var track = document.getElementById("track");
  var tabs = Array.prototype.slice.call(document.querySelectorAll(".tab"));
  var fill = document.getElementById("progressFill");
  var pos = document.getElementById("posLabel");
  var prevBtn = document.getElementById("prevBtn");
  var nextBtn = document.getElementById("nextBtn");

  function render() {
    track.style.transform = "translateX(-" + idx * (100 / total) + "%)";
    fill.style.width = ((idx + 1) / total) * 100 + "%";
    pos.textContent = "slide " + (idx + 1) + " / " + total;
    tabs.forEach(function (t, i) {
      t.classList.toggle("active", i === idx);
    });
    prevBtn.disabled = idx === 0;
    nextBtn.disabled = idx === total - 1;
  }
  function go(i) {
    idx = Math.max(0, Math.min(total - 1, i));
    render();
  }

  tabs.forEach(function (t) {
    t.addEventListener("click", function () {
      go(parseInt(t.dataset.i, 10));
    });
  });
  prevBtn.addEventListener("click", function () {
    go(idx - 1);
  });
  nextBtn.addEventListener("click", function () {
    go(idx + 1);
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "ArrowRight" || e.key === " ") {
      go(idx + 1);
      e.preventDefault();
    }
    if (e.key === "ArrowLeft") {
      go(idx - 1);
      e.preventDefault();
    }
  });

  // populate line-number gutters (approximate visual line counts per slide)
  var gutterCounts = [11, 6, 7, 4, 7, 4, 5];
  gutterCounts.forEach(function (lines, i) {
    var g = document.getElementById("g" + i);
    var html = "";
    for (var n = 1; n <= lines; n++) {
      html += "<div>" + n + "</div>";
    }
    g.innerHTML = html;
  });

  render();
})();

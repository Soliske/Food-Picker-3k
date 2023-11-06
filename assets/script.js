(function () {
    var items = [
      "🍳", "🍕", "🍔", "🌯", "🥘", "🥙", "🥪", "🥯", "🍣", "🥟", "🍝", "🦞",
    ];
    var doors = document.querySelectorAll(".door");
    //emojis sourced from https://symbl.cc/en/1F33D/


// create a "winner" box underneath each slot machine
// make second slot machine have different icons and a separate start/reset button 


    document.querySelector("#spinner").addEventListener("click", spin);
    document.querySelector("#reseter").addEventListener("click", init);
  
    function init(firstInit = true, groups = 1, duration = 1) {
      for (var door of doors) {
        if (firstInit) {
          door.dataset.spinned = "0";
        } else if (door.dataset.spinned === "1") {
          return;
        }
        var boxes = door.querySelector(".boxes");
        var boxesClone = boxes.cloneNode(false);
        var pool = ["❓"];
  
        if (!firstInit) {
          var arr = [];
          for (let n = 0; n < (groups > 0 ? groups : 1); n++) {
            arr.push(...items);
          }
          pool.push(...shuffle(arr));
  
          boxesClone.addEventListener(
            "transitionstart",
            function () {
              door.dataset.spinned = "1";
              this.querySelectorAll(".box").forEach((box) => {
                box.style.filter = "blur(1px)";
              });
            },
            { once: true }
          );
          boxesClone.addEventListener(
            "transitionend",
            function () {
              this.querySelectorAll(".box").forEach((box, index) => {
                box.style.filter = "blur(0)";
                if (index > 0) this.removeChild(box);
                console.log(box, index);
              });
            },
            { once: true }
          );
        }
  
        for (let i = pool.length - 1; i >= 0; i--) {
          var box = document.createElement("div");
          box.classList.add("box");
          box.style.width = door.clientWidth + "px";
          box.style.height = door.clientHeight + "px";
          box.textContent = pool[i];
          boxesClone.appendChild(box);
        }
        boxesClone.style.transitionDuration = `${duration > 0 ? duration : 1}s`;
        boxesClone.style.transform = `translateY(-${door.clientHeight * (pool.length - 1)}px)`;
        door.replaceChild(boxesClone, boxes);
      }
    }
  
    async function spin() {
      init(false, 1, 2);
      
      for (var door of doors) {
        var boxes = door.querySelector(".boxes");
        var duration = parseInt(boxes.style.transitionDuration);
        boxes.style.transform = "translateY(0)";
        await new Promise((resolve) => setTimeout(resolve, duration * 100));
      }
    }
  
    function shuffle([...arr]) {
      let m = arr.length;
      while (m) {
        var i = Math.floor(Math.random() * m--);
        [arr[m], arr[i]] = [arr[i], arr[m]];
      }
      return arr;
    }
    init();
  })();

  (function () {
    var things = [
      "🍳", "🍕", "🍔", "🌯", "🥘", "🥙", "🥪", "🥯", "🍣", "🥟", "🍝", "🦞",
    ];
    var windows = document.querySelectorAll(".window");
    //emojis sourced from https://symbl.cc/en/1F33D/


// create a "winner" box underneath each slot machine
// make second slot machine have different icons and a separate start/reset button 


    document.querySelector("#spinnert").addEventListener("click", spin);
    document.querySelector("#resetert").addEventListener("click", init);
  
    function init(firstInit = true, groups = 1, duration = 1) {
      for (var window of windows) {
        if (firstInit) {
          window.dataset.spinned = "0";
        } else if (window.dataset.spinned === "1") {
          return;
        }
        var boxes = window.querySelector(".boxes");
        var boxesClone = boxes.cloneNode(false);
        var pool = ["❓"];
  
        if (!firstInit) {
          var arr = [];
          for (let n = 0; n < (groups > 0 ? groups : 1); n++) {
            arr.push(...things);
          }
          pool.push(...shuffle(arr));
  
          boxesClone.addEventListener(
            "transitionstart",
            function () {
              window.dataset.spinned = "1";
              this.querySelectorAll(".box").forEach((box) => {
                box.style.filter = "blur(1px)";
              });
            },
            { once: true }
          );
          boxesClone.addEventListener(
            "transitionend",
            function () {
              this.querySelectorAll(".box").forEach((box, index) => {
                box.style.filter = "blur(0)";
                if (index > 0) this.removeChild(box);
                console.log(box, index);
              });
            },
            { once: true }
          );
        }
  
        for (let i = pool.length - 1; i >= 0; i--) {
          var box = document.createElement("div");
          box.classList.add("box");
          box.style.width = window.clientWidth + "px";
          box.style.height = window.clientHeight + "px";
          box.textContent = pool[i];
          boxesClone.appendChild(box);
        }
        boxesClone.style.transitionDuration = `${duration > 0 ? duration : 1}s`;
        boxesClone.style.transform = `translateY(-${window.clientHeight * (pool.length - 1)}px)`;
        window.replaceChild(boxesClone, boxes);
      }
    }
  
    async function spin() {
      init(false, 1, 2);
      
      for (var window of windows) {
        var boxes = window.querySelector(".boxes");
        var duration = parseInt(boxes.style.transitionDuration);
        boxes.style.transform = "translateY(0)";
        await new Promise((resolve) => setTimeout(resolve, duration * 100));
      }
    }
  
    function shuffle([...arr]) {
      let m = arr.length;
      while (m) {
        var i = Math.floor(Math.random() * m--);
        [arr[m], arr[i]] = [arr[i], arr[m]];
      }
      return arr;
    }
  
    init();
  })();
  // for TMDB api //
 

  function fetchImage() {
    var apiKey = "53db825161ad7fa9d7ad80815c4cb74b";
  
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer ' + apiKey // Include the API key here
      }
    };
  
    fetch('https://api.themoviedb.org/3/collection/10/images', options)
      .then(response => response.json())
      .then(data => {
        // Extract and process the images from the fetched data
        var images = data.results.map(result => result.image_url);
  
        // Call the init function with the loaded images
        init(false, 1, 2, images);
      })
      .catch(err => console.error(err));
  }
  
  function init(firstInit = true, groups = 1, duration = 1, images = []) {
    // ...
  
    // Update the items with the fetched images if available
    if (images.length > 0) {
      // Replace "❓" with the fetched images
      pool = shuffle(images);
    }
  
    // ...
  }
  
    
  // FOR BULMA CSS MODAL //
 var okayButton = document.querySelector('#modalbutton');
 var modalBg = document.querySelector('.modal-background');
 var modal = document.querySelector('.modal');

//  Only using 'okayButton' function for now //
// modalBg.addEventListener('click' () => {
//   modal.classList.remove('is-active');
// });

 okayButton.addEventListener('click', () => {
  modal.classList.remove('is-active');
 });
// End Modal //

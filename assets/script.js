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

  // FOR BULMA CSS MODAL //
 const okayButton = document.querySelector('#modalbutton');
 const modalBg = document.querySelector('.modal-content');
 const modal = document.querySelector('.modal');

//  Only using 'okayButton' function for now //
// modalBg.addEventListener('click' () => {
//   modal.classList.remove('is-active');
// });

 okayButton.addEventListener('click', () => {
  modal.classList.remove('is-active');
 });



$( document ).ready(function() {




  function dragMoveListener (event) {
    let target = event.target,
        // keep the dragged position in the data-x/data-y attributes
        x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
        y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

    // console.log(event.relatedTarget);
    // console.log(target.classList.contains('can-drop'));
    // translate the element
    target.style.webkitTransform =
    target.style.transform =
      'translate(' + x + 'px, ' + y + 'px)';

    // update the posiion attributes
    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);
  }
  // this is used later in the resizing and gesture demos
  window.dragMoveListener = dragMoveListener;






  interact('.turtle-tags').draggable({
    inertia: true,
    restrict: {
      restriction: ".turtle-bounds",
      endOnly: true,
      elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
    },
    autoScroll: true,
    onmove: dragMoveListener,
    onend: function (event) {
      let textEl = event.target
    }
  });



  interact('.ruleset-tags').draggable({
    inertia: true,
    restrict: {
      restriction: ".ruleset-bounds",
      endOnly: true,
      elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
    },
    autoScroll: true,
    onmove: dragMoveListener,
    onend: function (event) {
      let textEl = event.target
    }
  });







  let selectTurtle = '';
  interact('#turtle-dropzone').dropzone({
    accept: '.turtle-tags',
    overlap: 0.15,
    ondropactivate: function (event) {
      event.target.classList.add('drop-active');
    },
    ondragenter: function (event) {
      let draggableElement = event.relatedTarget,
          dropzoneElement = event.target;
      if(selectTurtle == '') {
        dropzoneElement.classList.add('drop-target');
        draggableElement.classList.add('can-drop');
      }
    },
    ondragleave: function (event) {
      event.target.classList.remove('drop-target');
      event.relatedTarget.classList.remove('can-drop');
      if(selectTurtle == event.relatedTarget.textContent) {
        selectTurtle = '';
      }
    },
    ondrop: function (event) {
      selectTurtle = event.relatedTarget.textContent;
      L3D.lengine.setTurtle(event.relatedTarget.textContent);
    },
    ondropdeactivate: function (event) {
      event.target.classList.remove('drop-active');
      event.target.classList.remove('drop-target');
    }
  });




  let selectRuleset = '';
  interact('#ruleset-dropzone').dropzone({
    accept: '.ruleset-tags',
    overlap: 0.15,
    ondropactivate: function (event) {
      event.target.classList.add('drop-active');
    },
    ondragenter: function (event) {
      let draggableElement = event.relatedTarget,
          dropzoneElement = event.target;
      dropzoneElement.classList.add('drop-target');
      draggableElement.classList.add('can-drop');
      if(selectRuleset == '') {
        dropzoneElement.classList.add('drop-target');
        draggableElement.classList.add('can-drop');
      }
    },
    ondragleave: function (event) {
      event.target.classList.remove('drop-target');
      event.relatedTarget.classList.remove('can-drop');
      if(selectRuleset == event.relatedTarget.textContent) {
        selectRuleset = '';
      }
    },
    ondrop: function (event) {
      selectRuleset = event.relatedTarget.textContent;
      L3D.lengine.setRuleset(event.relatedTarget.textContent);
    },
    ondropdeactivate: function (event) {
      event.target.classList.remove('drop-active');
      event.target.classList.remove('drop-target');
    }
  });




});

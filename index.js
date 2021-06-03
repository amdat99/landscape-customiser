

let userimage_input = document.getElementById('userimage')
let image = null
let mousePressed = false;
var colorP = '#000000';
var file
var reader
var data 



const modes = {
    pan: 'pan',
    drawing: 'drawing'
}

let currentMode;


const initCanvas = (id) => {
    return new fabric.Canvas(id,{
        width: 700,
        height: 650,
        backgroundColor: 'whitesmoke',
        selection:false
    })
}

const canvas = initCanvas('canvas');

const fileInput = () => {
    document.getElementById('userimage').addEventListener("change", function(e) {
         file = e.target.files[0];
         reader = new FileReader();
        reader.onload = function(f) {
            data = f.target.result;
           fabric.Image.fromURL(data, function(img) {
              // add background image
              canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas), {
                 scaleX: canvas.width / img.width,
                 scaleY: canvas.height / img.height
              });
           });
        };
        reader.readAsDataURL(file);
     });

    }

const addProps = (soure) => {
fabric.Image.fromURL(soure, img => {
    img.scaleToWidth(300, false);
    canvas.add(img)
    canvas.renderAll()
})

}
const togglePan = () => {
 if(currentMode ===  'pan'){
     currentMode = ''
}
 else{
     currentMode = modes.pan
     canvas.isDrawingMode = false;
 }
}  

const toggleDraw = () => {
    if(currentMode ===  'drawing'){
        currentMode = ''
        canvas.isDrawingMode = false;
   }
    else{


                currentMode = modes.drawing
        canvas.freeDrawingBrush.color = colorP
        console.log('f',colorP)
        canvas.freeDrawingBrush.width = 5

        canvas.renderAll()
    }
   }  

   const setColorListener = () => {
       console.log('runs')
       const picker = document.querySelector('.colorP')
       picker.addEventListener('change',(event) => {
        colorP = event.target.value
        canvas.freeDrawingBrush.color = colorP
            console.log('d',colorP)
            canvas.renderAll()
       })
     
   }

   const clearCanvas = () => {

canvas.clear()

fabric.Image.fromURL(data, function(img) {
    // add background image
    canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas), {
       scaleX: canvas.width / img.width,
       scaleY: canvas.height / img.height
    });
 });
   }

   function toggleDriveways() {
    var x = document.getElementById("driveways");
    var y = document.getElementById("props")
    if (x.style.display === "none") {
      x.style.display = "block";
      y.style.display = "none"
    } else {
      x.style.display = "none";
    }
  }

  const closeDrive = () => {
    var x = document.getElementById("driveways");
    x.style.display = "none";
  }

  const closeProps = () => {
    var x = document.getElementById("props");
    x.style.display = "none";
  }

  function toggleProps() {
    var x = document.getElementById("driveways");
    var y = document.getElementById("props")
    if (y.style.display === "none") {
      y.style.display = "block";
      x.style.display = "none"
    } else {
      y.style.display = "none";
    }
  }



  
canvas.on('mouse:move', (event)=> {
    if(mousePressed && currentMode === modes.pan){
    console.log(event);

    const mEvent = event.e
    const delta = new fabric.Point(mEvent.movementX, mEvent.movementY)
    canvas.relativePan(delta)   
    
    canvas.setCursor('crosshair')
    canvas.renderAll()
    }
    else if (mousePressed && currentMode === modes.drawing){
        canvas.isDrawingMode = true;
        canvas.renderAll()
    }
})

canvas.on('mouse:down', (event)=> {
    mousePressed = true
    if(currentMode === modes.pan){
    canvas.setCursor('crosshair')
    canvas.renderAll()
    }

})

canvas.on('mouse:up', (event)=> {    
    mousePressed = false
    if(currentMode === modes.pan){
    canvas.setCursor('default')

    canvas.renderAll()
    }
})

setColorListener()
fileInput()
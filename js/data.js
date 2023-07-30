// Example data array
let data = [{
    x: 1,
    y: 2,
    color: 'black',
    group: null
  },
  {
    x: 1.1,
    y: 2,
    color: 'black',
    group: null
  },
  {
    x: 1.2,
    y: 2.2,
    color: 'black',
    group: null
  },
  {
    x: 1.3,
    y: 2.3,
    color: 'black',
    group: null
  },
  {
    x: 1.4,
    y: 2,
    color: 'black',
    group: null
  },
  {
    x: 1.5,
    y: 2.5,
    color: 'black',
    group: null
  },
  {
    x: 3,
    y: 4,
    color: 'black',
    group: null
  },
  {
    x: 3.1,
    y: 4,
    color: 'black',
    group: null
  },
  {
    x: 3.2,
    y: 4.2,
    color: 'black',
    group: null
  },
  {
    x: 3.3,
    y: 4.1,
    color: 'black',
    group: null
  },
  {
    x: 3.4,
    y: 4.4,
    color: 'black',
    group: null
  },
  // Add more data objects here as needed
];

function initDataPoints(){
  for(var i=0;i<data.length; i++){
    data[i].group=null;
    data[i].color="black";
  }
}

function randomiseDataPoints(){
  data = [];
  var min = Math.ceil(0);
  var max = Math.floor(500);
  var count = $("#randomPointsCount").val();
  for(var i=0; i<count; i++) {
    point = {}
    point.x = Math.floor(Math.random() * (max - min + 1)) + min;
    point.y = Math.floor(Math.random() * (max - min + 1)) + min;
    point.color = "black";
    point.group = null;
    data.push(point);
  }

}
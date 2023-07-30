function KMeans (dataPoints, numOfClusters=2, maxIterations=100) {
  this.dataPoints = dataPoints;
  this.numOfClusters = numOfClusters;
  this.maxIterations = maxIterations;
  this.centroids = [];
  this.colors = ["blue", "green", "yellow", "orance", "cyan", "pink", "gray", "purple", "lightgreen"]
}

KMeans.prototype.getRandomInt = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

KMeans.prototype.calculateDistance = function(point1, point2) {
  return Math.hypot(point2.x - point1.x, point2.y - point1.y);
}

// Function to calculate the mean of an array
KMeans.prototype.calculateMean = function(arr) {
  return (arr.reduce((acc, val) => acc + val, 0) / arr.length).toFixed(2);
}

// Function to calculate mean of x and y by group
KMeans.prototype.calculateMeanByGroup = function(data) {
  const groupedData = data.reduce((acc, obj) => {
    const {
      group,
      x,
      y
    } = obj;
    if (!acc[group]) {
      acc[group] = {
        x: [],
        y: []
      };
    }
    acc[group].x.push(x);
    acc[group].y.push(y);
    return acc;
  }, {});

  const result = Object.entries(groupedData).map(([group, values]) => ({
    group,
    meanX: this.calculateMean(values.x),
    meanY: this.calculateMean(values.y),
  }));

  return result;
}

// Initialise Centroids
KMeans.prototype.setInitialCentroids = function() {
  let assignedIndexes=[];
  for(i=0; i<this.numOfClusters; i++) {
    let randomIndex;
    let assigned=null;

    do{
      randomIndex = this.getRandomInt(0, this.dataPoints.length-1);    
      assigned = assignedIndexes.find(element => element == randomIndex);
    }
    while(assigned);

    assignedIndexes.push(randomIndex);

    let centroid = {
      x: this.dataPoints[randomIndex].x,
      y: this.dataPoints[randomIndex].y,
      color: this.colors[i],
      group: i
    };
    
    this.centroids.push(centroid);
  }  
}

// Assign Cluster
KMeans.prototype.assignClusterToDataPoints = function() {
  for (var p = 0; p < this.dataPoints.length; p++) {
    var distances = [];
    for(var c=0; c<this.centroids.length; c++) {
      let distance = this.calculateDistance(this.dataPoints[p], this.centroids[c]);
      distances.push(distance);
    }

    minDist=0;
    let minimum = Math.min(...distances);
    minDist = distances.indexOf(minimum);

    this.dataPoints[p].color = this.colors[minDist];
    this.dataPoints[p].group = this.centroids[minDist].group;
      
    
  }
}

// Move Centroids
KMeans.prototype.moveCentroids = function() {
  const oldCentroids = structuredClone(this.centroids);  
  const meanByGroup = this.calculateMeanByGroup(this.dataPoints);
  for(var m=0; m<meanByGroup.length; m++) {
    let centroid = this.centroids.find(element => element.group == meanByGroup[m].group);
    if(centroid){
      centroid.x = meanByGroup[m].meanX;
      centroid.y = meanByGroup[m].meanY;
    }
  }
  
  var centroidsChanged = false;
  for(var c=0; c<this.centroids.length; c++) {
    if(this.centroids[c].x != oldCentroids[c].x || this.centroids[c].y != oldCentroids[c].y) {
      centroidsChanged = true;
      break;
    }
  }  

  return centroidsChanged;
}

// Calculate KMean
KMeans.prototype.calculateKMean = function() {

  this.setInitialCentroids();

  for (var i = 0; i < maxIterations; i++) {
    
    this.assignClusterToDataPoints();

    var centroidsMoved = this.moveCentroids();

    if(!centroidsMoved)
      break;
  }
}

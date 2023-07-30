// Call the function to create the scatter plot
currentStep = 0;
let objKMean=null;

function reset() {
    randomiseDataPoints();
    currentStep = 0;
    initDataPoints();
    createScatterPlot([]);
    $("#steps").html("");
    
    $("#btnNext").show();
}

function nextStep() {
    switch (currentStep) {
        case 0:
            $("#steps").html("<li>Plotting Data Points...</li>");
            
            initDataPoints();

            var clusters = $("#clustersCount").val();
            objKMean = new KMeans(data, clusters, 100);

            createScatterPlot(objKMean.dataPoints);

            currentStep = 1;
            break;
        case 1:
            $("#steps").append("<li>Setting Initial Centroids...</li>");
            objKMean.setInitialCentroids();

            appendScatterPlot(objKMean.centroids, "Initial Centroids");

            currentStep = 2;
            break;
        case 2:
            $("#steps").append("<li>Assigning Cluster To Data Points</li>");
            objKMean.assignClusterToDataPoints();

            createScatterPlot(objKMean.dataPoints);
            appendScatterPlot(objKMean.centroids, "Mean Centroids");

            currentStep = 3;
            break;
        case 3:
            $("#steps").append("<li>Moving Centroids</li>");
            var centroidsMoved = objKMean.moveCentroids();
            
            createScatterPlot(objKMean.dataPoints);
            appendScatterPlot(objKMean.centroids, "New Centroids");

            if(!centroidsMoved){
                currentStep = 4;
            }
            else {
                currentStep = 2;
            }
            break;
        case 4:
            $("#steps").append("<li>Finished</li>");
            $("#btnNext").hide();
            break;
    }
}

function createScatterPlot(data) {
    // Extract x, y, and color arrays from the data
    const xArray = data.map(obj => obj.x);
    const yArray = data.map(obj => obj.y);
    const colorArray = data.map(obj => obj.color);
    const texts = data.map(obj => ((obj.group!=null)? "group: " + obj.group: "group: null"));

    // Define the trace for the scatter plot
    const trace = {
        x: xArray,
        y: yArray,
        mode: 'markers',
        marker: {
            color: colorArray,
            size: 10, // Adjust the marker size as needed
        },
        type: 'scatter',
        name: 'Data Points',
        text: texts
    };

    // Define the layout options for the plot
    const layout = {
        showlegend: true,
        title: 'KMEAN Clustering',
        xaxis: {
            title: 'X-axis'
        },
        yaxis: {
            title: 'Y-axis'
        },
    };

    // Combine trace and layout to create the data array
    const dataToPlot = [trace];

    // Render the plot
    Plotly.newPlot('scatter-plot', dataToPlot, layout);
}

function appendScatterPlot(data, name, color="red") {
    // Extract x, y, and color arrays from the data
    const xArray = data.map(obj => obj.x);
    const yArray = data.map(obj => obj.y);
    const colorArray = data.map(obj => obj.color);
    const texts = data.map(obj => ((obj.group!=null)? "group: " + obj.group: "group: null"));

    // Define the trace for the scatter plot
    const trace = {
        x: xArray,
        y: yArray,
        mode: 'markers+text',
        marker: {
            color: color,
            size: 10, // Adjust the marker size as needed
        },
        type: 'scatter',
        name: name,
        text: texts,
        textposition: 'top center',
    };

    // Combine trace and layout to create the data array
    const dataToPlot = [trace];

    // Add Traces to the plot
    Plotly.addTraces('scatter-plot', dataToPlot);
}



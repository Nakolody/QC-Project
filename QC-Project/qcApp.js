
let data;
let dataBracket = [];

function onChange(event) {
    let file = event.target.files[0];
    let reader = new FileReader();
    reader.onload = function(e) {
        //File loads and is converted to String
      data = e.target.result.toString();
        //Converts String into lot specific array
      let dataLog = data.split('\n');
      let k = 0;
        for(let i = 0; i < dataLog.length; i +=1){
            //Creates individual arrays for each reagent
            //Create New objects in this fo[[[[Pr-loop. 
            data = dataLog[i].split(',');
            let reagentName = data[2];
            let reagentLevel = data[5];
            if(dataBracket.length < 1){
              let newAnalyte = new Reagent(data[0],data[1],data[2],data[5]);
              newAnalyte.date.push(data[3]);
              newAnalyte.value.push(data[6]);
              dataBracket.push(newAnalyte);
            }
            if(reagentName === dataBracket[k].analyte && reagentLevel === dataBracket[k].level){
              dataBracket[k].date.push(data[3]);
              dataBracket[k].value.push(data[6]);
              } 
            if(reagentName !== dataBracket[k].analyte || reagentLevel !== dataBracket[k].level) {
                let newAnalyte = new Reagent(data[0],data[1],data[2],data[5]);
                newAnalyte.date.push(data[3]);
                newAnalyte.value.push(data[6]);
                dataBracket.push(newAnalyte);
                k +=1;
            }
        }
       controlGraph(dataBracket);
    };
    reader.readAsText(file);
}

// Adds graph to html page
function controlGraph (reagentArray){
// data
var Data = {
    type: 'scatter',  
    x: [reagentArray[0].date,
        reagentArray[1].date,
        reagentArray[2].date,
        reagentArray[3].date,
        reagentArray[4].date,
        reagentArray[5].date,
        reagentArray[6].date], 
    y: [reagentArray[0].value,
        reagentArray[1].value,
        reagentArray[2].value,
        reagentArray[3].value,
        reagentArray[4].value,
        reagentArray[5].value,
        reagentArray[6].value], 
    mode: 'lines+markers', 
    name: 'Data', 
    showlegend: true,
    hoverinfo: 'all',
    line: {
      color: 'blue', 
      width: 2
    }, 
    marker: {
      color: 'blue', 
      size: 8, 
      symbol: 'circle'
    }
  }
  
  // violations
  var Viol = {
    type: 'scatter', 
    x: [6,9],  
    y: [2,8], 
    mode: 'markers', 
    name: 'Violation', 
    showlegend: true, 
    marker: {
      color: 'rgb(255,65,54)', 
      line: {width: 3}, 
      opacity: 0.5, 
      size: 12, 
      symbol: 'circle-open'
    }
  }
  // control limits
  var CL = {
    type: 'scatter', 
    x: [0.5, 10, null, 0.5, 10], 
    y: [-5, -5, null, 5, 5], 
    mode: 'lines', 
    name: 'LCL/UCL', 
    showlegend: true, 
    line: {
      color: 'red', 
      width: 2,
      dash: 'dash'
    }
  }
  
  // centre
  var Centre = {
    type: 'scatter',  
    x: [reagentArray[0].date,
        reagentArray[1].date,
        reagentArray[2].date,
        reagentArray[3].date,
        reagentArray[4].date,
        reagentArray[5].date,
        reagentArray[6].date], 
    y: [0,0],
    mode: 'lines', 
    name: 'Centre', 
    showlegend: true, 
    line: {
      color: 'grey', 
      width: 2
    }
  }
  
  // all traces
  var data = [Data,Viol,CL,Centre]
  
  // layout
  var layout = {
    title: 'Basic SPC Chart',
    xaxis: {
      zeroline: false
    },
    yaxis: {
      range: [-10,10],
      zeroline: false
    }
  }
  
  Plotly.plot('actm', data,layout, {showSendToCloud: true});
}

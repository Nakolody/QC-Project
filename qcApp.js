
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
        for(let i = 0; i < dataLog.length; i +=1){
            //Creates individual arrays for each reagent
            //Create New objects in this for-loop. 
            data = dataLog[i].split(',');
            let newAnalyte = new Reagent(data[0],data[1],data[2],data[3],data[6]);
            dataBracket.push(newAnalyte);
        }
       // console.log(dataBracket);
    };
    reader.readAsText(file);
    return dataBracket;
}
console.log(dataBracket);
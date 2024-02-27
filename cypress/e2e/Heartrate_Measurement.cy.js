
class Heartrate_Measurement{
  fetchheartratedata()
   {
    //read the input data
    cy.fixture('heartrate.json').then(result =>{
      const resultset = {};
      result.forEach(reading =>{
        const startdate = new Date(reading.timestamps.startTime);
        const day = startdate.toISOString().split('T')[0];
        if (!resultset[day]) {
          resultset[day] = {
              date: day,
              min: Infinity,
              max: -Infinity,
              medianbeats:[],
              latestDataTimestamp: null
          };
      }
      //calculate min bpm and max bpm,latest data timestamp
        const bpm = reading.beatsPerMinute;
        resultset[day].min = Math.min(resultset[day].min, bpm);
        resultset[day].max = Math.max(resultset[day].max, bpm);
        resultset[day].medianbeats.push(bpm);
        if (!resultset[day].latestDataTimestamp || new Date(reading.timestamps.startTime) > new Date(resultset[day].latestDataTimestamp)) {
          resultset[day].latestDataTimestamp = reading.timestamps.startTime;
        }
    });
    //calculate median beats with in a date range 
    for (const day in resultset) {
      resultset[day].medianbeats = medianbeats(resultset[day].medianbeats);
      }
    //storing the result value
    const resultsArray = Object.values(resultset);
    //creating output.json file with result
      cy.writeFile('output.json', JSON.stringify(resultsArray, null, 2), err => {
        if (err) {
          console.error('Error writing to output.json:', err);
        } else {
        console.log('Output saved to output.json');
          }
      });
    })

  }
}
//Function to caluculate the median beats and returning the value
        function medianbeats(values) 
          {

            const sorted = values.slice().sort((a, b) => a - b);
            cy.log(sorted)
            const middlevalue = Math.floor(sorted.length / 2);
        
            if (sorted.length % 2 === 0) {
                return (sorted[middlevalue - 1] + sorted[middlevalue]) / 2;
            }
        
            return sorted[middlevalue];
        }
module.exports={Heartrate_Measurement}

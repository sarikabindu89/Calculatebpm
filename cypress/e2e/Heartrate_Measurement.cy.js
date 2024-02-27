
class Heartrate_Measurement{
  fetchheartratedata()
   {
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
              latestDataTimestamp: null
          };
      }
        const bpm = reading.beatsPerMinute;
        resultset[day].min = Math.min(resultset[day].min, bpm);
        resultset[day].max = Math.max(resultset[day].max, bpm);
        if (!resultset[day].latestDataTimestamp || new Date(reading.timestamps.startTime) > new Date(resultset[day].latestDataTimestamp)) {
          resultset[day].latestDataTimestamp = reading.timestamps.startTime;
      }
  
});
const resultsArray = Object.values(resultset);

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
module.exports={Heartrate_Measurement}

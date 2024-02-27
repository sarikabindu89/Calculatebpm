import { Heartrate_Measurement } from "./Heartrate_Measurement.cy";
describe('Write the output.json file', () => {
    it('Fetch the data from input json file and write the output by calculating all the bpm values group by date',()=>{
        const heartrate = new Heartrate_Measurement()
        heartrate.fetchheartratedata();
    })
    
});
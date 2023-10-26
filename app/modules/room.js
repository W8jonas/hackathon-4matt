const INCREASE =      'need to increase temperature    '
const DECREASE =      'need to decrease temperature    '
const UNDER_CONTROL = 'temperature under control       '
const OUT_CONTROL =   'temperature OUT OF CONTROL!!!!!!'

const axios = require('axios')

class Room {
  constructor(maximum_temperature = 25, minimum_temperature = 20, temperature = (maximum_temperature + minimum_temperature) / 2, fail_rate = 10, location){
    this.id = location

    this.maximum_temperature = maximum_temperature
    this.minimum_temperature = minimum_temperature
    this.temperature = temperature

    this.status = 'temperature under control'
    this.cooling_system = false
    this.system_operating = false
    this.heating_system = false

    this.increase_rate = ((maximum_temperature - minimum_temperature)/2)/5
    this.decrease_rate = ((maximum_temperature + minimum_temperature)/2)/20
    
    this.fail_rate = fail_rate/100;
    this.fail_state = false

    this.tolerance = (maximum_temperature + minimum_temperature) / 10

    this.updateOnDatabase();
  }

  updateStatus(){
    const maximum = this.maximum_temperature
    const minimum = this.minimum_temperature
    const actual = this.temperature
    const tolerance = this.tolerance

    if(this.cooling_system && actual > minimum){
      this.cooling_system = true
    }else if(this.heating_system && actual < minimum + tolerance/2){
      this.heating_system = true
    }else if(actual < minimum) {
      this.heating_system = true
      this.cooling_system = false

      if(actual < minimum - tolerance){
        this.status = OUT_CONTROL
        this.color = 'red'
      }
      else {
        this.status = INCREASE
        this.color = 'blue'
      }
    }else if(actual > maximum) {
      this.heating_system = false
      this.cooling_system = true

      if(actual > maximum + tolerance){
        this.status = OUT_CONTROL
        this.color = 'red'
      }else {
        this.status = DECREASE
        this.color = 'orange'
      }
    }else{
      this.heating_system = false
      this.cooling_system = false

      this.status = UNDER_CONTROL
      this.color = 'green'
    }

    if(this.fail_state) {
      this.heating_system = false
      this.cooling_system = false
    }
    
  }

  nextStep(){

    let shouldTurnFailState = Math.random() < this.fail_rate;
    if(shouldTurnFailState) this.fail_state = true;

    if(this.fail_state) this.temperature = this.temperature + (this.increase_rate/2);
    else if(this.cooling_system) this.temperature = this.temperature - this.decrease_rate;
    else if(this.heating_system) this.temperature = this.temperature + this.heating_system;
    else if(this.system_operating) this.temperature = this.temperature + (this.increase_rate/2);
    else this.temperature = this.temperature - (this.decrease_rate/2);
    this.updateOnDatabase()

  }

  checkStatus() {
    this.nextStep()
    this.updateStatus()

    return {
      id: this.id,
      status: this.status,
      fail_state: this.fail_state,
      system_operating: this.system_operating,
      temperature: this.temperature,
      cooling: this.cooling_system,
      heating: this.heating_system,
    }
  }

  toggleOperation() { this.system_operating = !this.system_operating; this.updateOnDatabase(); }
  turnOn(){ this.system_operating = true; this.updateOnDatabase(); }
  turnOff(){ this.system_operating = false; this.updateOnDatabase(); }
  fixOperation() { this.fail_state = false; this.updateOnDatabase(); }
  verifyFailures() { return this.fail_state; }

  toString() {
    const data = this.checkStatus();

    const failed = this.fail_state ? 'with error' : 'normally  '
    const room = `${this.id} : ${this.system_operating ? 'operating ' : 'non-operating '}${failed}`
    const status = `Temperature: ${this.temperature.toFixed(1)}, ${this.status};`
    const cooling = `cooling: ${this.cooling_system ? 'on' : 'off'}`
    const heating = `heating: ${this.heating_system ? 'on' : 'off'}`


    return`${room} -> ${status} ${heating} ${cooling}`;
  }

  getKey(key) {
    return this[key]
  }

  getCriticity() {
    const maximum = this.maximum_temperature
    const minimum = this.minimum_temperature
    const actual = this.temperature
    const tolerance = this.tolerance

    if(actual > maximum + tolerance) this.criticity = actual - maximum + tolerance
    else if(actual < minimum - tolerance) this.criticity = Math.abs(actual - (minimum - tolerance))
    else this.criticity = 0
  }

  updateOnDatabase(){
    const url = 'https://us-central1-hackathon-4matt.cloudfunctions.net/updateRoom?id='+this.id

    axios.post(url, {
      status: this.status,
      fail_state: this.fail_state,
      system_operating: this.system_operating,
      temperature: this.temperature,
      cooling: this.cooling_system,
      heating: this.heating_system,
      color: this.color,
      criticity: this.getCriticity()
    })
  }

}

module.exports = Room;

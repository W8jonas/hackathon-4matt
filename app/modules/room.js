const INCREASE = 'increasing temperature'
const DECREASE = 'decreasing temperature'
const UNDER_CONTROL = 'temperature under control'

class Room {
  constructor(number = 1, maximum_temperature = 25, minimum_temperature = 20, temperature = (maximum_temperature + minimum_temperature) / 2){
    this.maximum_temperature = maximum_temperature;
    this.minimum_temperature = minimum_temperature;
    this.number = number;
    
    this.temperature = temperature
    this.status = 'temperature under control';
    this.cooling_system = false
    this.system_operating = false
    this.heating_system = false

    this.increase_rate = ((maximum_temperature - minimum_temperature)/2)/5;
    this.decrease_rate = ((maximum_temperature + minimum_temperature)/2)/20;

  }

  updateStatus(){
    const maximum = this.maximum_temperature
    const minumum = this.minimum_temperature
    const actual = this.temperature

    if(actual < minumum){
      this.heating_system = true
      this.cooling_system = false
      this.system_operating = false

      this.status = INCREASE

    }else if(actual > maximum) {
      this.heating_system = false
      this.cooling_system = true
      this.system_operating = false

      this.status = DECREASE

    }else{
      this.heating_system = false
      this.cooling_system = false
      this.system_operating = true

      this.status = UNDER_CONTROL
      
    }
  }

  nextStep(){
    if(this.cooling_system) this.temperature = this.temperature - this.decrease_rate;
    else if(this.heating_system) this.temperature = this.temperature + this.heating_system;
    else this.temperature = this.temperature + (this.increase_rate/2);
  }

  checkStatus() {
    this.nextStep()
    this.updateStatus()

    return {
      temperature: this.temperature,
      cooling: this.cooling_system,
      heating: this.heating_system,
      status: this.status,
      system_operating: this.system_operating,
    }
  }

  toString() {
    const data = this.checkStatus();

    const room = `Room ${this.number}`
    const status = `Temperature: ${this.temperature.toFixed(1)}, ${this.status};`
    const cooling = `cooling: ${this.cooling_system ? 'on' : 'off'}`
    const heating = `heating: ${this.heating_system ? 'on' : 'off'}`


    return`${room} -> ${status} ${heating} ${cooling}`;
  }

}

module.exports = Room;

import {Handle, Position} from 'reactflow'

export function Room(props) {

    const statusAndPriorities = {
        '0': 'priority_0',
        '1': 'priority_1',
        '2': 'priority_2'
    }

    // id: this.id,
    // status: this.status,
    // fail_state: this.fail_state,
    // system_operating: this.system_operating,
    // temperature: this.temperature,
    // cooling: this.cooling_system,
    // heating: this.heating_system,

    const classStyle = "baseNode room" + (props.data.status === 'Incêndio' ? ' priority_2' : ' ')

    return (
        <div className={classStyle}>
            <Handle type="target" position={Position.Left} />
            Sala: {props.data.label} <br/>
            Status: {props.data.status} <br/>
            Temperatura: {props.data.temperature.toFixed(2)} <br/>
            Resfriamento: {props.data.cooling_system ? 'Ligado' : 'Desligado'} <br/>
            Aquecimento: {props.data.heating_system ? 'Ligado' : 'Desligado'} <br/>
        </div>
    )
}

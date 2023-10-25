
import {Handle, Position} from 'reactflow'

export function Room(props) {

    const classStyle = "baseNode room" + (props.data.status === 'Incêndio' ? ' fire' : ' ')
    return (
        <div className={classStyle}>
            <Handle type="target" position={Position.Left} />
            Sala: {props.data.label} <br/>
            Temperatura: {props.data.temp} <br/>
            Status: {props.data.status} <br/>
        </div>
    )
}

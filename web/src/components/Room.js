
import {Handle, Position} from 'reactflow'

import './room.css'

export function Room(props) {

    const classStyle = "roomNode room " + props.data.color

    return (
        <div className={classStyle}>
            <Handle type="target" position={Position.Left} />
            <h3 className="title"> Sala: {props.data.label} </h3>
            <hr />
            <p> Status: {props.data.status} </p>
            <p> Temperatura: {props.data.temperature.toFixed(2)} </p>
            <p> Resfriamento: {props.data.cooling ? 'Ligado' : 'Desligado'} </p>
            <p> Aquecimento: {props.data.heating ? 'Ligado' : 'Desligado'} </p>
            <p> Localização: {props.data.id.replaceAll(':', ' → ')} </p>
            <p> <strong>criticity: {props.data.criticity}</strong> </p>
        </div>
    )
}

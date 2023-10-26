
import {Handle, Position} from 'reactflow'

import './room.css'

export function Room(props) {

    const statusAndPriorities = {
        'temperature OUT OF CONTROL!!!!!!': 'priority_0',   // Cor: Vermelho
        'need to decrease temperature    ': 'priority_1',   // Cor: Laranja
        'temperature under control       ': 'priority_3',   // Cor: Azul padrão
        'need to increase temperature    ': 'priority_2'    // Cor: Amarelo
    }

    const classStyle = "roomNode room " + (statusAndPriorities[props.data.status])

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
        </div>
    )
}

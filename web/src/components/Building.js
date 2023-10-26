
import {Handle, Position} from 'reactflow'

export function Building(props) {

    return (

        <div className="baseNode building">
            <Handle type="target" position={Position.Top} />
            <Handle type="source" position={Position.Bottom} />
            <p>Tipo: Construção</p>
            <p>Nome: {props.data.label}</p>
        </div>
    )
}

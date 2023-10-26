
import {Handle, Position} from 'reactflow'

export function Master(props) {

    return (
        <div className="baseNode master">
            <Handle type="source" position={Position.Bottom} />
            <p>Tipo: Master</p>
            <p>Nome: {props.data.label}</p>
        </div>
    )
}

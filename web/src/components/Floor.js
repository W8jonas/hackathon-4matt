
import {Handle, Position} from 'reactflow'

export function Floor(props) {

    return (

        <div className="baseNode floor">
            <Handle type="target" position={Position.Top} />
            <Handle type="source" position={Position.Bottom} />
            <p>Tipo: Pavimento</p>
            <p>Nome: {props.data.label}</p>
        </div>
    )
}

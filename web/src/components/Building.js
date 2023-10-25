
import {Handle, Position} from 'reactflow'

export function Building(props) {

    return (

        <div className="baseNode building">
            <Handle type="target" position={Position.Top} />
            <Handle type="source" position={Position.Bottom} />
            {props.data.label}
        </div>
    )
}


import {Handle, Position} from 'reactflow'

export function Master(props) {

    return (
        <div className="baseNode master">
            <Handle type="source" position={Position.Bottom} />
            {props.data.label}
        </div>
    )
}

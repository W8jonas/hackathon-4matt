
import {Handle, Position} from 'reactflow'

export function Floor(props) {

    return (

        <div className="baseNode floor">
            <Handle type="target" position={Position.Top} />
            <Handle type="source" position={Position.Bottom} />
            {props.data.label}
        </div>
    )
}

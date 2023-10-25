
import {Handle, Position} from 'reactflow'

export function Master(props) {

    return (

        <div className="baseNode master">
            <Handle id="left" type="target" position={Position.Left} />
            {props.data.label} {props.selected ? 'as' : 'dd'}
        </div>
    )
}

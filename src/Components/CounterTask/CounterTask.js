import React, { useState } from 'react'
import './CounterTask.css'

const CounterTask = () => {

    const [count, setCount] = useState(0);

    return (
        <div className={"rootCounter card"}>
            <div>Counter Value : {count}</div>
            <div className={"buttonContainer"}>
                <button onClick={() => setCount(count+1)}>Add 1</button>
                <button onClick={() => setCount(0)}>Reset Counter</button>
            </div>
        </div>
    )
}

export default CounterTask

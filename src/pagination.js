import React, { PureComponent } from 'react'

export class Paginate extends PureComponent {
    render(){
        const { handleNext, handlePrev, current, type } = this.props
        return(
            <div>
                {current > 1 ?
                    <button onClick={handlePrev.bind(null, type)}>Back</button> : null}
                {current}
                <button onClick={handleNext.bind(null, type)}>Next</button>
            </div>
        )
    }
}

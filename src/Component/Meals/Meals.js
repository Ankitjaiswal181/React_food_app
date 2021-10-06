import React from 'react'
import { Fragment } from 'react/cjs/react.production.min'
import AvailableMeal from './AvailableMeal'
import MealsSummary from './MealSummary'

const Meals = () => {
    return (
        <Fragment>
            <MealsSummary/>
            <AvailableMeal/>
        </Fragment>
    )
}

export default Meals

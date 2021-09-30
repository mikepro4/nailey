
import * as _ from "lodash"

export const findProperty = (section, property) => {
    let finalProperty = _.filter(section.properties, {
        propertyValue: property
    })
    return finalProperty[0]
}

export const getPose = (screen, clientHeight, totalScrolledPixels, amount) =>{
    if (screen) {
        if (screen && (screen.offsetTop <= (totalScrolledPixels + (clientHeight / amount)))) {
            return "visible"
        } else {
            return "hidden"
        }
    } else {
        return "hidden"
    }
}
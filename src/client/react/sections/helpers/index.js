
import * as _ from "lodash"

export const findProperty = (section, property) => {
    let finalProperty = _.filter(section.properties, {
        propertyValue: property
    })
    return finalProperty[0]
}
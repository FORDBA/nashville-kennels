import React, { useContext, useEffect } from "react"
import { AnimalContext } from "./AnimalProvider"
import { LocationContext } from "../location/LocationProvider"
import { CustomerContext } from "../customer/CustomerProvider"
import { Animal } from "./Animal"
import "./Animals.css"

export const AnimalList = () => {
    
    const { animals, getAnimals } = useContext(AnimalContext)
    const { locations, getLocations } = useContext(LocationContext)
    const { customers, getCustomers } = useContext(CustomerContext)


    
    useEffect(() => {
        getAnimals().then(getCustomers).then(getLocations)
    }, [])

    return (
        <article className="animals">
            {
                animals.map(animal => {
                    const owner = customers.find(customer => customer.id === animal.customerId) || {}
                    const location = locations.find(loc => loc.id === animal.locationId) || {}

                    /*
                        {
                            animalKey: {id: 1....}
                            ownerKey: {id: 1....},
                            locationKey: {id: 1....}
                        }
                    */
                    return <Animal key={animal.id} animal={animal} owner={owner} location={location} />
                })
            }
        </article>
    )

}
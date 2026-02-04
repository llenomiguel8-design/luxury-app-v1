import { createContext, useState, useContext } from "react";

const PetContext = createContext();

export const PetProvider = ({ children }) => {
    // 1. The Pet the user chose
    const [selectedPet, setSelectedPet] = useState(null);

    // 2. The bond progress (Heart Taps)
    const [bondingLevel, setBondingLevel] = useState(0);

    const incrementBond = () => {
        setBondingLevel(prev => prev + 1);
    }

    // Helper to reset everything when picking a new pet
    const selectThePet = (pet) => {
        setSelectedPet(pet);
        setBondingLevel(0); // Reset bond for new pet
    }

    return (
        <PetContext.Provider value={{
            selectedPet,
            selectThePet, // exposing our new helper
            bondingLevel,
            incrementBond
        }}>
            {children}
        </PetContext.Provider>
    )
}

export const usePet = () => {
    return useContext(PetContext);
}
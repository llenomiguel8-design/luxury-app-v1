import { createContext, useState, useContext, useEffect } from "react";
import { db } from "../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

const PetContext = createContext();

export const PetProvider = ({ children }) => {
    // 1. The Pet the user chose
    const [selectedPet, setSelectedPet] = useState(null);

    // 2. The bond progress (Heart Taps)
    const [bondingLevel, setBondingLevel] = useState(0);
    const [bondTarget, setBondTarget] = useState(10); // Default, will randomize
    const [petName, setPetName] = useState(null);

    const incrementBond = () => {
        // Randomly add 1 or 2 to the bonding level
        setBondingLevel(prev => prev + Math.floor(Math.random() * 2) + 1);
    }

    // Load data from Firebase on mount
    useEffect(() => {
        const loadData = async () => {
            try {
                const docRef = doc(db, "pets", "my_pet");
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    const data = docSnap.data();
                    if (data.selectedPet) setSelectedPet(data.selectedPet);
                    if (data.bondingLevel !== undefined) setBondingLevel(data.bondingLevel);
                    if (data.bondTarget !== undefined) setBondTarget(data.bondTarget);
                    if (data.petName) setPetName(data.petName);
                }
            } catch (error) {
                console.error("Error loading pet data:", error);
            }
        };
        loadData();
    }, []);

    // Save data whenever state changes
    // Using a simple effect for now. In production, you might debounce this.
    useEffect(() => {
        if (!selectedPet) return; // Don't save empty state

        const saveData = async () => {
            try {
                await setDoc(doc(db, "pets", "my_pet"), {
                    selectedPet,
                    bondingLevel,
                    bondTarget,
                    petName: petName || null
                });
            } catch (error) {
                console.error("Error saving pet data:", error);
            }
        };
        saveData();
    }, [selectedPet, bondingLevel, bondTarget, petName]);

    // Helper to reset everything when picking a new pet
    const selectThePet = (pet) => {
        const newTarget = Math.floor(Math.random() * 90) + 10;

        setSelectedPet(pet);
        setBondingLevel(0);
        setPetName(null);
        setBondTarget(newTarget);
    }

    const savePetName = (name) => {
        setPetName(name);
    }

    return (
        <PetContext.Provider value={{
            selectedPet,
            selectThePet, // exposing our new helper
            bondingLevel,
            incrementBond,
            bondTarget,
            petName,
            savePetName
        }}>
            {children}
        </PetContext.Provider>
    )
}

export const usePet = () => {
    return useContext(PetContext);
}
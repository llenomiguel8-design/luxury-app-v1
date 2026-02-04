import { Link } from 'react-router-dom';
import { usePet } from '../../context/PetContext';
import PetDisplay from "../../components/PetDisplay/PetDisplay";

export default function PetPage() {
    // Grab the Global State from the Cloud
    const { selectedPet, bondingLevel, incrementBond } = usePet();

    // Guard Clause: If they came here directly without picking a pet
    if (!selectedPet) {
        return (
            <div style={{ textAlign: 'center', marginTop: '50px' }}>
                <h2>No Pet Selected!</h2>
                <Link to="/select">
                    <button>Go Select a Pet</button>
                </Link>
            </div>
        );
    }

    return (
        <div style={{ textAlign: 'center' }}>
            <h1>My Companion</h1>

            <PetDisplay
                name={selectedPet.name}
                // We could pass the sprite too if PetDisplay supported it, 
                // but for now let's just use the name and global bond level.
                // Or better, let's update PetDisplay later to handle sprites!
                // For now, let's just pass the sprite as a "mood" to see it
                mood={selectedPet.sprite}
                bondingLevel={bondingLevel}
                onBond={incrementBond}
            />

            <br />
            <Link to="/">
                <button>Back to Home</button>
            </Link>
        </div>
    );
}
import { useNavigate } from 'react-router-dom';
import { usePet } from '../../context/PetContext';
// Note: imports go up 2 levels:  PetSelection -> pages -> src -> context

export default function PetSelection() {
    const navigate = useNavigate();
    const { selectThePet } = usePet();

    // Our 4 hardcoded pets
    const pets = [
        { id: 1, name: 'Fox', sprite: '🦊' },
        { id: 2, name: 'Cat', sprite: '🐱' },
        { id: 3, name: 'Dog', sprite: '🐶' },
        { id: 4, name: 'Rabbit', sprite: '🐰' }
    ];

    const handleSelect = (pet) => {
        // 1. Tell the Cloud "We picked this one!"
        selectThePet(pet);
        // 2. Move to the next room
        navigate('/pet');
    };

    return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
            <h1>Choose Your Companion</h1>
            <div style={{
                display: 'flex',
                gap: '20px',
                justifyContent: 'center',
                flexWrap: 'wrap'
            }}>
                {pets.map(pet => (
                    <button
                        key={pet.id}
                        onClick={() => handleSelect(pet)}
                        style={{ padding: '20px', fontSize: '20px', cursor: 'pointer' }}
                    >
                        <div style={{ fontSize: '40px' }}>{pet.sprite}</div>
                        {pet.name}
                    </button>
                ))}
            </div>
        </div>
    );
}
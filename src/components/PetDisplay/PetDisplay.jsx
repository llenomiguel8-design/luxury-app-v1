import { useState } from 'react';
import styles from './PetDisplay.module.css';

function PetDisplay(props) {
    const [tempName, setTempName] = useState("");

    const handleNameSubmit = () => {
        if (tempName.trim()) {
            props.onSaveName(tempName);
        }
    }

    const isReadyToName = props.bondingLevel >= props.bondTarget;
    const isNamed = !!props.petName;

    return (
        <div style={{ border: '2px solid #ccc', padding: '20px', margin: '20px', borderRadius: '10px', textAlign: 'center' }}>
            <h2>{props.name}</h2>

            {/* Visualizing the bond */}
            <p>Bond Level: {props.bondingLevel}</p>
            {/* Debugging Help (remove later if needed) */}
            {/* <small>Target: {props.bondTarget}</small> */}

            <div style={{ fontSize: '50px' }}>
                {props.mood}
            </div>

            {/* The Interaction */}
            {!isNamed && !isReadyToName && (
                <button className={styles.btn} onClick={props.onBond}>
                    ❤️ Bond
                </button>
            )}

            {/* Naming Section */}
            {!isNamed && isReadyToName && (
                <div style={{ marginTop: '20px' }}>
                    <p>You've bonded enough! Name your companion:</p>
                    <input
                        type="text"
                        value={tempName}
                        onChange={(e) => setTempName(e.target.value)}
                        placeholder="Enter name..."
                        style={{ padding: '5px', fontSize: '16px' }}
                    />
                    <button onClick={handleNameSubmit} style={{ marginLeft: '10px', padding: '5px 10px' }}>
                        Save Name
                    </button>
                </div>
            )}

            {isNamed && (
                <p style={{ color: 'green', fontWeight: 'bold' }}>Forever Bonded!</p>
            )}
        </div>
    );
}
export default PetDisplay;

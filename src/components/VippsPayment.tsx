// import React, { useState } from 'react';
// import { functions } from '../lib/appwrite';
// import { useAuth } from '../contexts/AuthContext';

// const VippsPayment: React.FC = () => {
//     const [amount, setAmount] = useState<string>('');
//     const [loading, setLoading] = useState<boolean>(false);
//     const { user } = useAuth();

//     const initiateVippsPayment = async (): Promise<void> => {
//         if (!amount || !user) return;

//         setLoading(true);
//         try {
//             const response = await functions.createExecution(
//                 'VIPPS_FUNCTION_ID', // Erstatt med din function ID
//                 JSON.stringify({
//                     amount: parseInt(amount) * 100, // Øre
//                     userId: user.$id,
//                     customerPhone: '12345678' // Kan hentes fra bruker senere
//                 })
//             );

//             // Sjekk om execution var vellykket
//             if (response.responseStatusCode === 200) {
//                 const result = JSON.parse(response.responseBody);
                
//                 if (result.url) {
//                     window.location.href = result.url;
//                 } else {
//                     throw new Error('Ingen betalings-URL mottatt fra Vipps');
//                 }
//             } else {
//                 throw new Error(`Function execution failed: ${response.responseBody}`);
//             }
//         } catch (error) {
//             console.error('Vipps payment error:', error);
//             if (error instanceof Error) {
//                 alert(`Feil ved opprettelse av Vipps betaling: ${error.message}`);
//             } else {
//                 alert('En ukjent feil oppstod ved Vipps betaling');
//             }
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div className="vipps-payment">
//             <h3>Betal med Vipps</h3>
//             <input
//                 type="number"
//                 value={amount}
//                 onChange={(e) => setAmount(e.target.value)}
//                 placeholder="Beløp (NOK)"
//                 min="1"
//             />
//             <button 
//                 onClick={initiateVippsPayment}
//                 disabled={loading || !amount}
//                 className="vipps-button"
//             >
//                 {loading ? 'Behandler...' : 'Betal med Vipps'}
//             </button>
//         </div>
//     );
// };

// export default VippsPayment;
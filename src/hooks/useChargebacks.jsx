import { useState, useEffect } from 'react';
import { getChargebacks, createChargeback, updateChargeback, deleteChargeback } from '../services/chargebackService';

function useChargebacks() {
  const [chargebacks, setChargebacks] = useState([]);

  useEffect(() => {
    fetchChargebacks();
  }, []);

  async function fetchChargebacks() {
    const data = await getChargebacks();
    setChargebacks(data);
  }

  async function addChargeback(chargebackData) {
    const newChargeback = await createChargeback(chargebackData);
    setChargebacks([...chargebacks, newChargeback]);
  }

  async function editChargeback(id, chargebackData) {
    await updateChargeback(id, chargebackData);
    fetchChargebacks();
  }

  async function removeChargeback(id) {
    await deleteChargeback(id);
    setChargebacks(chargebacks.filter(chargeback => chargeback.id !== id));
  }

  return {
    chargebacks,
    addChargeback,
    editChargeback,
    removeChargeback,
  };
}

export default useChargebacks;

export const TOGGLE_ACTIVE_STATUS = 'TOGGLE_ACTIVE_STATUS';

export const toggleActiveStatus = (chargebackId, isActive) => ({
  type: TOGGLE_ACTIVE_STATUS,
  payload: { chargebackId, isActive },
});

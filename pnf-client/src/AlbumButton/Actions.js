export const SELECTEDCHECKBOX = new Set();
 
/*
 * action creators
 */
 
 
export function updateselected(selectedCheckbox) {
  return { type: SELECTEDCHECKBOX, selectedCheckbox}
}
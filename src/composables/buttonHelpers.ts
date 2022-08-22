/**
 * Return classes for primary buttons
 * @param outline Is button outline?
 * @param flat Is button flat?
 */
export function primaryClasses(outline = false, flat = false) { 
  if(outline) {
    return `
      hover:bg-slate-700 
      border 
      border-primary 
      text-primary 
      hover:text-white
      disabled:bg-slate-200 
      disabled:text-slate-900 
      disabled:border-slate-200 
    `;
  } else if(flat) {
    return `
      hover:bg-slate-200 
      text-primary
      disabled:bg-slate-200 
      disabled:text-slate-900 
      disabled:border-slate-200 
    `;
  } else {
    return `
      bg-primary 
      hover:bg-slate-700 
      border 
      border-primary 
      text-white 
      disabled:bg-slate-200 
      disabled:text-slate-900 
      disabled:border-slate-200 
    `;
  }
} 

/**
 * Return classes for success buttons
 * @param outline Is button outline?
 * @param flat Is button flat?
 */
 export function successClasses(outline = false, flat = false) { 
  if(outline) {
    return `
      hover:bg-green-500 
      border 
      border-green-500 
      text-green-500 
      hover:text-white
      disabled:bg-green-200 
      disabled:text-green-900 
      disabled:border-green-200 
    `;
  } else if(flat) {
    return `
      hover:bg-green-200 
      text-green-500
      disabled:bg-green-200 
      disabled:text-green-900 
      disabled:border-green-200 
    `;
  } else {
    return `
      bg-green-500 
      hover:bg-green-600 
      border 
      border-green-500 
      text-white
      disabled:bg-green-200 
      disabled:text-green-900 
      disabled:border-green-200 
    `;
  }
}

/**
 * Return classes for danger buttons
 * @param outline Is button outline?
 * @param flat Is button flat?
 */
 export function dangerClasses(outline = false, flat = false) { 
  if(outline) {
    return `
      hover:bg-red-500 
      border 
      border-red-500 
      text-red-500 
      hover:text-white
      disabled:bg-red-200 
      disabled:text-red-900 
      disabled:border-red-200 
    `;
  } else if(flat) {
    return `
      hover:bg-red-200 
      text-red-500
      disabled:bg-red-200 
      disabled:text-red-900 
      disabled:border-red-200 
    `;
  } else {
    return `
      bg-red-500 
      hover:bg-red-600 
      border 
      border-red-500 
      text-white
      disabled:bg-red-200 
      disabled:text-red-900 
      disabled:border-red-200 
    `;
  }
}

/**
 * Return classes for warning buttons
 * @param outline Is button outline?
 * @param flat Is button flat?
 */
 export function warningClasses(outline = false, flat = false) { 
  if(outline) {
    return `
      hover:bg-yellow-500 
      border 
      border-yellow-500 
      text-yellow-500 
      hover:text-white
      disabled:bg-yellow-200 
      disabled:text-yellow-900 
      disabled:border-yellow-200 
    `;
  } else if(flat) {
    return `
      hover:bg-yellow-200 
      text-yellow-500
      disabled:bg-yellow-200 
      disabled:text-yellow-900 
      disabled:border-yellow-200 
    `;
  } else {
    return `
      bg-yellow-500 
      hover:bg-yellow-600 
      border 
      border-yellow-500 
      text-white
      disabled:bg-yellow-200 
      disabled:text-yellow-900 
      disabled:border-yellow-200 
    `;
  }
}

/**
 * Return classes for default buttons
 * @param outline Is button outline?
 * @param flat Is button flat?
 */
 export function defaultClasses(outline = false, flat = false) { 
  if(outline) {
    return `
      hover:bg-neutral-300 
      border 
      border-neutral-300 
      text-neutral-300
      hover:text-black
      disabled:bg-neutral-200 
      disabled:text-neutral-900 
      disabled:border-neutral-200
    `;
  } else if(flat) {
    return `
      hover:bg-neutral-200 
      text-neutral-300
      hover:text-black
      disabled:bg-neutral-200 
      disabled:text-neutral-900 
      disabled:border-neutral-200 
    `;
  } else {
    return `
      bg-neutral-300 
      hover:bg-neutral-400 
      text-black 
      disabled:bg-neutral-200 
      disabled:text-neutral-900 
      disabled:border-neutral-200
    `;
  }
}
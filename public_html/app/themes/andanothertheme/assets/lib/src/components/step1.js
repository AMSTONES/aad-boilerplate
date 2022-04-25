/** Conditionally add properties in the object */
const conditionalPerson = (x) => {
  const isValid = false;
  const age = 18;

  const person = {
    id: 'ab32',
    name: 'Krina',
    ...(isValid && { isActive: true }),
    ...((age >= 18 || isValid) && { cart: 0 })
  }

  return person;
}

export default conditionalPerson;


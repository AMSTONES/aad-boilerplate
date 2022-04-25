export const hello = ({ name, lastName, age}) => {
  return `hello ${name} ${lastName} ${age}`;
}

const cube = (x) => {
  const array = [1, 2, 3, 4, 5];
  const maths = x * x * x;

  return [...array, maths];
}

export default cube;
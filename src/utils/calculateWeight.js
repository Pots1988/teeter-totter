export const calculateWeight = (items) => {
  items.reduce((acc, item) => (acc += item.weight), 0)
}

const is_dev = true

export default function logger () {
  return is_dev && console.log(...arguments)
}

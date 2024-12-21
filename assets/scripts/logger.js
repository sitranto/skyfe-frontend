const is_dev = false

export default function logger () {
  return is_dev && console.log(...arguments)
}

function clone<X>(old: X): X {
  return JSON.parse(JSON.stringify(old));
}


export default clone;